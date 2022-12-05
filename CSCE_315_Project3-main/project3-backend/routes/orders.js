const express = require("express");
const Orders = require("../models/orders");
const router = express.Router();

// Need: 
// (server)  add a new order 
// (general) return order based on order id
// (manager) return order sales report (sales by item in given interval)
// (manager) what sales together

// Health check for orders route
router.get("/", async (req, res, next) => {
    try {
        return res.status(200).json({orders: "orders"})
    } catch (err) {
        next(err);
    }
})

// Returns sales report (sales by item in given time interval)
router.get("/sales", async (req, res, next) => {
    try {
        console.log(req.query);
        const salesReport = await Orders.fetchSalesReport({fromDate: req.query?.fromDate, toDate: req.query?.toDate});
        return res.status(200).json(salesReport);
    } catch (err) {
        next(err);
    }
})

// Add a order (and add all subsequent items) to database
// Usage example:
// {
//     "employeeId": "1",
//     "items" : [
//         {
//             "isCombo"   : "false",
//             "starterId" : "",
//             "baseId"    : "3",
//             "proteinId" : "4"
//         },
//         {
//             "isCombo"   : "",
//             "starterId" : "1",
//             "baseId"    : "",
//             "proteinId" : ""
//         }
//     ]
// }
router.post("/", async(req, res, next) => {
    try {
        const item = await Orders.addOrder({addedOrder:req.body?.orderPlaced});
        return res.status(200).json(item);
    } 
    catch (err) {
        next(err);
    }
})

// Returns most popular pairs of sales (most popular pairs of menu items that were ordered within time frame)
router.get("/pairs", async (req, res, next) => {
    try {
        console.log(req);
        const pairSales = await Orders.fetchPopularPairSales({fromDate: req.body?.fromDate, toDate: req.body?.toDate});
        return res.status(200).json(pairSales);
    } catch (err) {
        next(err);
    }
})

module.exports = router;