const db = require('../db');

async function getAll() {
    try{
    //db.any returns a promise
    return await db.any(`
    select * from todos
    `)
        // .then((data) => {
        //     console.log('here is the data:');
        //     console.log(data);
        // })
    }
    catch(error){
        console.log(error);
        return []
        }
    }

async function getOne(id) {
    try{
    // When you want one and only one,
    // use the .one() method.
    // That way, if you don't find it,
    // it triggers the .catch().
    // This is better than doing an if/else
    // inside your .then().
    // .one() will throw an exception if it
    // gets anything but 1 and only 1 result.
    const aTodo = await db.one(`
        select * from todos where id=$1
    `, [id]);
    return aTodo;
} catch(error){
        console.log('Oh no is didnt work');
        console.log(error);
        return {}
        }
    }
  


module.exports = {
    // This is the same as
    // getAll: getAll,
    getAll,
    getOne,
};