// const http = require('http');
//replace http with express
const express = require('express');
const todo = require('./models/todo');

//Create the server and call it "app"
const app = express();
//create a variable for the port#
const port = 3000;


// const server = http.createServer((req, res) => {
// Replace with app.get()
app.get('/todos',(req, res) => {
    //adds a programatic breakpoint
    //for the chrome dev tools
    // debugger;

    console.log('it work ')
    const allTodos = todo.getAll();
    allTodos
        .then((data) => {
                    console.log('here is the data:');
                    console.log(data);
                    // res.end(JSON.stringify(data));
                    res.json(data);
                })
    console.log("++++++++++++++++++++++++++++++++++++++")
    console.log(allTodos);
    // res.end(allTodos);

});


app.get('/todos/:taskId', (req, res) => {
    console.log("you ask for a specific task");
    console.log(req.params.taskId);

    //convert the route param to a number
    //and make sure it's in base 10
    const theId = parseInt(req.params.taskId,10);
    const aTodo = todo.getOne(req.params.taskId);
    aTodo.then((data) => {
        res.json(data);
    })
    // res.send('You requested to see a profile with the id of ' + req.params.taskId)
});

// server.listen(3000);
app.listen(port);










//Notes
//app is express
// app.get('/',(req, res) => {
//   '/' is the rounte and then use this function to handle the request and response
