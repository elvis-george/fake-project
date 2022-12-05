const { BadRequestError, NotFoundError } = require('../utils/errors');
const pool = require('../database')

class Menu {
    
    /**
     * This function fetches all menu items
     * @returns all menu items
     */
    static async fetchAll() {
        const results = await pool.query('SELECT name FROM starters UNION ALL SELECT name FROM bases UNION ALL SELECT name FROM proteins');
        return results.rows;
    }

    /**
     * This function creates a new menu item
     * @param {*} addedItem is a json object that consists of the required fields - name, quantity, price
     * @param {*} itemType is a json object that defines which table the new item is added to - protein, base, or starter.
     * @returns The newly added item.
     */
    static async addItem({addedItem, itemType}) {
        // Check whether newItem has all required fields
        const requiredFields = ["name", "quantity", "price"];
        requiredFields.forEach((field) => {
            if (!addedItem?.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing required field - ${field} - in request body`);
            }
        });

        console.log(itemType);

        if(itemType === "base"){
            console.log('am here');
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

    /**
     * This function allows the user to edit a pre-existing menu item
     * @param {*} updatedItem is a json object that contains all the updated information about a pre-existing item in the menu
     * @param {*} itemType is a json object that defines the type of the item, whether it is a base, protein, or starter.
     * @returns the updated item
     */
    static async editItem({updatedItem, itemType}) {
        if (!itemType) {
            throw new BadRequestError("No itemType provided");
        }

        // Check whether newItem has all required fields
        const requiredFields = ["id", "name", "quantity", "price"];
        requiredFields.forEach((field) => {
            if (!updatedItem?.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing required field - ${field} - in request body`);
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

    /**
     * This function helps the user delete a menu item
     * @param {*} itemTypeId is a json object that consists information about the type of the menu item and the id separated by a '-'
     * @returns the deleted item
     */
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
    /**
     * This function displays all the menu items of a specific type or a specific menu item depending on what the user asks.
     * @param {*} itemTypeId consists of the type of the menu item (base, protein, starter) and the id of the menu item.
     * @returns either all the items of a specific type, or a specific item defined by type and id.
     */
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
    
    /**
     * This function displays the menu item name and price respectively
     * @returns all the menu items and their respective prices
     */
    static async fetchAllPrices() {

        const results = await pool.query(`SELECT name, price FROM starters UNION ALL SELECT name, price FROM bases`);

        return results.rows;
    }

}

module.exports = Menu