const express = require("express")
const mongoose = require('mongoose')
const pass = process.env.USER_PASS
const Artical = require('./model/Articale')

const app = express()
//mongodb+srv://gabdulrahmanmohammed:<password>@cluster0.0i5zlzt.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(`mongodb+srv://gabdulrahmanmohammed:7NFZPL4pQx7r1wvD@cluster0.0i5zlzt.mongodb.net/?retryWrites=true&w=majority`)
.then(res=>console.log('connected to mongoose')).catch(e=>console.log(e))

app.use(express.json())

app.get("/hello",(req,res)=>{
    res.send("hello")
})

app.get("/",(req,res)=>{
    // res.sendFile(__dirname + "/main.html")
    let number='';
    for(let i=0;i<= 100;i++){
        number=number+'-'+i
    }
    res.render('main.ejs',{
        name:'test',
        number,
    })
})

// articals end point
app.post('/articals',async (req,res)=>{
    const newArtical = new Artical()
    const articalTitle = req.body.articaletitle
    const articalbody = req.body.articalebody
    const articallikes = req.body.articallikes

    newArtical.title = articalTitle
    newArtical.body = articalbody
    newArtical.likes = articallikes
    // to save data in mongo db >>>> i can use .then
    await newArtical.save()
    res.json(newArtical)
})
app.get('/articals/:id',async (req,res)=>{
    try{
        const specificArt = await Artical.findById(req.params.id)
    // console.log('articale is ' , specificArt)
    res.json(specificArt)
    }catch(e){
        console.log(req.params)
        return res.send('error')
    }
})

app.listen(3000 , ()=>{
    console.log("im listening")
})