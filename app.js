const mongoose = require('mongoose')
const express = require('express')
const bodyparser = require("body-parser")


const app = express()

app.use(express.static('myfiles'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended:true}))

mongoose.connect('mongodb://localhost:27017/IntershipDatabase')
.then(()=>{
    console.log("Connection is successful")
}).catch(err=>console.error("connection failed"))

const registerSchema = new mongoose.Schema({
    username : {type:String , required : true},
    email: { type: String, required: true },
    password  : {type:String , required : true},
    confirmPassword : {type:String}
})
const Register = mongoose.model('Register' ,registerSchema);

const port = process.env.PORT || 3000;

app.get('/',(req,res) =>{
    res.sendFile(__dirname + "/myfiles/index.html")
})

app.post('/register',async (req,res) => {
  
  try {
    const {username , email, password, confirmPassword} = req.body;
    const registerdata = new Register({
      username,
      email,
      password,
      confirmPassword
    });
    await registerdata.save();
    res.redirect('/registred.html')
    
  } catch (error) {
    console.log(error)
    res.redirect("/unsuccess.html");
    
  }
 
});


app.listen(port , ()=>{
  console.log(`Server is running on the port ${port}`)
})