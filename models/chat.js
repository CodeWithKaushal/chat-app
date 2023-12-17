const mongoose = require("mongoose");


//  chat will have :(_id , from,to,message,created_at)

const chatSchema = new mongoose.Schema({

    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        maxLength: 50
    },
    created_at: {
        type: Date,
        required: true
    }

});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;