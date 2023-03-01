const mongoose= require('mongoose')
const url  = 'mongodb+srv://faad123:wIsElNCgYEfePMAi@cluster0.n0ad2oh.mongodb.net/myDatabase?retryWrites=true&w=majority'

mongoose.set('strictQuery', true)
const dbconnect=async ()=>{
 return await mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(res=>console.log('db connected')).catch(err=>console.log(err))
}
module.exports={dbconnect}