//dbservice
const dotenv = require('dotenv');
const mysql = require('mysql2');
dotenv.config();
let instance = null;

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT


});


class DbService {
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }

 

async createUser(username, email, password) {
    try {
   const insert_ID = await new Promise ((resolve, reject) =>
    {
        pool.execute('INSERT INTO users (user, email, password) VALUES (?,?,?);', [username, email, password], (err, result) =>{
            if (err) reject (new Error(err.message));
            resolve(result.insert_ID);
         
} )
});
 return {
    username : username,
    email: email,
    password: password,
    id: insert_ID


  };
    }

catch {

        console.log(error);
    }
}

async getUserByCredentials (username, password) {

    try {
        await new Promise ((resolve, reject) =>{
            pool.execute('SELECT from users (username, password) VALUES (?,?)', [username, password], (err, results)=> {
                if (err) reject (new Error(err.message));
                if(result.length === 0){
                    return res.status(401).send('Invalid username or password');
                }
                resolve(results);
            })
        
        } )
        return {
            username : username,
            password: password
        
    }
}
    catch {
        console.log(error);
    }

}
}
module.exports = DbService;
