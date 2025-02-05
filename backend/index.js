const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
dotenv.config()
app.use(express.json())

app.use(cors())
const corsOption = {
    origin: "*",
    credential: true,
};

app.use(cors(corsOption));

const connectDB = async()=>{
        try {
            await mongoose.connect(process.env.MONGODB_URL)
            console.log("Database Connected");
            
        } catch (error) {
            console.log(error); 
        }
}




app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(process.env.PORT,()=>{
    connectDB();
    console.log("app listening on port " + process.env.PORT);
})