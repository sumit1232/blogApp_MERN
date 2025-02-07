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
        const newPost = new Post(req.body)
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Update
router.put("/:id",verifyToken, async(req,res)=>{
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})


// Delete
router.delete("/:id",async(req,res)=>{
    try {
        // delete post
        await Post.findByIdAndDelete(req.params.id)
        // delete comments in that post
        await Comment.deleteMany({PostId:req.params.id})
        res.status(200).json("Post deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

// Get Post Details
router.get("/:id",async(req,res)=>{
    try {
        const post = await Post.findByIdAnd(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})


// get post
router.get("/",async(req,res)=>{
    try {
        const searchFilter = {
            title:{$regex:express.query.search, $options:"i"}
        }
        const posts = await Post.find(express.query.search?searchFilter:null)
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get User Post
router.get("/user/:userId", async(req,res)=>{
    try {
        const posts = await Post.find({usrId:req.params.userId})
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router