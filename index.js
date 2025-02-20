const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");




// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/myDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error: ", err));

// Define Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});

// Create Model
const User = mongoose.model("User", UserSchema);




app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("index")
})
app.post("/show", async (req, res) => {
    const { name, email } = req.body;

    try {
        const newUser = new User({ name, email });
        await newUser.save();
        res.send("Data saved successfully!");
    } catch (err) {
        res.status(500).send("Error saving data.");
    }
});



app.listen(4001,()=>{
    console.log("APP Running on 4001")
})