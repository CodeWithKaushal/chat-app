const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); // access all public files 
app.use(express.urlencoded({ extended: true })); // for fatch data in url 
app.use(methodOverride("_method"));


main().then(() => {
    console.log("connection successful");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb+srv://root:root@whatsapp.zunjlxe.mongodb.net/?retryWrites=true&w=majority");
    // await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");

};



app.listen(8080, () => {
    console.log("app is listening");
});

// app.get("/", (req, res) => {

//     res.send("working root");

// });


//===================================================
// index route
//===================================================

app.get("/", async (req, res) => {

    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", { chats });


});



//===================================================
/*
for  create route 2 steps
   1] get the request /chats/new
   2] post request   /chats

   app.use(express.urlencoded({ extended: true })); // for fatch data in url 
*/

//===================================================
// new route  
//===================================================

app.get("/chats/new", (req, res) => {

    res.render("new.ejs");

});




// create route
//===================================================

app.post("/chats", (req, res) => {



    let { from, to, msg } = req.body;

    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });

    newChat.save().then((res) => {
        console.log("chat was saved");
    }).catch((err) => {
        console.log(err);
    });

    res.redirect("/chats");


});
//===================================================


//===================================================

/*
 for  create route 2 steps
    1] GET the request      /chats:id/edit
    2] PUT request          /chats/:id

    npm i method-override
    method="POST" action="/chats/<%= chat._id%>?_method=PUT">

    {runValidators:true , new:true}

    const methodOverride=require("method-override");
    app.use(methodOverride("_method"));


 */


//===================================================
// Update Route  OR Edit Route
//===================================================

app.get("/chats/:id/edit", async (req, res) => {

    let { id } = req.params;
    let chat = await Chat.findById(id);


    res.render("edit.ejs", { chat });

});

app.put("/chats/:id", async (req, res) => {

    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true }, { new: true });

    res.redirect("/chats");

});




//===================================================
/*
     DELETE /chats/:id

      npm i method-override
    method="POST" action="/chats/<%= chat._id %>?_method=DELETE">

   

    const methodOverride=require("method-override");
    app.use(methodOverride("_method"));

*/

//===================================================
// Delete route
//===================================================

app.delete("/chats/:id", async (req, res) => {

    let { id } = req.params;
    let DeletedChat = Chat.findByIdAndDelete(id);
    res.redirect("/chats");

});



//===================================================