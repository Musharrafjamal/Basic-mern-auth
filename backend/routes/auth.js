const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/model");
const ImgModel = require("../model/uploadImgModel");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password, profilePic } = req.body;
    const user = new User({ username, password, profilePic: profilePic });
    // console.log(user)
    await user.save();
    res.status(200).send("User registered successfully");
  } catch (err) {
    res.status(500).send("Error while saving user: " + err.message);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    //checking is password valid

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Password invalid");
    }

    const token = jwt.sign({ userId: user._id }, "my_secret_key");
    res.json({ token, profilePic: user.profilePic });
  } catch (err) {
    res.send("Error while login user", err.message);
  }
});

// router.get('/', (req, res) => {
//     try{
//         User.find({}).then(data => {
//             res.json(data)
//         }).catch(error => {
//             res.status(408).json({ error })
//         })
//     }catch(error){
//         res.json({error})
//     }
// })

module.exports = router;
