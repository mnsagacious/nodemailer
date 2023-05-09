const mongoose  = require('mongoose');
require('dotenv').config()
function mongoConnection (){
console.log(process.env.dbConnection)
  mongoose.connect(process.env.dbConnection,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
  }).then(()=>{ return console.log("mongodb connected")}).catch(err=>{return console.log(err)})  
} 
module.exports = mongoConnection;