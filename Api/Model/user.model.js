


const mongoose=  require('mongoose')
const Schema = mongoose.Schema
let user = new Schema({
   username:{
      type: String,
      require: true
   },
   email:{
      type:String,
      require: true
   },
   password:{
      type: String,
      require: true
   },
   profile:{
      type: String
   }
})

const User = mongoose.model('User', user)
module.exports = User