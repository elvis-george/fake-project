const pool = require('../database');
const { BadRequestError } = require('../utils/errors');
const Menu = require("./menu")

class Orders {
    
    /**
     * This function generates the Sales Report
     * @param {*} fromDate stores the date at which the sales report should start
     * @param {*} toDate stores the date at which the sales report should end
     * @returns All the sales made between fromDate and toDate
     */
    static async fetchSalesReport({fromDate, toDate}) {
        if (!fromDate || !toDate) {
            throw new BadRequestError("No fromDate or toDate provided");
        }

        const results = await pool.query(`
            SELECT      starters.name, 
                        COUNT(*) 
                FROM orders,items,starters 
                WHERE orders.order_date BETWEEN $1 AND $2 
                    AND orders.id=items.order_id 
                    AND items.starter_id=starters.id 
                GROUP BY starters.name 

            UNION ALL 

            SELECT      bases.name, 
                        COUNT(*) 
                FROM orders,items,bases 
                WHERE orders.order_date BETWEEN $1 AND $2  
                    AND orders.id=items.order_id 
                    AND items.base_id=bases.id 
                GROUP BY bases.name 

            UNION ALL 

            SELECT      proteins.name, 
                        COUNT(*) 
                FROM orders,items,proteins 
                WHERE orders.order_date BETWEEN $1 AND $2
                AND orders.id=items.order_id 
                AND items.protein_id=proteins.id 
                GROUP BY proteins.name 
                
            ORDER BY count DESC

        `,[fromDate, toDate]);

        return results.rows;
    }

    /**
     * This function creates a new order with default values and calls the addItem() function to populate the order table and the item table
     * @param {*} addedOrder consists of the default information about a new order
     * @returns The newly added order
     */
    static async addOrder({employeeId, items}) {
        const currDate = new Date();
        const month = currDate.getMonth() + 1;
        const date = currDate.getFullYear() + "-" + month + "-" + currDate.getDate();
        const time = currDate.toTimeString().split(" ")[0];

        const results = await pool.query(
            `INSERT INTO orders (order_date, order_time, employee_id)
            VALUES     ($1, $2, $3)
            RETURNING   *
            `, [date, time, employeeId]
        ); 
        const newOrderId = results.rows[0].id;
        
        const numItems = items.length;
        let totalCost = 0;
        for(let i = 0; i < numItems; i++){
            
            totalCost += await this.addItem(items[i], newOrderId);
            
        }
        totalCost = totalCost.toFixed(2);
        const update = await pool.query(
            'UPDATE orders SET order_total=$1 WHERE id=$2 RETURNING *', [totalCost, newOrderId]
        );

        return update.rows[0];
    }
    /**
     * This function is called withing the addedOrder() function to populate the items table and then the order with the menu items that have been ordered
     * @param {*} item contains information about the menu item that was ordered
     * @param {*} newOrderId contains the id of the order to which the item is linked
     * @returns 
     */
    static async addItem(item, newOrderId){
        if(item.baseId){
            let basePrice = await pool.query('SELECT id,price FROM bases WHERE id=$1', [item.baseId]);
            let price = basePrice.rows[0].price; 
            if(item.isCombo === "true"){
                price += 1.30;
            } 
            const results = await pool.query(
                `INSERT INTO items (is_combo, order_id, base_id, protein_id, cost)
                VALUES     ($1, $2, $3, $4, $5)
                RETURNING   id
                `, [item.isCombo, newOrderId, item.baseId, item.proteinId, price]
            );
            await this.updateInventoryAndMenu({type: "base", itemId: item.baseId});
            await this.updateInventoryAndMenu({type: "protein", itemId: item.proteinId});
            return price;
        }
        else if(item.starterId){
            const price = await pool.query('SELECT id,price FROM starters WHERE id=$1', [item.starterId]);
            const isCombo = "false";
            const results = await pool.query(
                `INSERT INTO items (is_combo, order_id, starter_id, cost)
                VALUES     ($1, $2, $3, $4)
                RETURNING   id
                `, [isCombo, newOrderId, item.starterId, price.rows[0].price]
            ); 
            await this.updateInventoryAndMenu({type: "starter", itemId: item.starterId});
            return price.rows[0].price;
        }
        else{
            throw new BadRequestError("Incorrect Item Format");
        }
        
    }

