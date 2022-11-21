const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const dotenv = require('dotenv').config();
const inventoryRoutes = require('./routes/inventory')
const menuRoutes = require('./routes/menu')
const orderRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')

/*** Create Express App ***/
const app = express()

app.use(morgan("tiny"))
app.use(express.json())
app.use(cors())

/*** Routes ***/
app.use("/auth", authRoutes)
app.use("/inventory", inventoryRoutes)
app.use("/menu", menuRoutes)
app.use("/orders", orderRoutes)

// Health Check
app.get("/", async (req, res, next) => {
    res.status(200).json({ping: "pong"})
})

// Test query from database
app.get('/user', (req, res) => {
    teammembers = []
    pool
        .query('SELECT * FROM teammembers;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                teammembers.push(query_res.rows[i]);
            }
            const data = {teammembers: teammembers};
            console.log(teammembers);
            return res.status(200).json(teammembers)        
        });
});

/*** Error Handlers ***/
// Generic error handler - anything that is unhandled will be handled here
app.use((error, req, res, next) => {
  const status = error.status || 500
  const message = error.message

  return res.status(status).json({
    error: { message, status },
  })
})

module.exports = app