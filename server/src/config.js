require("dotenv").config()
module.exports = {
  mongoString:
    process.env.MONGO_URL,
};
