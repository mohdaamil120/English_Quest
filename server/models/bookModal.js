const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    category:{type: String},
    created_at: { type: Date, default: Date.now },
},{
    versionKey:false
})

const BookModel = mongoose.model("book",bookSchema)

module.exports={BookModel}

