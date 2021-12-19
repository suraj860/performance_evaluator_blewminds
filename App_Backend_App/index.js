
const express = require("express")
const app = express()
const PORT = 3001;
const db = require ("./mongo")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");


async function connection(){

    app.use(cors())

    await db.connect()

    app.use(express.json())


// register a new user

app.post("/register" , async(req , res)=>{
    try{
        const data = await db.logIn.findOne({email: req.body.email});
        if (data){
            res.send({message : "Email already registered"})
        }else{
            const salt = await bcrypt.genSalt()
            req.body.password = await bcrypt.hash(req.body.password , salt)
            await db.logIn.insertOne({ ...req.body , formStatus:false , type: "user" , assign:false})
            res.send({message:"user registered successfully"})
        }
    }catch(error){
        console.log(error)
    }
})

// login the dashboard
app.post("/login" , async(req , res)=>{
    try{
        const user = await db.logIn.findOne({email: req.body.email})
        if(!user){
            res.send({message : "Enter valid EmailId"})
        }
        else{
            const isValid = await bcrypt.compare(req.body.password , user.password)
            if(isValid){
                const authToken = jwt.sign({user_id : user._id , email:user.email , type : user.type},
                     "admin123" , {expiresIn:"24h"})
                res.send({authToken , message:"logged in successfully"})
            }else{
                res.send({message:"Entered password is wrong"})
            }
        }
    }catch(error){
        console.log(error)
    }
})

// middleware to check the authorization token
app.use((req , res , next)=>{
    const token = req.headers["auth-token"];
    if (token){
        try{
            req.user = jwt.verify(token , "admin123")
            next()
        }catch(error){
            res.sendStatus(500)
        }
    }else{
        res.sendStatus(400)
    }
})


// creating a new faculty

app.post("/newFaculty" , async (req , res)=>{
    try{
        const data = await db.logIn.findOne({email: req.body.email})
        if(data){
            res.send({message:"faculty exists"})
        }else{
            const salt = await bcrypt.genSalt()
            req.body.password = await bcrypt.hash(req.body.password , salt)
            await db.logIn.insertOne({...req.body ,  type:"faculty"})
            res.send({message:"faculty inserted successfully"})
        }
    }catch(error){
        console.log(error)
    }
})


// get all users

app.get("/users" , async(req , res)=>{
    
        try{
            const data = await db.logIn.find({type:"user"}).toArray();
            res.send(data)
        }catch(error){
            console.log(error)
        }
      
})


// get particular user
app.post("/singleUser" , async(req , res)=>{
    try{
        const data = await db.logIn.findOne({email: req.body.email})
        res.send(data)
    }catch(error){
        console.log(error)
    }
})


// get faculty 
app.get("/faculty" , async(req , res)=>{
        try{
            const data = await db.logIn.find({type:"faculty"}).toArray();
            res.send(data)
        }catch(error){
            console.log(error)
        }   
})


// getting a user for a assigned faculty
app.post("/facultyAssigned" , async(req , res)=>{
    try{
        const data = await db.logIn.find({facultyEmail:req.user.email}).toArray()
       
        res.send(data)
    }catch(error){
        console.log(error)
    }
})


// updating the allowing the user to form
app.put("/allowUserAccess" , async(req ,res)=>{
    try{
        const data = await db.logIn.findOneAndUpdate({email: req.body.email},{$set:{formStatus : 1}} , {returnDocument: "after"})
        res.send(data.value)
    }catch(error){
        console.log(error)
    }
})

// once a user is assigned he cant be assigned to another faculty
app.put("/assigner" , async(req , res)=>{
    try{
        await db.logIn.findOneAndUpdate({email:req.body.email} ,{$set:{assign:true}})
        res.send({message : "updated"})
    }catch(error){
        console.log(error)
    }
})


//  assigned to a particular faculty
app.put("/adduserToFaculty" , async(req , res)=>{
    try{
        const data = await db.logIn.findOneAndUpdate(   
            {email : req.body.userEmail},{$set:{facultyEmail : req.body.facultyEmail , assign :true}},
            { returnDocument: "after" }
          );
        res.send(data.value)
    }
    catch(error){
        console.log(error)
    }
})


// handleing the form data
app.post("/postFormData" , async(req, res)=>{
    try{
        const data = await db.logIn.findOneAndUpdate({email:req.body.email},{$set:{
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.LastName,
            height: req.body.height,
            religion: req.body.religion,
            weight: req.body.weight,
            caste: req.body.caste,
            mark: req.body.mark,
            feed: req.body.feed,
            formStatus:true
        }},{returnDocument: "after"})
    res.send(data.value)
    }catch(error){
        console.log(error)
    }
})

// starting the server
app.listen(PORT , ()=>{
    console.log("your server is started at" + PORT)
})  
}

connection()


