require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles : true
}))

app.use("/user",require("./routes/userRouter"))
app.use('/api',require("./routes/categoryRouter"))
app.use('/api',require("./routes/upload"))
app.use('/api',require('./routes/productRouter'))
app.use('/api',require('./routes/paymentRoutes'))


// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI,err=>{
    if(err) throw err;
    console.log("Connected to MongoDB")
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("Server is running on port",PORT);
})