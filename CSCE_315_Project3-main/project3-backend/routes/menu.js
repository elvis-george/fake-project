const express = require("express");
const Menu = require('../models/menu');
const router = express.Router();

// Return all menu items
router.get("/", async(req, res, next) => {
    try {
        const menu = await Menu.fetchAll();
        return res.status(200).json({menu})
    } catch (err) {
        next(err);
    }
})

// Gets the prices for the different menu items
router.get("/prices", async (req, res, next) => {
    try {
        const prices = await Menu.fetchAllPrices();
        return res.status(200).json(prices);
    } catch (err) {
        next(err);
    }
}) 

/*
Get menu item based on classification (starter,base,protein) and id
Usage: ~~~/menu/type-id
 */
router.get("/:itemTypeId", async (req, res, next) => {
    try {
        const item = await Menu.fetchItemById(req.params?.itemTypeId);
        return res.status(200).json(item);
    } catch (err) {
        next(err);
    }
})

/*
Create a new menu item COMPLETE
Usage:
    ~~~/menu/protein (or base starter)
    with json:
    {
        "name": "newStarterName",
        "quantity": "100",
        "price": "1.23"
    }
    Note that price is ignored for new proteins
*/
router.post("/:newItemType", async(req, res, next) => {
    try {
        console.log(req.params);
        const item = await Menu.addItem({addedItem:req.body?.item, itemType: req.params?.newItemType});
        return res.status(200).json(item);
    } catch (err) {
        next(err)
    }
})

/* 
Edit a menu item COMLPETE
Usage:
    ~~~/menu/protein (or base starter)
    with json:
    {
        "id": "28",
        "name": "NewerBase",
        "quantity": "103",
        "price": "1.39"
    }
    Note that price is ignored for proteins
*/
router.put("/:itemType", async(req, res, next) => {
    try {
        const item = await Menu.editItem(
            {
                updatedItem: req.body,
                itemType: req.params?.itemType
            });
        return res.status(200).json(item);
    } catch (err) {
        next(err)
    }
})

// Delete menu item COMPLETE
// Usage: ~~~/menu/type-id      (ex /menu/base-5)
router.delete("/:itemTypeId", async (req, res, next) => {
    try {
        const deletedItem = await Menu.deleteItem(req.params?.itemTypeId);
        return res.status(200).json(deletedItem);
    } catch (err) {
        next(err);
    }
})

module.exports = router;

// Need:
// return all bases
// return all proteins
// return all starters
// add base (add associated inv. items)
// add protein
// add starter
// edit base
// edit protein
// edit starter
// delete base
// delete protein
// delete starter

// TODO: Make it so that when item is added, you can add associated inventory items too

// details about each will have to be passed in

// Have:
// return all menu items
// return all of a catagory of items
// adds
// edits
// deletes