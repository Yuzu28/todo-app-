const http = require('http');

const todo = require('./models/todo');

const server = http.createServer((req, res) => {
    console.log('it work ')
    const allTodos = todo.getAll();
    allTodos
        .then((data) => {
                    console.log('here is the data:');
                    console.log(data);
                })
    console.log("++++++++++++++++++++++++++++++++++++++")
    console.log(allTodos);
    // res.end(allTodos);


});

server.listen(3000);