import Contact from "../models/contact.js";

/* ---------------- ADD CONTACT ---------------- */
export const addContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.json(contact);
};

/* ---------------- GET CONTACTS (SEARCH + FILTER + SORT + PAGINATION) ---------------- */
export const getContacts = async (req, res) => {

  // 1️⃣ Pagination values
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  // 2️⃣ Get query values from frontend
  const { search, code, sort } = req.query;

  // 3️⃣ Empty query object
  let query = {};

  // 🔍 SEARCH BY NAME
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  // 🌍 FILTER BY COUNTRY CODE
  if (code && code !== "all") {
    query.countryCode = code;
  }

  // ⏱ SORT BY DATE
  let sortOption = { createdAt: -1 }; // latest first
  if (sort === "old") {
    sortOption = { createdAt: 1 }; // oldest first
  }

  // 4️⃣ Fetch contacts from DB
  const contacts = await Contact.find(query)
    .sort(sortOption)
    .limit(limit)
    .skip(skip);

  res.json({ contacts });
};

/* ---------------- UPDATE CONTACT ---------------- */
export const updateContact = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(contact);
};

/* ---------------- DELETE CONTACT ---------------- */
export const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
