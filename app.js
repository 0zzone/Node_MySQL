// Imports
const express = require('express');
const mysql = require('mysql');

// Create a connection to a DataBase
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'DB_Name',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

db.connect((err) => {
    if(err) throw err;
    console.log('MySQL connected ...');
});

// Create an express app
const app = express();


// Create Data Base
app.get('/createDB', (req, res) => {
    let sql = 'CREATE DATABASE DB_Name';
    db.query(sql, (err, result) => {
        console.log(result);
        if(err) throw err;
        res.send('Database created ...');
    });
});

// Create Table
app.get('/createTable', (req, res) => {
    let sql = 'CREATE TABLE table_name(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table created ...');
    })  
});


// Insert data
app.get('/insert', (req, res) => {
    let data = {title: 'Title', body: 'This is an insert'};
    let sql = 'INSERT INTO table_name SET ?';
    let query = db.query(sql, data, (err, result) => {
        console.log(result);
        if(err) throw err;
        res.send('Insert finished ...');
    });
});



// Get data
app.get('/getData', (req, res) => {
    let sql = 'SELECT * FROM table_name';
    let query = db.query(sql, (err, results) => {
        console.log(results);
        if(err) throw err;
        res.send('Data fetched ...');
    });
});


// Get data with clause
app.get('/getData/:id', (req, res) => {
    let sql = `SELECT * FROM table_name WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        console.log(result);
        if(err) throw err;
        res.send('Data fetched with a clause');
    });
});


// Update data with clause
app.get('/update/:id/:value', (req, res) => {
    let sql = `UPDATE table_name SET title = '${req.params.value}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        console.log(result);
        if(err) throw err;
        res.send('Data updated ... ');
    });
});


// Delete data with clause
app.get('/delete/:id', (req, res) => {
    let sql = `DELETE FROM table_name WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        console.log(result);
        if(err) throw err;
        res.send('Data deleted ... ');
    });
});


// Listening
app.listen('3000', () => {
    console.log('Server started on http://localhost:3000');
});