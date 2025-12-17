import express from "express"
import { addcontacts,getAllContacts } from "../controllers/contactControllers.js";

// import {getcontacts,addcontacts,deletecontacts,updatecontacts} from "./controllers/contactControllers.js"







const routers = express.Router();


console.log("routes reached")



routers.post("/", addcontacts)
routers.get('/',getAllContacts)

// routers.put("/",updatecontacts)

// routers.delete("/",deletecontacts)


export default routers