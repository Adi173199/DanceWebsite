const express=require("express");
const path=require("path");
const fs=require("fs");
const app=express();
var mongoose = require('mongoose');
const bodyparser=require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port=80;

//Define Mongoose Schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    desc: String
  });
var contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))//For serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine','pug')//Set the template engine in pug
app.set('views',path.join(__dirname,'views'))//Set the views directory

//Endpoints
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params)
})
app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug')
})
app.post('/contact',(req,res)=>{
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("This Item Has Been Saved to the Database")
    }).catch(()=>{
        res.status(404).send("Item Was Not Saved to the Database")
    });

    /* res.status(200).render('contact.pug') */
})
//Start the Server
app.listen(port,()=>{
    console.log(`The Application Has Started Successfully On Port ${port}`);
})