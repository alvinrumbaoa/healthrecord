const mongoose = require("mongoose");


const PromptSchema = new mongoose.Schema({
    prompt: {
        type: String,
    },
   
}, { timestamps: true });



module.exports = mongoose.model("Prompt", PromptSchema);