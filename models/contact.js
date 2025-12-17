import mongoose from "mongoose"

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, unique: true },
    countryCode: { type: String }
}, { timestamps: true })

export default mongoose.model("Contact", contactSchema)