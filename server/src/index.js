const app = require("./app");
require("./models/orders");
require("./models/product");
require("./models/user");
require("dotenv").config()
app.listen(process.env.PORT, () => console.log("Working on port " + process.env.PORT)); 