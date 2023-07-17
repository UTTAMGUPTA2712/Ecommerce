const mongoose = require("mongoose");
const { Schema } = mongoose;

const carousalSchema = new Schema(
    {
        image: {
            type: String,
            required: true,
        },
        filter: {
            type: Schema.Types.Mixed
        }
    },
    { timestamps: true }
);

const Carousal = mongoose.model("Carousal", carousalSchema);
module.exports = Carousal;