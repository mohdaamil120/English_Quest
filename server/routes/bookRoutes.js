const express = require("express")
const { BookModel } = require("../models/bookModal")
const jwt = require("jsonwebtoken")
const {auth, restrict} = require("../middleware/authMiddleware")


const bootRouter = express.Router()


// restricted routes

bootRouter.get("/",auth,  async(req,res) => {
    try {
        const books = await BookModel.find()
        res.status(200).send(books)
    } catch (err) {
        res.status(400).send({"error":"something wrong while get all book",err})
    }
})


bootRouter.post("/create",auth, restrict("CREATOR"),async(req,res) => {
    try {
        const book = new BookModel(req.body)
        await book.save()
        res.status(201).send({"msg":"A new book has been added"})
    } catch (err) {
        res.status(500).send({"error":"something wrong while added a new book",err})
    }
})


bootRouter.patch("/update/:bookID",auth, restrict("CREATOR"), async(req,res) => {
    const {bookID} = req.params
    try {
        const book = await BookModel.findOne({_id:bookID})
        if (!book) {
            return res.status(404).send({ "msg": "Book not found" });
        }
        
        await BookModel.findByIdAndUpdate({_id :bookID}, req.body)
        return res.status(200).send({"msg":`Book with ID:${bookID} has been updated`})

    } catch (err) {
        res.status(500).send({"error":"something wrong while update book",err})
    }
})

bootRouter.delete("/delete/:bookID",auth, restrict("CREATOR"), async(req,res) => {
    const {bookID} = req.params
    try {
        const book = await BookModel.findOne({_id:bookID})
        if(!book){
            return res.status(404).send({ "msg": "Book not found" }); 
        }
        
        await BookModel.findByIdAndDelete({_id :bookID})
        return res.status(200).send({"msg":`Book with ID:${bookID} has been deleted`})
    
    } catch (err) {
        res.status(500).send({"error":"something wrong while delete book",err})
    }
})


// Endpoint to get books created 10 minutes ago and earlier
bootRouter.get("/old", auth, async (req, res) => {
    try {
        const tenMinutesAgo = new Date(new Date() - 10 * 60 * 1000); // 10 minutes ago
        const oldBooks = await BookModel.find({ created_at: { $lt: tenMinutesAgo } });
        res.status(200).json(oldBooks);
    } catch (err) {
        res.status(400).json({ error: "Something went wrong while fetching old books", err });
    }
});

// Endpoint to get books created within the last 10 minutes
bootRouter.get("/new", auth, async (req, res) => {
    try {
        const tenMinutesAgo = new Date(new Date() - 10 * 60 * 1000); // 10 minutes ago
        const newBooks = await BookModel.find({ created_at: { $gte: tenMinutesAgo } });
        res.status(200).json(newBooks);
    } catch (err) {
        res.status(400).json({ error: "Something went wrong while fetching new books", err });
    }
});



module.exports = {
    bootRouter
}









