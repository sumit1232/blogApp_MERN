const express = require('express')
const router = express.Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const Post = require('../models/Post.js')
const Comment = require('../models/Comments.js')
const verifyToken = require('../verifyToken.js')


// update
router.put("/:id", verifyToken, async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hashSync(req.body.password, salt);
        }

        const updatedUser = await User.findByIDAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json(error)
    }
});


// Delete
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await User.findByIDAndUpdate(req.params.id)
        await Post.deletMany({ userId: req.params.id })
        await Comment.deletMany({ userId: req.params.id })
        res.status(200).json("User Deleted Successfully")

    } catch (error) {
        res.status(500).json(error)
    }
})

//  Get User
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...info } = user._doc
        res.status(200).json(info)
    } catch (error) {

    }
})


module.exports = router