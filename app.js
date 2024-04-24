const express = require("express")
const app = express()
const path = require("path")
const ejs = require("ejs")

const collection=require("./public/src/mongodb")

//const templatePath= path.join(__dirname,'../templates')

app.use(express.json())

app.set("view engine", "ejs");

//app.set("views", templatePath)

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended:true}))

app.get("/", (req,res)=>{
    res.render("index")
})

app.get("/login", (req,res)=>{
    res.render("login")
})

app.get("/signup", (req,res)=>{
    res.render("signup")
})

app.get("/choice", (req,res)=>{
    res.render("choice")
})

app.get("/portfolio", (req,res)=>{
    res.render("portfolio")
})

app.get("/shop", (req,res)=>{
    res.render("shop")
})

app.post("/signup", async (req,res)=>{

    const data = {
        name: req.body.name,
        password: req.body.password
    }
    await collection.insertMany([data])
    res.render("shop")
})

app.post("/login", async (req,res)=>{

    try{
        const check =await collection.findOne({name:req.body.name})

        if (check.password===req.body.password){
            res.render("shop")
        }
        else{
            res.send("Wrong password")
        }
    }
    catch{
        res.send("wrong details")
    }
})

app.listen(3000,()=>{
    console.log("Server running");
})
