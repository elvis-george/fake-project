const { BadRequestError, NotFoundError } = require('../utils/errors');
const pool = require('../database')

class Inventory {
    
    /**
     * This function fetches all Inventory items
     * @returns all the inventory items
     */
    static async fetchAll() {
        const results = await pool.query('SELECT * FROM inventory');

        return results.rows;
    }
    /**
     * This function creates a new Inventory item
     * @param {*} newItem Consists the ingredientName and quantity for the item that is being inserted
     * @return information about the newly added ingredient
     */
    static async createItem(newItem) {
        // Check whether newItem has all required fields
        const requiredFields = ["ingredient_name", "quantity"];
        requiredFields.forEach((field) => {
            if (!newItem?.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing required field - ${field} - in request body`);
            }
        });

        const results = await pool.query(
            `INSERT INTO inventory (ingredient_name, quantity)
            VALUES ($1, $2)
            RETURNING   id, 
                        ingredient_name AS "ingredientName",
                        quantity 
            `, [newItem.ingredient_name, newItem.quantity]
        );

        return results.rows[0];
    }

    /**
     * This function fetches Inventory Item by Id
     * @param {*} inventoryId the Id of the inventory item we are trying to find
     * @returns Item with same Id as input
     */
    static async fetchItemById(inventoryId) {
        if (!inventoryId) {
            throw new BadRequestError("No inventory Id provided");
        }

        const results = await pool.query('SELECT * FROM inventory WHERE id=$1', [inventoryId]);

        const item = results.rows[0];
        
        if (!item) {
            throw new NotFoundError();
        }

        return item;
    }

    /**
     * This function allows the user to edit existing inventory items
     * @param {*} updatedItem contains updated information - ingredientName, quantity - for the inventory item that needs to be updated
     * @param {*} inventoryId  contains Id of the inventory item that needs to be updated
     * @returns information about the updated inventory item
     */
    static async editItem({updatedItem, inventoryId}) {
        if (!inventoryId) {
            throw new BadRequestError("No inventory Id provided");
        }

        // Check whether newItem has all required fields
        const requiredFields = ["ingredient_name", "quantity"];
        requiredFields.forEach((field) => {
            if (!updatedItem?.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing required field - ${field} - in request body`);
            }
        });

        const results = await pool.query(
            `UPDATE inventory
            SET     ingredient_name = $1,
                    quantity = $2
            WHERE id = $3
            RETURNING   id,
                        ingredient_name,
                        quantity
            `, [updatedItem.ingredient_name, updatedItem.quantity, inventoryId]
        );

        return results.rows[0];
    }

    /**
     * This function allows the user to delete an inventory item
     * @param {*} inventoryId 
     * @returns information about the deleted inventory item 
     */
    static async deleteItem(inventoryId) {
        if (!inventoryId) {
            throw new BadRequestError("No inventory Id provided");
        }

        const results = await pool.query('DELETE FROM inventory WHERE id=$1 RETURNING *', [inventoryId]);

        return results.rows[0];
    }

}

module.exports = Inventory