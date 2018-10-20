var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;
app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/api/genres', function(req, res) {
    Genre.getGenres(function(err, genres){
        if(err) {
            throw err;
        }
        res.json(genres);
    });
});

app.post('/api/genres', function(req, res) {
    var genre = req.body;
    Genre.addGenre(genre, function(err, genre){
        if(err) {
            throw err;
        }
        res.json(genre);
    });
});

app.put('/api/genres/update/:id', function(req, res) {
    var id = req.params.id;
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, function(err, genre){
        if(err) {
            throw err;
        }
        res.json(genre);
    });
});

app.delete('/api/genres/remove/:id', function(req, res) {
    var id = req.params.id;
    Genre.removeGenre(id, function(err, genre){
        if(err) {
            throw err;
        }
        res.json(genre);
    });
});

app.get('/api/books', function(req, res) {
    Book.getBooks(function(err, books){
        if(err) {
            throw err;
        }
        res.json(books);
    });
});

app.get('/api/books/:id', function(req, res) {
    Book.getBookById(req.params.id, function(err, book){
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

app.post('/api/books', function(req, res) {
    var book = req.body;
    Book.addBook(book, function(err, book){
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

app.put('/api/books/update/:id', function(req, res) {
    var id = req.params.id;
    var book = req.body;
    Book.updateBook(id, book, {}, function(err, book){
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

app.delete('/api/books/remove/:id', function(req, res) {
    var id = req.params.id;
    Book.removeBook(id, function(err, book){
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

app.listen(5000);
console.log('Running on port 5000');