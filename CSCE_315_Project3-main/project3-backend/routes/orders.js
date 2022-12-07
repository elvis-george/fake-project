const express = require("express");
const Orders = require("../models/orders");
const Menu = require("../models/menu");
const router = express.Router();

router.get("/", async (req, res, next) => {
    // #swagger.tags = ['Orders']
    // #swagger.path = '/orders/'
    // #swagger.description = 'Health check for orders route'
    try {
        return res.status(200).json({orders: "orders"})
    } catch (err) {
        next(err);
    }
})

router.get("/sales", async (req, res, next) => {
    // #swagger.tags = ['Orders']
    // #swagger.path = '/orders/sales'
    // #swagger.description = 'Endpoint for sales report. Given a time window, display the sales by item from the order history.'
    /* #swagger.parameters['fromDate'] = {
        description: 'Beginning of time window. YYYY-MM-DD',
        required: true
    } */
    /* #swagger.parameters['toDate'] = {
        description: 'End of time window. YYYY-MM-DD',
        required: true
    } */

    try {
        const salesReport = await Orders.fetchSalesReport({fromDate: req.query?.fromDate, toDate: req.query?.toDate});
        return res.status(200).json(salesReport);
    } catch (err) {
        next(err);
    }
})

router.post("/", async(req, res, next) => {
    // #swagger.tags = ['Orders']
    // #swagger.path = '/orders/'
    // #swagger.description = 'Endpoint add a order (and add all subsequent items) to database.'
    /* #swagger.parameters['employeeId'] = {
        in: 'body',
        description: 'Id of employee taking the order',
        required: true,
        schema: {
            employeeId: 2
        }
    } */
    /* #swagger.parameters['items'] = {
        in: 'body',
        description: 'Array of item objects. Each item contains information about the item.',
        required: true,
        schema: { $ref: '#/definitions/OrderItems' }
    } */
    try {
        const item = await Orders.addOrder({employeeId: req.body?.employeeId, items: req.body?.items });
        return res.status(200).json(item);
    } 
    catch (err) {
        next(err);
    }
})

router.get("/pairs", async (req, res, next) => {
    // #swagger.tags = ['Orders']
    // #swagger.path = '/orders/pairs'
    // #swagger.description = 'Endpoint returns most popular pairs of sales (most popular pairs of menu items that were ordered within time frame).'
    /* #swagger.parameters['fromDate'] = {
        description: 'Beginning of time window. YYYY-MM-DD',
        required: true
    } */
    /* #swagger.parameters['toDate'] = {
        description: 'End of time window. YYYY-MM-DD',
        required: true
    } */

    try {
        const pairSales = await Orders.fetchPopularPairSales({fromDate: req.query?.fromDate, toDate: req.query?.toDate});
        var pairSalesReport = [];
        for (const pair of pairSales) {
            const i1 = await Menu.fetchItem(`${pair.type1}-${pair.item1}`);
            const i2 = await Menu.fetchItem(`${pair.type2}-${pair.item2}`);
            pairSalesReport.push({item1: i1.name, item2: i2.name, count: pair.count});
        }
        return res.status(200).json(pairSalesReport);
    } catch (err) {
        next(err); 
    }
})

router.get("/excess", async (req, res, next) => { 
    // #swagger.tags = ['Orders']
    // #swagger.path = '/orders/excess'
    // #swagger.description = 'Endpoint returns excess report. Given a timestamp, display the list of items that only sold less than 10% of their inventory between the timestamp and the current time, assuming no restocks have happened during the window.'
    /* #swagger.parameters['fromDate'] = {
        description: 'Beginning of time window. YYYY-MM-DD',
        required: true
    } */

    try {
        const excessReport = await Orders.fetchExcessReport({fromDate: req.query?.fromDate});
        return res.status(200).json(excessReport);
    } catch (err) {
        next(err);
    }
})

module.exports = router;