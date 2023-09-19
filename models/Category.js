const mongoose = require("mongoose");
const {
    ObjectId
} = mongoose.Schema;

const categorySchema = new mongoose.Schema({

    categoryName: {
        type: String,
        unique: true,
        required: [true, "Please Input Category Name!"]
    },
    item: [{
        type: ObjectId,
        ref: "item"
    }],



})

module.exports = mongoose.model("Category", categorySchema)