const express = require("express");
const Inventory = require('../models/inventory');
const router = express.Router();

router.get("/", async (req, res, next) => {
    // #swagger.tags = ['Inventory']
    // #swagger.path = '/inventory/'
    // #swagger.description = 'Endpoint to get all items in the inventory'
    try {
        const inventory = await Inventory.fetchAll();
        return res.status(200).json(inventory);
    } catch (err) {
        next(err);
    }
})

router.post("/", async (req, res, next) => {
    // #swagger.tags = ['Inventory']
    // #swagger.path = '/inventory/'
    // #swagger.description = 'Endpoint to create new inventory item.' 
    /* #swagger.parameters['item'] = {
        in: 'body',
        description: 'New ingredient information',
        required: true,
        schema: { $ref: '#/definitions/InventoryItem' }
    } */
    try {
        const item = await Inventory.createItem(req.body?.item);
        return res.status(200).json(item);
    } catch (err) {
        next(err);
    }
})

router.get("/restock", async (req, res, next) => {
    // #swagger.tags = ['Inventory']
    // #swagger.path = '/inventory/restock'
    // #swagger.description = 'Endpoint to get the Restock report.' 
    try {
        const restockReport = await Inventory.getRestockReport();
        return res.status(200).json(restockReport);
    } catch (err) {
        next(err);
    }
})

router.get("/:inventoryId", async (req, res, next) => {
    // #swagger.tags = ['Inventory']
    // #swagger.path = '/inventory/{inventoryId}'
    // #swagger.description = 'Endpoint to get inventory item based on the inventory id number.' 
    /* #swagger.parameters['inventoryId'] = {
        in: 'path',
        description: 'Id of inventory item',
        required: true
    } */
    try {
        const item = await Inventory.fetchItemById(req.params?.inventoryId);
        return res.status(200).json(item);
    } catch (err) {
        next(err);
    }
})

router.put("/:inventoryId", async (req, res, next) => {
    // #swagger.tags = ['Inventory']
    // #swagger.path = '/inventory/{inventoryId}'
    // #swagger.description = 'Endpoint to edit inventory item.' 
    /* #swagger.parameters['inventoryId'] = {
        in: 'path',
        description: 'Id of inventory item',
        required: true
    } */
    /* #swagger.parameters['updatedItem'] = {
        in: 'body',
        description: 'Updated Ingredient Information',
        required: true,
        schema: { $ref: '#/definitions/InventoryItem' }
    } */
    try {
        const item = await Inventory.editItem({updatedItem: req.body?.updatedItem, inventoryId: req.params?.inventoryId});
        return res.status(200).json(item);
    } catch (err) {
        next(err);
    }
})

router.delete("/:inventoryId", async (req, res, next) => {
    // #swagger.tags = ['Inventory']
    // #swagger.path = '/inventory/{inventoryId}'
    // #swagger.description = 'Endpoint to delete an inventory item.' 
    /* #swagger.parameters['inventoryId'] = {
        in: 'path',
        description: 'Id of inventory item',
        required: true
    } */
    try {
        const deletedItem = await Inventory.deleteItem(req.params?.inventoryId);
        return res.status(200).json(deletedItem);
    } catch (err) {
        next(err);
    }
})



module.exports = router;