const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    date: {type: Date, default: Date.now},
    body: {type: String},
})


const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true,},
    date: {type: Date, default: Date.now},
    password: {type: String, required: true},
    notes: [{type: mongoose.Schema.Types.ObjectId, ref: 'note'}],
    //notes: [{title: String, date: {type: Date, default: Date.now}, body: String }],
})

const Note = mongoose.model("note", noteSchema);
const User = mongoose.model("user", userSchema);

module.exports = {User, Note};

// App should know which user is signed in and according to that username, show the associated notes
// Schema should be in such a manner that each user has its own notes and they are displayed accordingly

// Notes schema-
/*
notes: [{
    title: String, required,
    body: String,
    dateOfcreation: Date,
},]

routes are /register /login / (main page) / logout
Use JWT tokens and express sessions for register, login, redirect to home page, logout the user and destroy the session
Protect the main route, other routes via middlewares
Initiate a session once logged in
If user is already registered, redirect to login page  
*/