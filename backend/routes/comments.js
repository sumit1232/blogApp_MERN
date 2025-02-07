const express = require('express')
const router = express.Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const Post = require('../models/Post.js')
const Comment = require('../models/Comments.js')
const verifyToken = require('../verifyToken.js')

// Create
router.post("/create", verifyToken,async(req,res)=>{
    try {
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Update
router.put("/:id",verifyToken, async(req,res)=>{
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedComment)
    } catch (error) {
        res.status(500).json(error)
    }
})


// Delete
router.delete("/:id",async(req,res)=>{
    try {
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json("Comment deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

// Get Comment
router.get("",async(req,res)=>{
    try {
        const comments = await Comment.find({PostId:req.params.postId})
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router