const app = require("./app");
require("./models/orders");
require("./models/product");
require("./models/user");

const PORT = 1000;
app.listen(PORT, () => console.log("Working on port " + PORT));
