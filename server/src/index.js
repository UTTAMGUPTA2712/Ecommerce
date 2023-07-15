const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const app = express();

const mongoString =
    "mongodb+srv://uttam_gupta:Qazwsx55@cluster0.et4nl6t.mongodb.net/Ecommerce";
mongoose
    .connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB:", err));

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(cors());
app.use(express.static(path.join(__dirname, "/uploads")));

// Error messages
const userNotFound = "USER NOT FOUND";
const userAlreadyExist = "USER ALREADY EXIST";
const wrongPassword = "INCORRECT PASSWORD";
const success = "SUCCESS";
const serverError = "SERVER ERROR";
const orderPlaced = "ORDER PLACED";
const orderCompleted = "ORDER COMPLETED";
const orderDispatched = "ORDER DISPATCHED";
const orderOutForDelivery = "ORDER OUT FOR DELIVERY";
const orderReceived = "ORDER RECEIVED";

// Define schemas
const orderSchema = new Schema(
    {
        items: {
            type: Schema.Types.Mixed,
            required: true,
        },
        address: {
            type: Schema.Types.Mixed,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: "Placed",
        },
    },
    { timestamps: true }
);
const productSchema = new Schema(
    {
        rating: {
            type: Number,
            default: 0,
        },
        reviews: {
            type: [String],
            default: [],
        },
        name: {
            type: String,
            required: true,
        },
        category: {
            type: Number,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

const addressSchema = new Schema({
    location: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
});

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        title: String,
        photo: String,
        address: {
            type: [addressSchema],
            default: [],
        },
        orders: {
            type: [Schema.Types.ObjectId],
            ref: "Order",
            default: [],
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

// Create models using schemas
const Order = mongoose.model("Order", orderSchema);
const Product = mongoose.model("Product", productSchema);
const User = mongoose.model("User", userSchema);

// Routes
app.get("/", (req, res) => {
    res.send("1000");
});

app.post("/upload", upload.single("image"), (req, res) => {
    const pic = req.file;
    res.send(pic.filename);
});

app.post("/additem", async (req, res) => {
    try {
        const response = await Product.create(req.body);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send(serverError);
    }
});

app.get("/product", async (req, res) => {
    try {
        const response = await Product.find({});
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send(serverError);
    }
});

app.get("/getAllUser", async (req, res) => {
    try {
        const response = await User.find({});
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send(serverError);
    }
});

app.post("/placeorder", async (req, res) => {
    try {
        console.log("========", req.body);
        const response = await Order.create(req.body);
        console.log("place", response);
        const data = await User.updateOne(
            { email: req.body.email },
            { $push: { orders: response._id } }
        );
        console.log("hbbuhb", data);
        res.send(response._id);
    } catch (error) {
        console.log(error);
        res.send(serverError);
    }
});

app.post("/Login", async (req, res) => {
    try {
        const userdata = req.body;
        const data = await User.findOne({
            $or: [{ email: userdata.user }, { phoneNumber: userdata.user }],
        });
        if (data) {
            if (data.password === userdata.password) {
                res.send(data);
            } else {
                res.send(wrongPassword);
            }
        } else {
            res.send(userNotFound);
        }
    } catch (error) {
        console.log(error);
        res.send(serverError);
    }
});

app.post("/Signup", async (req, res) => {
    try {
        const userdata = req.body;
        const data = await User.findOne({
            $or: [{ email: userdata.email }, { phoneNumber: userdata.phoneNumber }],
        });
        if (data) {
            res.send(userAlreadyExist);
        } else {
            const createdUser = await User.create(userdata);
            res.send(createdUser);
        }
    } catch (error) {
        console.log(error);
        res.send(serverError);
    }
});

app.post("/Google", async (req, res) => {
    try {
        const userdata = req.body;
        const data = await User.findOne({ email: userdata.email });
        if (data) {
            res.send(data);
        } else {
            const createdUsers = await User.create(userdata);
            res.send(createdUsers);
        }
    } catch (error) {
        console.log(error);
        res.send(serverError);
    }
});

app.post("/editprofile", async (req, res) => {
    try {
        await User.updateOne(
            { email: req.body.email },
            { $set: { name: req.body.name, address: req.body.address } }
        );
        res.send(success);
    } catch (error) {
        console.log(error);
        res.send(serverError);
    }
});

app.post("/updateOrders", async (req, res) => {
    try {
        await Order.updateOne(
            { _id: req.body.id },
            { $set: { status: req.body.status } }
        );
        res.send(success);
    } catch (error) {
        console.log(error);
        res.send(serverError);
    }
});
app.post("/orders", async (req, res) => {
    try {
        const orderIds = req.body.map((id) => new mongoose.Types.ObjectId(id));
        const response = await Order.find({ _id: { $in: orderIds } });
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send(serverError);
    }
});

app.get("/orders", async (req, res) => {
    try {
        const response = await Order.find({});
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send(serverError);
    }
});
app.post("/orderstatus", async (req, res) => {
    try {
        const response = await Order.updateOne({ _id:new mongoose.Types.ObjectId(req.body.id) },{$set:{status:req.body.status}});
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send(serverError);
    }
});

app.post("/updateuserstatus", async (req, res) => {
    try {
        const response = await User.updateOne(
            { email: req.body.email },
            { $set: { status: req.body.status } }
        );
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send(serverError);
    }
});
app.listen(1000, () => console.log("Working on port 1000"));