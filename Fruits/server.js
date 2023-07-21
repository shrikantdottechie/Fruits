require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');
const Fruit = require('./models/fruits.js'); //NOTE: it must start with ./ if it's just a file, not an NPM package

//Set up middleware
app.use(methodOverride('_method'));
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: false }));
//const Show = require('./views/Show.jsx');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
//... and then farther down the file
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});
mongoose.set('strictQuery', true);
//index route = Show all records
app.get('/fruits', (req, res) => {
    //res.send(fruits);
    //res.render('Show');
    //res.render('Index', { fruits: fruits });
    Fruit.find({}, (error, allFruits) => {
        res.render('Index', {
            fruits: allFruits//getting all fruits from db to pass as props
        });
    });
});

//New - get a form to create a new record
//put this above your Show route
app.get('/fruits/new', (req, res) => {
    res.render('New');
});

//Delete - Delete  this one record
app.delete('/fruits/:id', (req, res) => {
    Fruit.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/fruits');//redirect back to fruits index
    });
});
//Update - modifying a record
app.put('/fruits/:id', (req, res) => {
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    Fruit.findByIdAndUpdate(req.params.id, req.body, (err, updatedFruit) => {
        console.log(updatedFruit)
        res.redirect(`/fruits/${req.params.id}`);
    });
});
//Create - send the filled form to DB and create a new record

app.post('/fruits', (req, res) => {
    if (req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;//do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;//do some data correction
    }
    Fruit.create(req.body, (error, createdFruit) => {
        res.redirect('/fruits'); // send the user back to /fruits
    });
    /*fruits.push(req.body);
    console.log(req.body);
    res.redirect('/fruits');*/ //send the user back to /fruits
});

//Edit - go to DB to and get the record to update

app.get('/fruits/:id/edit', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => { //find the fruit
        if (!err) {
            res.render(
                'Edit',
                {
                    fruit: foundFruit //pass in the found fruit so we can prefill the form
                }
            );
        } else {
            res.send({ msg: err.message })
        }
    });
});

//Show route = Show a particular record
//add show route
/*
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    res.send(fruits[req.params.indexOfFruitsArray]);
});*/

app.get('/fruits/:id', function (req, res) {
    Fruit.findById(req.params.id, (err, foundFruit) => {
        console.log(foundFruit)
        res.render('Show', { //second param must be an object
            fruit: foundFruit
        });
    });
});

app.listen(port, () => {
    console.log('Listening');
});