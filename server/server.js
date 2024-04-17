require('dotenv').config();
const express = require("express");
const app = express();
const connectDb = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware')
const cors = require('cors');

//connecting to database
connectDb();

//serve static files from the public directory
app.use(express.static('public'));

app.use(cors({
    origin: 'http://localhost:5173'
  }));

app.get('/AWS', (req, res) =>{
    res.status(200).json({message: 'Hello AWS PUPies'});
})

//Post Routes:
const postRouter = require('./routers/postRouter')
app.use("/posts", postRouter);

//Use Error Middleware
app.use(errorHandler)

app.listen(8080, () =>{
    console.log("Server is running in port 8080");
})



