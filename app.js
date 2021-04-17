const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodemysql',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL connected');
});

const app = express();

// Create Data Base
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        console.log(result);
        if(err){
            throw err;
        }
        res.send('database created');
    });
});

// Create Table
app.get('/createpoststables', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created ...');
    })  
});


// Insert data
app.get('/addpost', (req, res) => {
    let post = {title: 'Post 1', body: 'This is post number one'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        console.log(result);
        if(err){
            throw err;
        }
        res.send('Post added');
    });
});



// Get data
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        console.log(results);
        if(err){
            throw err;
        }
        res.send('Posts fetched ... ');
    });
});


// Get data with clause
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        console.log(result);
        if(err){
            throw err;
        }
        res.send('Post fetched ...');
    });
});


// Update data with clause
app.get('/update/:id/:value', (req, res) => {
    let sql = `UPDATE posts SET title = '${req.params.value}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        console.log(result);
        if(err){
            throw err;
        }
        res.send('Data updated ... ');
    });
});


// Delete data with clause
app.get('/delete/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        console.log(result);
        if(err){
            throw err;
        }
        res.send('Data deleted ... ');
    });
});



app.listen('3000', () => {
    console.log('Server started on http://localhost:3000');
});