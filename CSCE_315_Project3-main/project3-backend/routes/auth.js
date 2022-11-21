const express = require("express")
const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        return res.status(200).json({auth: "auth"})
    } catch (err) {
        next(err);
    }
})

module.exports = router;