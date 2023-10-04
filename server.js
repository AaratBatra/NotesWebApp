const express = require('express')
const app = express();
const PORT = 3000;

const router = require('./routes/router.js')

app.set('view-engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.use('/todoitems', router);


app.get('/', (req, res)=>{
    res.render('home.ejs', {name: "aarat"});
})


app.listen(PORT, ()=>{
    console.log(`server is listening on port: ${PORT}`)
})