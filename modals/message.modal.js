const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recieveId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true,
    },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
