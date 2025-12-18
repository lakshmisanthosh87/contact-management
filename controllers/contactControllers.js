import Contact from "../models/contact.js";


export const addContact = async (req, res) => {
  try {
    const { name, phone, countryCode } = req.body;

    // Name validation
    if (!name || name.trim().length < 3) {
      return res.status(400).json({
        message: "Name must have at least 3 characters"
      });
    }

    // Phone validation
    if (!/^[1-9][0-9]{9,10}$/.test(phone)) {
      return res.status(400).json({
        message: "Phone must be 10 or 11 digits and should not start with 0"
      });
    }

    // Duplicate phone check
    const existing = await Contact.findOne({ phone });
    if (existing) {
      return res.status(400).json({
        message: "This phone number already exists"
      });
    }

    const contact = await Contact.create({ name, phone, countryCode });
    res.json(contact);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




export const getContacts = async (req, res) => {
  try {
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
    if (sort === "old") sortOption = { createdAt: 1 };

    const total = await Contact.countDocuments(query); // ✅ NEW

    const contacts = await Contact.find(query)
      .sort(sortOption)
      .limit(limit)
      .skip(skip);

    res.json({ contacts, total }); // ✅ send total
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
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