    // This function updates the quantity of the given menu item along with its associated inventory ingredients
    static async updateInventoryAndMenu({type, itemId}) {
        const associatedInventoryItems = await pool.query(
            `SELECT inventory_id FROM menu_inventory_bridge WHERE ${type+"_id"}=$1`, [itemId]
        );

        for (const item of associatedInventoryItems.rows) {
            await pool.query(
                `UPDATE inventory SET quantity=quantity-1 WHERE id=$1`, [item.inventory_id]
            );
        }

        await pool.query(
            `UPDATE ${type+"s"} SET quantity=quantity-1 WHERE id=$1`, [itemId]
        );
    }

    /**
     * This function generates the 'What Sales Together Report' 
     * @param {*} fromDate stores the date at which the 'What Sales together Report' should start
     * @param {*} toDate stores the date at which the 'What Sales together Report' should end
     * @returns Pairs of menu items that are most popular among the customers
     */
    static async fetchPopularPairSales({fromDate, toDate}) {
        if (!fromDate || !toDate) {
            throw new BadRequestError("No fromDate or toDate provided");
        }

        const results = await pool.query(
            `SELECT t1.itemType AS type1, t1.itemId AS item1, t2.itemType AS type2, t2.itemId AS item2, count(*) 
            FROM (SELECT items.id, unnest(array['base','protein','starter']) as itemType, unnest(array[base_id,protein_id,starter_id]) as itemId, orders.order_date, items.order_id FROM items, orders 
            WHERE orders.id=items.order_id 
            AND orders.order_date BETWEEN $1 AND $2  
            ORDER BY id) 
            AS t1 

            JOIN (SELECT items.id, unnest(array['base','protein','starter']) as itemType, unnest(array[base_id,protein_id,starter_id]) as itemId, orders.order_date, items.order_id 
            FROM items, orders 
            WHERE orders.id=items.order_id AND orders.order_date BETWEEN $1 AND $2  
            ORDER BY id) 
            AS t2 

            ON t1.order_id=t2.order_id AND t1.itemId < t2.itemId AND t1.itemType != t2.itemType 
            GROUP BY t1.itemId, t2.itemId, t1.itemType, t2.itemType 
            ORDER BY count(*) DESC`, [fromDate, toDate]
        );

        return results.rows;

    }

    // This functions takes in a date and returns the excess report
    static async fetchExcessReport({fromDate}) {
        if (!fromDate) {
            throw new BadRequestError("No fromDate provided");
        }

        const starterResults = await pool.query(
            `SELECT starters.name
            FROM starters 
            JOIN (SELECT items.starter_id, COUNT(items.starter_id) FROM orders JOIN items ON orders.id=items.order_id WHERE orders.order_date BETWEEN $1 AND current_date GROUP BY items.starter_id) 
            AS sold 
            ON starters.id=sold.starter_id 
            WHERE (starters.quantity+sold.count)*0.1>sold.count
            `, [fromDate]
        );

        const baseResults = await pool.query(
            `SELECT bases.name
            FROM bases 
            JOIN (SELECT items.base_id, COUNT(items.base_id) FROM orders JOIN items ON orders.id=items.order_id WHERE orders.order_date BETWEEN $1 AND current_date GROUP BY items.base_id) 
            AS sold 
            ON bases.id=sold.base_id 
            WHERE (bases.quantity+sold.count)*0.1>sold.count
            `, [fromDate]
        );

        const proteinResults = await pool.query(
            `SELECT proteins.name
            FROM proteins 
            JOIN (SELECT items.protein_id, COUNT(items.protein_id) FROM orders JOIN items ON orders.id=items.order_id WHERE orders.order_date BETWEEN $1 AND current_date GROUP BY items.protein_id) 
            AS sold 
            ON proteins.id=sold.protein_id 
            WHERE (proteins.quantity+sold.count)*0.1>sold.count
            `, [fromDate]
        );

        const excessReport = starterResults.rows.concat(baseResults.rows, proteinResults.rows);

        return excessReport;

    }
}

module.exports = Orders