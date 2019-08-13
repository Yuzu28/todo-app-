
const db = require('../db');

function getAll(
)
    
    function getOne(id){
        db.one(`
            select * from todos where id=$1
        
        `, [id])
            .then((data) => {
                console.log('here is the data');
                console.log(data);
            })
            .catch((e) => {
                console.log('Oh no')
                console.log(e)
            })
    
    }
    getOne(1);
    
    // console.log(db);



// when you want one and only one
//use the .one() method
//that way, if you don't find it
//it triggers the .catch(
//this is better that doing an if/else
//inside your .then().
//.one() will throw an exception if it gets anything but 1 and only 1 result.




// function getOne(id){
//     db.one(`
//         select * from todos where id=$1
    
//     `, [id])
//         .then((data) => {
//             console.log('here is the data');
//             console.log(data);
//         })
//         .catch((e) => {
//             console.log('Oh no')
//             console.log(e)
//         })

// }
// getOne(1);