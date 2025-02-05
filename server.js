const express = require('express');
const bodyParser = require('body-parser');
const utils = require('./utils');;
const dbService = require('./dbService');
const bcrypt = require('bcrypt');
const mysql = require ('mysql2');

 
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT

});

 




const app = express();

app.use(express.static('public'))
app.use(bodyParser.json)

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res)=> {
    res.render('signup')
})

app.get('/logout', (req,res)=> {
res.render.apply('logout')
})

app.post('/login', async (req , res) =>{
    try {

        const { username, password } = req.body
        const db = dbService.getDbServiceInstance();
      
        const result = db.getUserByCredentials(user)

         const passwordMatch = bcrypt.compare(password, result.password);
        if(!passwordMatch){
            return res.status(401).send('Invalid username or password');
        }
        const accessToken = generateToken({ username, id: result.id})
        res.json ({accessToken })
  } 

 catch (err) {
        res.status(400).json({ error: err.message})
    }
})

app.post('/signup', async (req, res) => {
  
    const { username, email, password } = req.body
    const db = dbService.getDbServiceInstance();
    const salt = bcrypt.genSalt(process.env.SALT);
    bcrypt.hash(password, salt);
    const result = db.createUser(username, email, password);

 
    result
    .then(data => res.json({ success:data }))
    .catch( err => console.log(err));

    const accessToken = generateToken({ username, id: result.id})
    res.json({ accessToken})
})
    
 try{
    
    app.listen(process.env.PORT, () => console.log('app.js is running.'));
} catch{
    console.log(error)
}
