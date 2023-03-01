const express = require("express");

const router = express.Router();

const {login,uploadImage,deletImages,getimages, signup,update,deletAccount,userData} = require("../Controller/controller");
const {middle} = require('../Middleware/lodingMiddleware')
const {upload} = require('../Middleware/multerMilddleware')

router.post('/signup', signup )
router.post("/login", login);
router.post('/upload', middle, upload, uploadImage)
router.get('/getimage', middle, getimages)
router.delete('/removeImages', middle, deletImages)
router.post('/update', middle, update)
router.delete('/deleteaccount',middle, deletAccount)
router.get('/details', middle, userData)



module.exports = router;