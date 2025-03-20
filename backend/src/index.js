const express =  require('express');
const cors = require('cors');
const app = express();
const userRouter = require('../routers/users')
require('dotenv').config({path:'../.env'});
app.use(cors());

app.use(userRouter);

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening port ${process.env.PORT}`)
});