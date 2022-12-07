const express = require("express");
const Menu = require('../models/menu');
const router = express.Router();

router.get("/", async(req, res, next) => {
    // #swagger.tags = ['Menu']
    // #swagger.path = '/menu/'
    // #swagger.description = 'Endpoint to get all items in the menu'
    try {
        const menu = await Menu.fetchAll();
        return res.status(200).json({menu})
    } catch (err) {
        next(err);
    }
})

router.get("/prices", async (req, res, next) => {
    // #swagger.tags = ['Menu']
    // #swagger.path = '/menu/prices'
    // #swagger.description = 'Endpoint to get the prices for the different menu items'
    try {
        const prices = await Menu.fetchAllPrices();
        return res.status(200).json(prices);
    } catch (err) {
        next(err);
    }
}) 

router.get("/:itemTypeId", async (req, res, next) => {
    // #swagger.tags = ['Menu']
    // #swagger.path = '/menu/{itemTypeId}'
    // #swagger.description = 'Endpoint to get menu item based on classification (starter,base,protein), id and name. 3 options: get all items of the type (typeOnly), get item with that id (typeId), get item with that name (typeName)'
    /* #swagger.parameters['itemTypeId'] = {
        in: 'path',
        description: 'Classification of menu item type, menu item id and menu item name.
        Options:
        typeOnly: starter,
        typeId: starter-1,
        typeName: starter-Falafel',
        required: true
    } */
    try {
        const item = await Menu.fetchItem(req.params?.itemTypeId);
        return res.status(200).json(item);
    } catch (err) {
        next(err);
    }
})

router.post("/:newItemType", async(req, res, next) => {
    // #swagger.tags = ['Menu']
    // #swagger.path = '/menu/{newItemType}'
    // #swagger.description = 'Endpoint to create a new menu item.'
    /* #swagger.parameters['newItemType'] = {
        in: 'path',
        description: 'Classification of menu item type (starter, protein, or base).',
        required: true
    } */
    /* #swagger.parameters['item'] = {
        in: 'body',
        description: 'New menu item information',
        required: true,
        schema: { $ref: '#/definitions/MenuItem' }
    } */
    try {
        const item = await Menu.addItem({addedItem:req.body?.item, itemType: req.params?.newItemType});
        return res.status(200).json(item);
    } catch (err) {
        next(err)
    }
})

router.put("/:itemType", async(req, res, next) => {
    // #swagger.tags = ['Menu']
    // #swagger.path = '/menu/{itemType}'
    // #swagger.description = 'Endpoint to edit a menu item.'
    /* #swagger.parameters['itemType'] = {
        in: 'path',
        description: 'Classification of menu item type (starter, protein, or base).',
        required: true
    } */
    /* #swagger.parameters['item'] = {
        in: 'body',
        description: 'Updated menu item information. Note: Price is ignored for proteins',
        required: true,
        schema: { $ref: '#/definitions/MenuItem' }
    } */
    try {
        const item = await Menu.editItem(
            {
                updatedItem: req.body?.item,
                itemType: req.params?.itemType
            });
        return res.status(200).json(item);
    } catch (err) {
        next(err)
    }
})

router.delete("/:itemTypeId", async (req, res, next) => {
    // #swagger.tags = ['Menu']
    // #swagger.path = '/menu/{itemTypeId}'
    // #swagger.description = 'Endpoint to delete menu item based on id'
    /* #swagger.parameters['itemTypeId'] = {
        in: 'path',
        description: 'Classification of menu item type and menu item id. Structure: type-id.',
        required: true,
        schema: { 
            itemTypeId: 'starter-2'
         }
    } */
    try {
        const deletedItem = await Menu.deleteItem(req.params?.itemTypeId);
        return res.status(200).json(deletedItem);
    } catch (err) {
        next(err);
    }
})

module.exports = router;