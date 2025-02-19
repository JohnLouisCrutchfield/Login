const dotenv = require("dotenv");
const mysql = require("mysql2");

dotenv.config();
let instance = null;

const pool = mysql.createPool({
    host: process.env.HOST || 'localhost',
    user:  'root',
    password: process.env.PASSWORD || 'Fayolove2',
    database: process.env.DATABASE || 'yourdatabase',
    port: process.env.DB_PORT || '3306',
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async createUser(username, email, password) {
        try {
            return new Promise((resolve, reject) => {
                pool.execute(
                    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                    [username, email, password],
                    (err, result) => {
                        if (err) {
                            console.error("Database Error (Create User):", err);
                            return reject(new Error("Database Error: Could not insert user."));
                        }
                        resolve({ username, email, id: result.insertId });
                    }
                );
            });
        } catch (error) {
            console.error("Unexpected Error in createUser:", error);
        }
    }

    async getUserByCredentials(username) {
        try {
            return new Promise((resolve, reject) => {
                pool.execute(
                    "SELECT id, username, password FROM users WHERE username = ?",
                    [username],
                    (err, results) => {
                        if (err) {
                            console.error("Database Error (Get User):", err);
                            return reject(new Error("Database Error: Could not fetch user."));
                        }
                        resolve(results.length ? results[0] : null);
                    }
                );
            });
        } catch (error) {
            console.error("Unexpected Error in getUserByCredentials:", error);
        }
    }
}

module.exports = DbService;
