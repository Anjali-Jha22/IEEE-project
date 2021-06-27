const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/reginfo', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb://localhost:27017/feedinfo', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;


// DEFINE MONGOOSE SCHEMA
const regSchema = new mongoose.Schema({
    myname: String,
    myaaad: String,
    mydate: String,
    mynum: String,
    mywhr: String,
    mygen: String,
    mytext: String,
    
  });
const reg = mongoose.model('reg', regSchema);

const feedSchema = new mongoose.Schema({
    ourname: String,
    ourno: String,
    ourtext: String,
    
    
  });
const feed = mongoose.model('feed', regSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/register', (req, res)=>{
    const params = {}
    res.status(200).render('register.pug', params);
})
app.get('/feedback', (req, res)=>{
    const params = {}
    res.status(200).render('feedback.pug', params);
})
app.post('/register', (req, res)=>{
    var myData = new reg(req.body);
    myData.save().then(()=>{
        res.send('This item has been saved to the database')
        }).catch(()=>{
        res.status(400).send('item was not saved to the databse')
    });
    
})

app.post('/feedback', (req, res)=>{
    var myData1 = new feed(req.body);
    myData1.save().then(()=>{
        res.send('This item has been saved to the database')
        }).catch(()=>{
        res.status(400).send('item was not saved to the databse')
    });
    
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});