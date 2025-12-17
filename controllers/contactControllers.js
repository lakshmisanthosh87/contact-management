
import Contact from "../models/contact.js";


export const addcontacts = async (req,res) => {
    console.log("function add contact called")
    console.log(req.body, "req.body consoled")
    try {
        const { name, phone, countryCode } = req.body

        console.log(name, phone, countryCode, "name,phone,countrycode")
        const contact = await Contact.create({ name, phone, countryCode })

        console.log(contact)
        res.status(200).json({ message: "contact added successfully", contact })
    }
    catch (error) {
        console.log(error, "error creating the contact")
        res.status(500).json({ message: "not addedcontacts" })
    }
}



// export const updatecontacts = async (res, req) => {
//     try {
//         const { name, phone, countryCode } = req.body
//         const edit = await Contact.findByIdAndUpdate(req.params.id, { name, phone, countryCode }, { new: true })
//         res.json(edit)
//     }
//     catch (error) {
//         res.status(400).json({ message: "edit not working" })
//     }
// }


// export const deletecontacts = async (res, req) => {
//     try {
//         await contact.findByIdAndDelete(req.params.id)
//         res.json({ message: "delete successful" })
//     }
//     catch (error) {

//     }
// }