const express = require("express");
const Inventory = require('../models/inventory');
const router = express.Router();

// Return all items in inventory
router.get("/", async (req, res, next) => {
    try {
        const inventory = await Inventory.fetchAll();
        return res.status(200).json(inventory);
    } catch (err) {
        next(err);
    }
})

// Create new inventory item
router.post("/", async (req, res, next) => {
    try {
        const item = await Inventory.createItem(req.body?.item);
        return res.status(200).json(item);
    } catch (err) {
        next(err);
    }
})

// Get inventory item based on inventory id
router.get("/:inventoryId", async (req, res, next) => {
    try {
        const item = await Inventory.fetchItemById(req.params?.inventoryId);
        return res.status(200).json(item);
    } catch (err) {
        next(err);
    }
})

// Edit inventory item
router.put("/:inventoryId", async (req, res, next) => {
    try {
        const item = await Inventory.editItem({updatedItem: req.body?.updatedItem, inventoryId: req.params?.inventoryId});
        return res.status(200).json(item);
    } catch (err) {
        next(err);
    }
})

// Delete inventory item
router.delete("/:inventoryId", async (req, res, next) => {
    try {
        const deletedItem = await Inventory.deleteItem(req.params?.inventoryId);
        return res.status(200).json(deletedItem);
    } catch (err) {
        next(err);
    }
})



module.exports = router;