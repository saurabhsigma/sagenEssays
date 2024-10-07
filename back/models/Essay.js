const mongoose = require("mongoose");

const EssaySchema = mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique: true
    },

    content: {
        type: String,
        required: true,
    },

    notes : {
        type: String,
        default: "No notes written as of now"
    }
})

const Essay = mongoose.model("Essay", EssaySchema);

module.exports  = Essay;