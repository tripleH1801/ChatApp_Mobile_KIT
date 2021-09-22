const router = require("express").Router();
const Message = require("../models/Message");

// POST CONVERSATION
router.post("/", async (req, res) => {
    const newMessage = new Message(req.body)

    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) { 
        res.status(500).json(error)
    }

})

// GET CONVERSATION OF USER
router.get("/:conversationId", async (req, res) => {
   
    try {
        const messages = await Message.find({conversation: req.params.conversationId})
        .populate("sender", "profilePicture username")

        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router