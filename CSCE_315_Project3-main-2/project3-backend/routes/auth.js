const express = require("express");
const router = express.Router()
const Auth = require('../models/user');

router.get("/", async (req, res, next) => {
    // #swagger.tags = ['Auth']
    // #swagger.path = '/auth/'
    // #swagger.description = 'Endpoint to do a health check.'
    try {
        return res.status(200).json({auth: "auth"})
    } catch (err) {
        next(err);
    }
})


router.get("/new", async (req, res, next) => {
    // #swagger.tags = ['Auth']
    // #swagger.path = '/auth/new'
    // #swagger.description = 'Endpoint to create a new authorized user.'
    /* #swagger.parameters['firstName'] = {
        in: 'query',
        description: 'First name of new user.',
        required: true
    } */
    /* #swagger.parameters['lastName'] = {
        in: 'query',
        description: 'Last name of new user.',
        required: true
    } */
    /* #swagger.parameters['email'] = {
        in: 'query',
        description: 'Email address name of new user.',
        required: true
    } */
    /* #swagger.parameters['type'] = {
        in: 'query',
        description: 'Type (server,manager) name of new user.',
        required: true
    } */
    /* #swagger.parameters['security_token'] = {
        in: 'query',
        description: 'Google security token of new user account.',
        required: true
    } */
    try {
        const employee = await Auth.addEmployee({
            firstName: req.query?.firstName,
            lastName: req.query?.lastName,
            email: req.query?.email,
            type: req.query?.type,
            security_token: req.query?.security_token,
        });
        return res.status(200).json(employee);
    } catch (err) {
        next(err);
    }
})

 router.get("/all", async (req, res, next) => {
    // #swagger.tags = ['Auth']
    // #swagger.path = '/auth/all'
    // #swagger.description = 'Endpoint to get all employee data.'
    try {
        const employee = await Auth.getAll();
        return res.status(200).json(employee);
    } catch (err) {
        next(err);
    }
})

router.get("/type", async (req, res, next) => {
    // #swagger.tags = ['Auth']
    // #swagger.path = '/auth/type'
    // #swagger.description = 'Endpoint to get the type of user (server,manager,none).'
    /* #swagger.parameters['email'] = {
        in: 'query',
        description: 'Email address of questioned user.',
        required: true
    } */
    try {
        const userType = await Auth.getClassification(req.query?.email)
        return res.status(200).json(userType)
    } catch (err) {
        next(err);
    }
})

router.put("/edit", async (req, res, next) => {
    // #swagger.tags = ['Auth']
    // #swagger.path = '/auth/edit'
    // #swagger.description = 'Endpoint to create a edit a current authorized user.'
    /* #swagger.parameters['firstName'] = {
        in: 'query',
        description: 'First name of the user.',
        required: true
    } */
    /* #swagger.parameters['lastName'] = {
        in: 'query',
        description: 'Last name of the user.',
        required: true
    } */
    /* #swagger.parameters['email'] = {
        in: 'query',
        description: 'Email address name of the user.',
        required: true
    } */
    /* #swagger.parameters['type'] = {
        in: 'query',
        description: 'Type (server,manager) name of the user.',
        required: true
    } */
    /* #swagger.parameters['security_token'] = {
        in: 'query',
        description: 'Google security token of the user account.',
        required: true
    } */
    try {
        const employee = await Auth.editEmployee({
            firstName: req.query?.firstName,
            lastName: req.query?.lastName,
            email: req.query?.email,
            type: req.query?.type,
            security_token: req.query?.security_token,
            id : req.query?.id
        });
        return res.status(200).json(employee);
    } catch (err) {
        next(err);
    }
})

module.exports = router;