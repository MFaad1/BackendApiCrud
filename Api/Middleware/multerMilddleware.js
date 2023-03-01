const multer = require("multer");
const fs = require('fs');
const path =  require('path')


       const storage= multer.diskStorage({
          destination:  function  (req, file, cb) {
            const userFolderPath = `./images/${req.email}`;
            if(!fs.existsSync(userFolderPath)){
            fs.mkdirSync(userFolderPath, { recursive: true }); 
            }
            cb(null, userFolderPath); 
          },
          filename: function (req, file, cb) {
          cb(null, 'profile.jpg');
          },
        })

const upload = multer({ storage: storage }).single('file');

module.exports =  {upload};
