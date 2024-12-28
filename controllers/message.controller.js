const Conversation = require('../modals/conversation.modal.js')
const Message = require('../modals/message.modal.js');
const { getReceiverSocketId } = require('../ServerIO/Server.js');

module.exports.sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: recieveId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieveId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieveId],
            });
        }

        const newMessage = new Message({
            senderId,
            recieveId,
            message
        });

        if (newMessage) {
            conversation.message.push(newMessage._id);
        }
        await Promise.all([conversation.save(), newMessage.save()])
        console.log("reached")
        // Attempt real-time notification
        try {
            const receiverSocketId = getReceiverSocketId(recieveId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newMessage", newMessage);
            }
        } catch (error) {
            console.error("Real-time notification failed:", error.message);
        }
        res.status(201).json(newMessage);

    } catch (err) {
        console.log(err);
        res.status(401).json({ err: "Unauthorized" })
    }
}

module.exports.getMessage = async (req, res) => {
    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, chatUser] }
        }).populate("message");

        if (!conversation) {
            // return res.status(404).json({ message: "No conversation found" });
            return res.status(201).json([]);
        }

        const messages = conversation.message;
        res.status(201).json({ messages })

    } catch (error) {
        console.log(error)
        res.status(404).json({ err: "Internal Server Error" })

    }
}