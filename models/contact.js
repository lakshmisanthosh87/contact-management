import mongoose from "mongoose"

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String,unique: true,required:true },
    countryCode: { type: String,required:true}
}, { timestamps: true })

export default mongoose.model("Contact", contactSchema)