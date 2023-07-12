const userNotFound = "USER NOT FOUND"
const userAlreadyExist = "USER ALREADY EXIST"
const wrongPassword = "INCORRECT PASSWORD"
const success = "SUCCESS"
const mongoString = "mongodb+srv://uttam_gupta:Qazwsx55@cluster0.et4nl6t.mongodb.net/"

const express = require("express");
const multer = require('multer');

const cors = require("cors");
const app = express()
const client = require("mongodb").MongoClient
const storage = multer.diskStorage({
    destination: 'uploads/', // Specify the destination folder where uploaded files will be saved
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set the filename to be unique (using the current timestamp) and preserve the original filename
    }
});

const upload = multer({ storage });
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.text())
app.use(cors())
client.connect(mongoString).then(database => {
    db = database.db("Ecommerce")
    Users = db.collection("Users")
    Products = db.collection("Products")
    Orders = db.collection("Orders")
}).catch(err => console.log(err))
// app.use("/auth")

app.post('/upload', upload.single('image'), (req, res) => {
    // Access the uploaded file using req.file
    // Process the file or save it to the desired location
    // Send a response indicating the success or failure of the upload
    res.send('Image uploaded successfully');
});

app.post("/additem", async (req, res) => {
    const response = await Products.insertOne(req.body)
    res.send(response);
})
app.get("/product", async (req, res) => {
    const response = await Products.find({}).toArray()
    console.log(response)
    res.send(response);
})
app.post("/Login", async (req, res) => {
    // checking if file doesnot exist
    const userdata = req.body
    // checking email
    const data = await Users.findOne({ $or: [{ email: userdata.user }, { phoneNumber: userdata.user }] })
    console.log();
    if (data) {
        // checking password
        if (data.password === userdata.password) {
            res.send(data)
        } else {
            res.send(wrongPassword)
        }
    } else {
        // if user not found
        res.send(userNotFound)
    }
})
// saving users in data,json
app.post("/Signup", async (req, res) => {
    const userdata = req.body
    // checking is user exist
    const data = await Users.findOne({ $or: [{ email: userdata.email }, { phoneNumber: userdata.phoneNumber }] })
    if (data) {
        res.send(userAlreadyExist)
    }
    else {
        // save user
        const createdUser = await Users.insertOne(userdata)
        res.send(createdUser)
    }
})
app.post("/Google", async (req, res) => {
    const userdata = req.body
    const data = await Users.findOne({ email: userdata.email })
    if (data) {
        res.send(data)
    }
    else {
        const createdUsers = await Users.insertOne(userdata)
        res.send(createdUsers)
    }
})
app.post("/editprofile", async (req, res) => {
    await Users.updateOne({ email: req.body.email }, { $set: { name: req.body.name, address: req.body.address } })
    res.send(success)
})
app.listen(1000, console.log("Working on port 1000"))