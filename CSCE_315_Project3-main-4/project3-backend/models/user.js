const pool = require('../database');
const { BadRequestError } = require('../utils/errors');

class Auth {

    /**
     * This function gets the type of employee
     * @param {*} email email address of the employee
     * @returns The type of employee
     */
    static async getClassification(email){
        const q = await pool.query('SELECT type FROM employees WHERE email=$1', [email]);
        return q.rows;
    }

    /**
     * This function gets all employees from the database
     * @returns The all employee information
     */
    static async getAll(){
        const q = await pool.query('SELECT * FROM employees');
        return q.rows;
    }
    
    /**
     * This function adds an employee to the database
     * @param {*} firstName first name of new user
     * @param {*} lastName last name of new user
     * @param {*} email email address of new user
     * @param {*} type employee type of new user
     * @param {*} security_token unique security token of the new user
     * @returns The new employee information
     */
    static async addEmployee({firstName, lastName, email, type, security_token}){
        if(!(firstName && lastName && email && security_token && type)){
            throw new BadRequestError("Attribute not provided to addEmployee request");
        }
        const results = await pool.query('INSERT INTO employees (first_name, last_name, date_of_birth, email, type, security_token) VALUES ($1, $2, \'2000-01-01\', $3, $4, $5) RETURNING id, first_name, last_name, email, type, security_token', [firstName, lastName, email, type, security_token]);
        return results.rows[0];
    }


    /**
     * This function edits a database employee entry
     * @param {*} firstName first name of the user
     * @param {*} lastName last name of the user
     * @param {*} email email address of the user
     * @param {*} type employee type of the user
     * @param {*} security_token unique security token of the user
     * @returns The updated employee information
     */
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
