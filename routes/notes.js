require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override")
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(methodOverride("_method"));
router.use(cookieParser());
const { User, Note } = require("../models/user.js");

// get all notes
router.get("/notes", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("notes"); // we use populate('notes') in order to populate actual notes in the user document
    // otherwise, we will only get the ids of the notes and not the actual notes
    if (user) {
      //res.json({ name: user.name, notes: user.notes });
      res.render("notes.ejs", {name: user.name, notes: user.notes})
    } else {
      res.json({ message: "user not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get route for opening a new page for workflow etc.
router.get("/flow", (req, res) => {
  res.render("flow.ejs", { layout: false });
});

// add a new note
router.post("/notes", verifyToken, async (req, res) => {
  try {
    const data = req.body; // data.title, data.body
    // add the new note to the notes collection and add the new note's id to the user's notes
    const newNote = new Note({title: data.title, body: data.body});
    await newNote.save();
    // Add the new note's ID to the user's notes array
    const user = await User.findById(req.userId);
    user.notes.push(newNote._id);
    await user.save();
    //res.status(201).json({ message: "Note created successfully", note: newNote });
    res.redirect('/notes');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// update a note
router.put("/notes/:noteId",verifyToken, async (req, res) => {
  try {
    const {title, body} = req.body; //data.title and data.body
    const noteId = req.params.noteId;
     //id of the note to be updated
    //const objId = new mongoose.Types.ObjectId(noteId);
    const updatedNote = await Note.findByIdAndUpdate(noteId, {title, body}, {new: true});
    if (!updatedNote) {
      res.status(401).json({message: "Note not found"})
    }
    res.status(201).json({message: "updated note successfully", note: updatedNote})
    //res.redirect("/notes");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
})
// delete a note


router.delete("/notes/:noteId",verifyToken, async (req, res)=>{
  // Remove the note ID from the user's notes array
  const user = await User.findById(req.userId);
  const noteId = req.params.noteId;
  
  //const objId = new mongoose.Types.ObjectId(noteId);
  user.notes.pull(noteId);
  await user.save();

  // Delete the note
  const deletedNote = await Note.findByIdAndDelete(noteId);

  if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
  }
  //, note: deletedNote
  res.json({ message: 'Note deleted successfully' });
  //res.redirect("/notes")
})
// logout



function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.secret_key, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  });
}
module.exports = router;
