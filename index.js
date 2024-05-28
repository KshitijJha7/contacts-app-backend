const express = require('express');
const dotenv=require('dotenv').config();
const app = express();
const contactsRouter=require("./routes/contactsRoutes");
const userRouter=require("./routes/userRoutes");
const errorHandler = require('./middleware/errorHandler');
const connectDb = require("./config/dbConnection");
const port=process.env.PORT || 3000;
connectDb();
app.use(express.json());
app.use("/api/contacts",contactsRouter);
app.use("/api/users",userRouter);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server running on PORT: ${port}`);
});

