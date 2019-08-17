// const http = require('http');
//replace http with express
const express = require('express');
const todo = require('./models/todo');
const User = require('./models/User');

const { sanitizeBody } = require('express-validator');

const es6Renderer = require('express-es6-template-engine');

//Create the server and call it "app"
const app = express();
app.engine('html', es6Renderer);
app.set('views','views');
app.set('view engine', 'html');

//will go in a directory named "public"
app.use(express.static('public'));
//use the urlencoded middleware
//to read POST bodies
app.use(express.urlencoded({extended: true}));

app.use((req, res, next ) => {
    console.log('I am middleware yes');
    console.log(req.url);

    // res.send("sorry");
    next()
});

//create a variable for the port#
const port = 3000;

app.get('/', (req,res) => {
    res.render('index', {
        locals: {
            message: "It is time for lunch"
        },
        partials: {
            navbar:'navbar',
            includes: 'include'

        }
    });
});

// *********************************************************
app.get('/profile', (req,res) => {
    res.render('profile', {
        locals: { 
            
        },
        partials: {
            navbar:'navbar',
            includes: 'include'
        }
    });
});

app.get('/profile/todos', async (req,res) => {
    const userID = 1;
    const theUser = await User.getOne(userID);
    console.log(theUser);
    res.render('todos', {
        locals: {
            todos: theUser.todos
            
        },
        partials: {
            navbar:'navbar',
            includes: 'include'
        }
    });
});

// 1.Allow the user to GET the form for creating a todo
app.get('/profile/todos/create', (req,res) =>{
    // render the "create new todo" form template
        res.render('create-todos', {
            locals: {
                
            },
            partials: {
                navbar:'navbar',
                includes: 'include'
            }
        });
    });


//2.Process the body of the form they POSTs
app.post('/profile/todos/create', [
    sanitizeBody('task').escape(),

], async (req,res) =>{
    //Handle the req.body from the "create new todo" form

    console.log(req.body);

    //normally, we dont include the user id in the form.
    //when you log into a site, it keeps track of you id for you
    const taskId = await todo.create(req.body.user_id, req.body);
    res.send(taskId);
});


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


app.get('/todos/:taskId',  (req, res) => {
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


//to conver to anonymous async function:
//1: put asunc before the param list
//2: Put await 




app.get('/users', async (req, res) => {
    const allUsers = await User.getAll();
    
    res.json( allUsers);
      
});


app.get('/users/:userId', async (req, res) => {
    const theId = parseInt(req.params.userId,10);
    const aUser = await User.getOne(theId);
    
    res.json(aUser);

});

app.post('/users', [
    sanitizeBody('username').escape(),
    sanitizeBody('displayname').escape()


],async (req, res) => {
    console.log('we got a POST request')

    res.send('awesome');

    console.log('Here is the body');
    console.log(req.body);

    const newUserInfo = await User.createUser({
        // displayname: "Random",
        // username: "klknlh"
        displayname: req.body.displayname,
        username: req.body.username 
    })
});

app.post('/users/:userId/todo', async(req, res) => {
    const newToDo = await User.createToDo(req.body)
    res.json(newToDo);
    console.log(req.body);
})
// http://localhost:3000/todos/

// server.listen(3000);
app.listen(port);










//Notes
//app is express
// app.get('/',(req, res) => {
//   '/' is the rounte and then use this function to handle the request and response
