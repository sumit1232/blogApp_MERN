const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/user.js');
const postRoute = require('./routes/post.js');
const commentRoute = require('./routes/comments.js');




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


app.use("/images",express.static(path.join(__dirname,"/images")))
console.log(cors());

app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)

// upload img
const storage = multer.diskStorage({
    destination:(req,file,fn) => {
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})

const upload = multer({storage:storage})
app.post("api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("Image uploaded Successfully")
})


app.listen(process.env.PORT,()=>{
    connectDB();
    console.log("app listening on port " + process.env.PORT);
})