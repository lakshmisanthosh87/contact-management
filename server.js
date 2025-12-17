import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from './routers/contactRouters.js'
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 4000;



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));


app.use('/api/contact', contactRoutes)
// app.use('/api/products',productRoutes)


connectDB().then(() => {
    app.listen(PORT, () => {                                
      console.log(`Server is running at http://localhost:${PORT}`);

    })

})
