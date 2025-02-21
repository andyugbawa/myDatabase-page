const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();



// Choose the correct database URL based on the environment
const MONGO_URI = process.env.NODE_ENV === "production" 
    ? process.env.MONGODB_URI_PROD 
    : process.env.MONGODB_URI_DEV;

if (!MONGO_URI) {
    console.error("MongoDB connection string is missing!");
    process.exit(1);
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`Connected to MongoDB: ${MONGO_URI}`))
  .catch(err => console.error("Error:", err));


// // Connect to MongoDB
// mongoose.connect("mongodb+srv://andyugbawa:aweriarue@cluster0.grdet.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log("MongoDB Connection Error: ", err));

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

app.post("/add-user", async (req, res) => {
    const { name, email } = req.body;
    
    try {
        const newUser = new User({ name, email });
        await newUser.save();
        res.send("User added successfully!");
    } catch (err) {
        res.status(500).send("Error adding user.");
    }
});




app.listen(4001,()=>{
    console.log("APP Running on 4001")
})