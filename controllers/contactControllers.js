import Contact from "../models/contact.js";


export const addContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.json(contact);
};


export const getContacts = async (req, res) => {

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

 
  const { search, code, sort } = req.query;

  
  let query = {};

 
  if (search && search.trim() !== "") {
  query.name = { $regex: search, $options: "i" };
}
 
  if (code) {
  query.countryCode = code;
}

  let sortOption = { createdAt: -1 }; 
  if (sort === "old") {
    sortOption = { createdAt: 1 }; 
  }

  const contacts = await Contact.find(query)
    .sort(sortOption)
    .limit(limit)
    .skip(skip);

  res.json({ contacts });
};


export const updateContact = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(contact);
};


export const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
