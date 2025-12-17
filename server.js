import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from './routers/contactRouters.js'

dotenv.config();
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 4000;


app.use('/api/contact', contactRoutes)
// app.use('/api/products',productRoutes)


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server is running", PORT)
    })

})
