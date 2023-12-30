const express = require("express")
const { ImgModel } = require("../model/uploadImgModel")

const router = express.Router();

router.post("/uploads", async (req, res) => {
    const body = req.body;
    try{
        const newImage = new ImgModel({file: body}) 
        await newImage.save();
        res.status(201).json({ msg : "New image uploaded...!"})
    }catch(error){
        res.status(409).json({ message : error.message })
    }
})

// router.get('/', (req, res) => {
//     try{
//         ImgModel.find({}).then(data => {
//             res.json(data)
//         }).catch(error => {
//             res.status(408).json({ error })
//         })
//     }catch(error){
//         res.json({error})
//     }
// })

module.exports = router