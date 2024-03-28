const express = require('express');
const app = express();
const morgan = require('morgan');
const http = require('http');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const _ = require ('lodash');
const fs = require ('fs');


//connect to MongoDB
const dbURI = 'mongodb+srv://pritee_perscholas:AGC6f1lik5pmwpaz@atlascluster.d9evfbt.mongodb.net/SBA308A';
mongoose.connect(dbURI);
// .then((result) => {
//     res.send(result);
// })
// .catch((err) => {
//     console.log(err);
// })


// const data = 

//register view engine
app.set('view engine', 'ejs')

//listen for requests
app.listen(3000);

//Middleware and Static Files
app.use(express.static('styles'));
app.use(morgan('dev'));
// app.use(express.urlencoded({ extended: true }));

//mongoose and mongo sandbox routes

//routes
app.get('/add.blog', (req, res) => {
    const blog = new Blog({
    title: 'one more new blog',
    snippet: 'more about blogs',
    body: 'new about blogs'
    });
    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/single-blog', (req, res) => {
    Blog.findById('6604319064a9767035fd0233')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/', (req, res) => {
res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    // res.send('<p>About Page</p>');
    // res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', { title: 'About'});
})

//blog routes
app.get('/blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result});
    })
    .catch((err) => {
        console.log(err);
    })
})

//create request
app.get('/blogs/create', (req, res) => {
res.render('create', { title: 'Create new Blog'});
})

app.post('/blogs', (req, res) => {
    console.log(req.body);
})

// redirects
app.get('/about-me', (req, res) => {
    res.redirect('/about');
})

//404 Not Found
app.use((req, res) => {
    // Send a response to the client
    res.status(404).render('404', { title: '404'});
  });


  