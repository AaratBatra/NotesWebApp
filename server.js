require("dotenv").config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
const connectDB = require('./config/db.js');

const User = require('./models/user.js');
const PORT = process.env.PORT;

// Setting the router variable
const router = require('./routes/notes.js');
const userRouter = require('./routes/users.js');

// Setting up static folder, express layouts, view engine, layout folder, form data accepting
app.use(cookieParser())
app.use(express.static('public'));
app.use(expressLayouts);
app.set('view-engine', 'ejs');
app.set('layout', './layouts/layout.ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
// Connect to the Database named notesapp
connectDB();

// Use the Router to listen on all endpoints starting with notes items
app.use('/', router);
app.use('/users', userRouter);



// Starting the server
app.listen(PORT, ()=>{
    console.log(`server is listening on port: ${PORT}`)
})