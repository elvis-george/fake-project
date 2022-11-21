const { BadRequestError, NotFoundError } = require('../utils/errors');
const pool = require('../database')

class Menu {
    
    /* Fetch all Inventory Items */
    static async fetchAll() {
        const results = await pool.query('SELECT name FROM starters UNION ALL SELECT name FROM bases UNION ALL SELECT name FROM proteins');
        return results.rows;
    }

    /* Create new Inventory Item */
    static async addItem({addedItem, itemType}) {
        // Check whether newItem has all required fields
        const requiredFields = ["name", "quantity", "price"];
        requiredFields.forEach((field) => {
            if (!addedItem?.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing required field - ${field} - in request body`);
            }
        });

        if(itemType === "base"){
            const results = await pool.query(
                `INSERT INTO bases (name, quantity, price)
                VALUES     ($1, $2, $3)
                RETURNING   id,
                            name,
                            quantity,
                            price
                `, [addedItem.name, addedItem.quantity, addedItem.price]
            );    
            return results.rows[0];
        }
        if(itemType === "starter"){
            const results = await pool.query(
                `INSERT INTO starters (name, quantity, price)
                VALUES     ($1, $2, $3)
                RETURNING   id,
                            name,
                            quantity,
                            price
                `, [addedItem.name, addedItem.quantity, addedItem.price]
            );    
            return results.rows[0];
        }
        if(itemType === "protein"){
            const results = await pool.query(
                `INSERT INTO proteins (name, quantity)
                VALUES     ($1, $2)
                RETURNING   id,
                            name,
                            quantity
                `, [addedItem.name, addedItem.quantity]
            );    
            return results.rows[0];
        }
        throw new BadRequestError("Error: Invalid item type");
    }

    /* Edit Inventory Item */
    static async editItem({updatedItem, itemType}) {
        if (!itemType) {
            throw new BadRequestError("No itemType provided");
        }

        // Check whether newItem has all required fields
        const requiredFields = ["id", "name", "quantity", "price"];
        requiredFields.forEach((field) => {
            if (!updatedItem?.hasOwnProperty(field)) {
                throw new BadRequestError('Missing required field - ${field} - in request body');
            }
        });

        if(itemType === "base"){
            const results = await pool.query(
                `UPDATE bases
                SET     name = $1,
                        quantity = $2,
                        price = $3
                WHERE id = $4
                RETURNING   id,
                            name,
                            quantity,
                            price
                `, [updatedItem.name, updatedItem.quantity, updatedItem.price, updatedItem.id]
            );
    
            return results.rows[0];
        }
        if(itemType === "starter"){
            const results = await pool.query(
                `UPDATE starters
                SET     name = $1,
                        quantity = $2,
                        price = $3
                WHERE id = $4
                RETURNING   id,
                            name,
                            quantity,
                            price
                `, [updatedItem.name, updatedItem.quantity, updatedItem.price, updatedItem.id]
            );
    
            return results.rows[0];
        }
        if(itemType === "protein"){
            const results = await pool.query(
                `UPDATE proteins
                SET     name = $1,
                        quantity = $2,
                WHERE id = $3
                RETURNING   id,
                            name,
                            quantity,
                            price
                `, [updatedItem.name, updatedItem.quantity, updatedItem.id]
            );
    
            return results.rows[0];
        }
        throw new BadRequestError("Error: Invalid item type");
    }

    /* Delete Inventory Item */
    static async deleteItem(itemTypeId) {
        if (!itemTypeId) {
            throw new BadRequestError("No itemTypeId provided");
        }

        if(itemTypeId.split("-")[0] === "base"){
            const results = await pool.query('DELETE FROM bases WHERE id=$1 RETURNING *', [itemTypeId.split("-")[1]]);
            return results.rows[0]; 
        }
        if(itemTypeId.split("-")[0] === "protein"){
            const results = await pool.query('DELETE FROM proteins WHERE id=$1 RETURNING *', [itemTypeId.split("-")[1]]);
            return results.rows[0]; 
        }
        if(itemTypeId.split("-")[0] === "starter"){
            const results = await pool.query('DELETE FROM starters WHERE id=$1 RETURNING *', [itemTypeId.split("-")[1]]);
            return results.rows[0]; 
        }
        throw new BadRequestError("Invalid type-id");
    }

    /* Get Inventory Item */
    static async fetchItemById(itemTypeId) {
        if (!itemTypeId) {
            throw new BadRequestError("No itemTypeId provided");
        }
        // ~~~/menu/type-id
        if(itemTypeId.split("-").length == 1){
            if(itemTypeId.split("-")[0] === "base"){
                const results = await pool.query('SELECT * FROM bases');
                return results.rows; 
            }
            if(itemTypeId.split("-")[0] === "protein"){
                const results = await pool.query('SELECT * FROM proteins');
                return results.rows; 
            }
            if(itemTypeId.split("-")[0] === "starter"){
                const results = await pool.query('SELECT * FROM starters');
                return results.rows; 
            }
        }
        else if(itemTypeId.split("-").length == 2){
            if(itemTypeId.split("-")[0] === "base"){
                const results = await pool.query('SELECT * FROM bases WHERE id=$1', [itemTypeId.split("-")[1]]);
                return results.rows[0]; 
            }
            if(itemTypeId.split("-")[0] === "protein"){
                const results = await pool.query('SELECT * FROM proteins WHERE id=$1', [itemTypeId.split("-")[1]]);
                return results.rows[0]; 
            }
            if(itemTypeId.split("-")[0] === "starter"){
                const results = await pool.query('SELECT * FROM starters WHERE id=$1', [itemTypeId.split("-")[1]]);
                return results.rows[0]; 
            }
        }
        throw new BadRequestError("Invalid type-id");
    }
    /* Fetch prices for starters and bases */
    static async fetchAllPrices() {

        const results = await pool.query(`SELECT name, price FROM starters UNION ALL SELECT name, price FROM bases`);

        return results.rows;
    }

}

module.exports = Menu