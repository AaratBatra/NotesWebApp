const express = require('express')
const router = express.Router();
router.use(express.urlencoded({extended: true}));

// we will use mongo db to create a relation called todos
// todos will contain all todo items and each todo item will have an id and its data and when it was created

// get all todo items
router.get('/', (req, res)=>{
    res.render('home.ejs', {name: 'aarat batra'})
})

// get a specific todo item 
router.get('/:id', (req,res)=>{
   
})

// add a new todo item
router.post('/home', (req, res)=>{

})

// update a specific todo item
router.patch('/:id', (req,res)=>{
    
})

// delete a specific todo item
router.delete('/:id', (req,res)=>{

})

module.exports = router;

