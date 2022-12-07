const pool = require('../database');
const { BadRequestError } = require('../utils/errors');

class Auth {
    static async getClassification(email){
        console.log(typeof email);
        const q = await pool.query('SELECT type FROM employees WHERE email=$1', [email]);
        // const q = await pool.query('SELECT * FROM employees WHERE id=5');
        return q.rows;
    }

    static async getAll(){
        const q = await pool.query('SELECT * FROM employees');
        return q.rows;
    }
    
    // http://localhost:3001/auth/new?firstName=1123hunter2&lastName=f2123inch4&email=hf2@gmail.com&security_token=2123&type=emp
    static async addEmployee({firstName, lastName, email, type, security_token}){
        if(!(firstName && lastName && email && security_token && type)){
            throw new BadRequestError("Attribute not provided to addEmployee request");
        }
        // console.log(firstName, lastName, email, uin, type);
        const results = await pool.query('INSERT INTO employees (first_name, last_name, date_of_birth, email, type, security_token) VALUES ($1, $2, \'2000-01-01\', $3, $4, $5) RETURNING id, first_name, last_name, email, type, security_token', [firstName, lastName, email, type, security_token]);
        return results.rows[0];
    }

    static async editEmployee({firstName, lastName, email, type, security_token, id}){
        if(!(firstName && lastName && email && security_token && type)){
            throw new BadRequestError("Attribute not provided to addEmployee request");
        }
        const results = await pool.query(
            `UPDATE employees
            SET     first_name = $1,
                    last_name = $2,
                    email = $3,
                    type = $4,
                    security_token = $5
            WHERE id = $6
            RETURNING   id,
                        first_name,
                        last_name,
                        email,
                        type,
                        security_token
            `, [firstName, lastName, email, type, security_token, id]
        );

        return results.rows[0];
    }
}

module.exports = Auth

