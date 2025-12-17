let page = 1;
let editId = null;
const limit = 5;
const API = "http://localhost:4000/api/contact";

// LOAD CONTACTS
async function loadContacts() {
  const res = await fetch(`${API}?page=${page}&limit=${limit}`);
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.contacts.forEach(c => {
    list.innerHTML += `
      <li>
        ${c.name} (${c.countryCode} ${c.phone})
        <button onclick="editContact('${c._id}','${c.name}','${c.phone}','${c.countryCode}')">Edit</button>
        <button onclick="deleteContact('${c._id}')">Delete</button>
      </li>
    `;
  });
}

// ADD / UPDATE CONTACT
async function addContact() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const countryCode = document.getElementById("code").value;

  if (editId) {
    await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, countryCode })
    });
    editId = null;
  } else {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, countryCode })
    });
  }

  name.value = phone.value = "";
  loadContacts();
}

// EDIT
function editContact(id, name, phone, code) {
  editId = id;
  document.getElementById("name").value = name;
  document.getElementById("phone").value = phone;
  document.getElementById("code").value = code;
}

// DELETE
async function deleteContact(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadContacts();
}

// PAGINATION
function nextPage() {
  page++;
  loadContacts();
}

function prevPage() {
  if (page > 1) page--;
  loadContacts();
}

loadContacts();
