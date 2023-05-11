const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json())

mongoose.connect("mongodb+srv://Gauravd:gauravd@cluster0.hbhwc24.mongodb.net/?retryWrites=true&w=majority",{
    useNewurlParser:true,
    useUnifiedtopology:true
  }).then(()=>{
    console.log("Connected With MongoDB");
}).catch((err)=>{
  console.log(`error is ${err}`);
})


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique:true,
        required:true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
      },
    names:{
      type: String,
      unique:true,
      required: true,
    }
});

const User = mongoose.model("user", UserSchema)
module.exports = User

