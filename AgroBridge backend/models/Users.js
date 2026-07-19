const db = require("../config/db");

const User = {

    create: (userData, callback) => {

        // Labour Registration
        if (userData.role === "labourer") {

            const sql = `
            INSERT INTO users (
                email,
                password,
                role,
                photo,
                name,
                age,
                village,
                skills,
                phone
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            return db.query(
                sql,
                [
                    userData.email,
                    userData.password,
                    userData.role,
                    userData.photo,
                    userData.name,
                    userData.age,
                    userData.village,
                    userData.skills,
                    userData.phone
                ],
                callback
            );
        }

        // Farmer Registration
        if (userData.role === "farmer") {

            const sql = `
            INSERT INTO users (
                email,
                password,
                role,
                photo,
                name,
                farmtype,
                village,
                farmsize,
                noofworkers,
                phone
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            return db.query(
                sql,
                [   
                    userData.email,
                    userData.password,
                    userData.role,
                    userData.photo,
                    userData.name,
                    userData.farmtype,
                    userData.village,
                    userData.farmsize,
                    userData.noofworkers,
                    userData.phone
                    
                ],
                callback
            );
        }

    },

    findByEmail: (email, callback) => {

        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            callback
        );

    },

    findByRole: (role, callback) => {

        db.query(
            "SELECT id,name,email,role,phone,status,village,age,farmtype,farmsize,noofworkers,skills,photo FROM users WHERE role = ?",
            [role],
            callback
        );

    },

    findById: (id, callback) => {

        db.query(
            "SELECT id,name,email,role,phone,status,village,age,farmtype,farmsize,noofworkers,skills,photo FROM users WHERE id = ?",
            [id],
            callback
        );

    },

    getAllUsers: (callback) => {

    db.query(
        "SELECT  id,name,email,role,phone,status,village,age,farmtype,farmsize,noofworkers,skills,photo FROM Users",
        callback
    );

},

    updateStatus: (id, status, callback) => {

        db.query(
            "UPDATE users SET status = ? WHERE id = ?",
            [status, id],
            callback
        );
    },

    deleteUser: (id, callback) => {
        db.query(
            "DELETE From users WHERE id = ?",
            [id],
            callback
        );
    }

};

module.exports = User;