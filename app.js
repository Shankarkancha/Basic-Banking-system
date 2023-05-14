require("dotenv").config();
const express= require("express");
const app= express();
const mongoose= require("mongoose");
const path= require("path");
const port= process.env.PORT || 3000;
const ejs= require("ejs");
const cors=require("cors");
const customer_router= require("./routes/customers");

const staticpath= path.join(__dirname,"./public");
const templatepath= path.join(__dirname,"./templates/views");
const partialspath= path.join(__dirname,"./templates/views");

const {customeraddcontroller}= require("./controllers/customeraddcontroller");
app.use(express.static(staticpath));

app.set("view engine","ejs");
app.set("views",templatepath);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

// connecting to the database

const DB= `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.uffvhwu.mongodb.net/BankDB?retryWrites=true&w=majority`;

mongoose.connect(DB).then(()=>{
    console.log(`connection successfull`);
}).catch((err)=>{
    console.log(err);
})

// middleware to the router 
app.use("/",customer_router);


app.listen(port,()=>{
    console.log(`listening to the ${port}`)
})