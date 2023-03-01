const jwt = require("jsonwebtoken");
const secKey = "2342424234dfa";
const fs = require('fs');
const multer = require("multer");
const path = require('path');
const port = 4000;
const Users = require('../Model/user.model') 

const signup = async (req, res) => {
   const { email, username } = req.body;
    console.log(email, username)
    const user = await Users.findOne({ $or: [{ email }, { username }] })
      if (user && user.email === email) {
        return res.status(400).json({
          message: 'Email is already taken, please try to login',
        });
      }
     else if (user && user.username === username) {
        return res.status(400).json({
          message: 'Username is already taken, please try another',
        });
      }
    else if(!user) {
      console.log(req.body)
      const newUser = new Users(req.body);
      await newUser.save();
      return res.status(200).json({
        message: 'Signup has been successful',
      });
  }
  else{
    res.status(500).json({
      message: 'Error while signing up',
    });
  }
  } 


  const login = async (req, res) => {
    const {email, password } = req.body;
    console.log(email, password)
    Users.findOne({email:email, password:password}, function(err,user){
      if(err){
        return res.status(404).json({
          mesage: 'errr'
        })
      }
      else if(!user){
        return res.status(404).json({
          message: 'User not found'
        });
      }
      else{
         const token = jwt.sign({ email }, secKey);
         return  res.json({ message: "Login successful", token });
    
      }})

  };
  
  
  const uploadImage = (req, res) => {
      if(req.body.data==""){
        return res.status(404).json({
          mesage: 'Please Upload file first'
        })
      }    
else{ 
 Users.findOne({email: req.email}, function(err,user){
  if(err){
    return res.status(404).json({
      mesage: 'errr'
    })
  }
  else if(!user){
    return res.status(404).json({
      message: 'User not found'
    });
  }
  else{
    const profileUrl = `${req.protocol}://${req.hostname}:${port}/${req.file.path}`;
    const correctedPath = profileUrl.replace(/\\/g, '/').replace('images23/', 'images/');
    user.profile = correctedPath
  user.save((err)=>{
    if(err){
      return res.status(500).json({
        error: 'this is error message'
      });
    }
    return res.status(200).json({
      message: "Images has been uploaded on " +  req.email + ' Folder',
      message2: correctedPath
    });
  })
  }}) 
}};

  const getimages = async function(req, res){
    const folderPath = "images/" + req.email ;
   fs.readdir(folderPath, (err, files) => {
            if (err) {
                return res.status(404).json({
                    message: 'Reqeusted folder not present'
                });
            }
           else if(files.length===0){
            return res.status(404).json({
                message: "Images not found"
            })
           } 
        else{
            const fileUrls = files.map(file => {
               return `${req.protocol}://${req.hostname}:${port}/images/${req.email}/${file}`;
               });
           res.status(200).json({
                   files: fileUrls
               });
        }
        });
};

const deletImages = (req, res) => {
    const userFolderPath = `images/${req.email}`;
        fs.rm(userFolderPath, { recursive: true }, (err) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Error while deleting files",
                        });
                    }
                    return res.status(200).json({
                        message: "Images has been sucessfully Deleted  "
                    });
                });
      // }
};

const update =(req,res)=>{
  const {email,username,password} = req.body
  console.log(email, username, password)
  const update = {email: req.email}
  if(!email && email===' '){
    return res.status(400).json({
      message: 'Please enter valid email'
    })
  }
  else if(email===''){
    return res.status(400).json({
      message: 'Please enter valid email'
    })
  }

 else if(password===' '|| password===''){
    return res.status(400).json({
      message: 'Please enter password'
    })
  }
  else if(username===' '|| username ===''){
    return res.status(400).json({
      message: 'Please enter password'
    })
  }
else{
  Users.updateMany(update, {$set:{email:email,password:password, username:username}}, function(err, response){
    if(err){
      console.log('error while updating ')
    }
    else{
      const token = jwt.sign({ email }, secKey);
      return res.status(200).json({
        message: 'document has been sucessfully updated',
        token
      })
    }
  })
}
}

const deletAccount =(req, res)=>{
  Users.deleteOne({email:req.email}, function(err,data){
    if(err){
      return res.status(200).json({
        messsage: 'No Account found'
      })
    }
      else{
       let token = null
        return res.status(200).json({
          message:'Account has been deleted ',
          token
        })
      }
  })

}

const userData =(req,res)=>{
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  Users.findOne({email: req.email},function(err,data){
    if(err){
    return res.status(500).json({
      message: 'error received '
    })}
    else{
      res.status(200).json({
        data: data
      })

    }
  })
}

module.exports = {login , uploadImage , getimages ,deletImages,signup,update,deletAccount,userData }


