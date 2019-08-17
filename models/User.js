//1: Collect the prep ingredients
const db = require('../db');

//2. Cook
async function getAll(){
    const users =await db.any(`
        select * from users
    `);
    // .catch((error) =>{
    //     console.log('Error getting user');
    //     console.log(error);
    // }) 
    return users;
}

//use await to convert funtion 
// await gives you an automatic .then and a return 
async function getOne(id){
    try{
    const user = await db.one(`
        select * from users where id=$1

    `, [id])

    const todosForUser = await db.any(`
    select * from todos where user_id=$1
    `, [user.id]);

        
        user.todos = todosForUser;
        console.log(todosForUser);
        return user;
    } catch(error){
        console.log('there was an error')
        return{
            id:0,
            displayname: "No user found"
        }
    }
    };
    // .then((user) => {
    //     // get all todos for this user
    //     const todos = db.any(`
    //         select * from todos where user_id =$1
    //     `, [id])
    //     .then((todosForUser) => {
    //         console.log(todosForUser);
    //         user.tools = todosForUser;
    //         return user;
    //     })
    //     // user.catName = 'Harry'
    //     return todos;
    // })
//     .catch((error) =>{
//         console.log('Error getting user');
//         console.log(error);
//     }) 
// }


//accepts an object argument so we have flexbility later on.
//that is, we can add more database colums
//without having to update all of our function calls

// const { displayname, username } = userDataObj; is destructing the argument value

async function createUser({ displayname, username } ){
    // const { displayname, username } = userDataObj;
    const newUserInfo = await db.one(`
        insert into users
            (displayname, username)
        values ($1, $2)

        returning id

    `, [displayname, username]);

    console.log(newUserInfo)
    return newUserInfo ;
}
async function createToDo({priority, task, status}){

    console.log("You have work to do");
        const taskForUser = await db.one(`
        insert into todos
            (priority, task, status)
        values($1, $2, $3)
        returning id
            
        `,[priority, task, status]);
        
        console.log(taskForUser);
    
        return taskForUser;
    }





// createUser({
//     displayname: "Randomahahah",
//     username: "zeref"
// })
//3. Serve.
module.exports = {
    getAll,
    getOne,
    createUser,
    createToDo

};