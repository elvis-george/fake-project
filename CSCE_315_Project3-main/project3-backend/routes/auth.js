const express = require("express");
const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        return res.status(200).json({auth: "auth"})
    } catch (err) {
        next(err);
    }
})

/**
 * Hunter - done but not thoroughly tested
 * http://localhost:3001/auth/new?firstName=1123hunter2&lastName=f2123inch4&email=hf2@gmail.com&security_token=2123&type=emp
 */
router.get("/new", async (req, res, next) => {
    try {
        console.log(req.query);
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

/**
 * Hunter - Done
 * This function returns the table of employees
 * Usage: http://localhost:3001/auth/new?firstName=1123hunter2&lastName=f2123inch4&email=hf2@gmail.com&security_token=2123&type=emp
 */
 router.get("/all", async (req, res, next) => {
    try {
        console.log(req.query);
        const employee = await Auth.getAll();
        return res.status(200).json(employee);
    } catch (err) {
        next(err);
    }
})

/**
 * Hunter - Done
 * http://localhost:3001/auth/type?email=hunter@gmail.com
 * This function returns the type of the employee based on the email.
 * Usage: http://localhost:3001/auth/type?email=hunter@gmail.com
 */
router.get("/type", async (req, res, next) => {
    try {
        const userType = await Auth.getClassification(req.query?.email)
        return res.status(200).json(userType)
    } catch (err) {
        next(err);
    }
})

/**
 * Hunter - done but not thoroughly tested
 * This function will edit all the attributes based on the given id
 * Usage: http://localhost:3001/auth/edit?firstName=1213hunter2&lastName=f2in32ch4&email=hf3@gmail.com&security_token=2112323&type=emp&id=7
 */
router.put("/edit", async (req, res, next) => {
    try {
        console.log(req.query);
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
