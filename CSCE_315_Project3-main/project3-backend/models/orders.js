const pool = require('../database');
const { BadRequestError } = require('../utils/errors');

class Orders {

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

    static async addOrder({addedOrder}) {
        const currDate = new Date();
        const month = currDate.getMonth() + 1;
        const date = currDate.getFullYear() + "-" + month + "-" + currDate.getDate();
        const time = currDate.toTimeString().split(" ")[0];

        const results = await pool.query(
            `INSERT INTO orders (order_date, order_time, employee_id)
            VALUES     ($1, $2, $3)
            RETURNING   *
            `, [date, time, addedOrder.employeeId]
        ); 
        const newOrderId = results.rows[0].id;
        
        const numItems = addedOrder.items.length;
        let totalCost = 0;
        for(let i = 0; i < numItems; i++){
            totalCost += await this.addItem(addedOrder.items[i], newOrderId);
        }
        totalCost = totalCost.toFixed(2);
        const update = await pool.query(
            'UPDATE orders SET order_total=$1 WHERE id=$2 RETURNING *', [totalCost, newOrderId]
        );

        return update.rows[0];
    }

    static async addItem(item, newOrderId){
        // TODO: remove item dependencies from inventory
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
            return price.rows[0].price;
        }
        else{
            throw new BadRequestError("Incorrect Item Format");
        }
        
    }

    static async fetchPopularPairSales({fromDate, toDate}) {
        if (!fromDate || !toDate) {
            throw new BadRequestError("No fromDate or toDate provided");
        }

        //TODO
    }

    
}

module.exports = Orders