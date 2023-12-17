const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

const DB = "mongodb+srv://root:root@whatsapp.zunjlxe.mongodb.net/?retryWrites=true&w=majority"
main().then(() => {
    console.log("connection successful");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(DB);

};

let allChats = [
    {
        from: "kaushal",
        to: "ravina",
        msg: "send image",
        created_at: new Date()
    },
    {
        from: "neha",
        to: "preeti",
        msg: "send me notes for the exam",
        created_at: new Date()
    },
    {
        from: "rohit",
        to: "mohit",
        msg: "tech me JS callbacks",
        created_at: new Date()
    },
    {
        from: "amit",
        to: "sumit",
        msg: "all the best",
        created_at: new Date()
    },
    {
        from: "anita",
        to: "ramesh",
        msg: "bring me some fruits",
        created_at: new Date()
    },
    {
        from: "kaushal",
        to: "mihir",
        msg: "send code",
        created_at: new Date()
    },
    {
        from: "tony",
        to: "kaushal",
        msg: "send money",
        created_at: new Date()
    },
    {
        from: "mihir",
        to: "kaushal",
        msg: "send code",
        created_at: new Date()
    }
];


Chat.insertMany(allChats);

