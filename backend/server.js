require('dotenv').config();
require("./config/config");
const cors = require('cors')
const express = require("express");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/usersRoutes");
const orderRouter = require("./routes/orderRoutes");
const app = express();
const port = 8000 || process.env.PORT;
const { errorHandler } = require("./middlewares/errorMiddleware");

//CORS
app.use(cors());

//Body Parser
app.use(express.json());

// Error Handler
app.use(errorHandler);

// Product Router
app.use("/api", productRouter);

// User Router
app.use("/api/user", userRouter);

// Order Router
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
    res.send("Hello, Sever is ready");
});

app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
});

app.listen(port, () => {
    console.log(`Connected to the port number ${port}`);
})