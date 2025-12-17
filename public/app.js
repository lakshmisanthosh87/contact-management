const API = "http://localhost:5000/api/contact";

let page = 1;
const limit = 5;
let editId = null;
let currentSearch = "";


// Load contacts on page load
window.onload = loadContacts;

// Load contacts
async function loadContacts() {
  const code = document.getElementById("filtercode").value;
  const sort = document.getElementById("sort").value;

  let url = `${API}?page=${page}&limit=${limit}`;

  if (currentSearch) {
    url += `&search=${encodeURIComponent(currentSearch)}`;
  }

  if (code !== "") {
    url += `&code=${encodeURIComponent(code)}`; // ✅ FIX HERE
  }

  if (sort) {
    url += `&sort=${sort}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  showContacts(data.contacts);
}



// Show contacts in table
function showContacts(contacts) {
  const tbody = document.getElementById("contactTable");
  tbody.innerHTML = "";

  contacts.forEach(c => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${c.name}</td>
      <td>${c.phone}</td>
      <td>${c.countryCode}</td>
      <td>
        <button onclick="editContact('${c._id}','${c.name}','${c.phone}','${c.countryCode}')">Edit</button>
        <button onclick="deleteContact('${c._id}')">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// Add or Update contact
async function addContact() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const code = document.getElementById("code").value;

  const contact = { name, phone, countryCode: code };

  if (editId) {
    // UPDATE
    await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    });
    editId = null;
  } else {
    // ADD
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    });
    
  }

  clearForm();
  loadContacts();
  document.getElementById("saveBtn").innerText = "Save Contact";
}

// Delete contact
async function deleteContact(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });
  loadContacts();
}

// Edit contact
function editContact(id, name, phone, code) {
  editId = id;
  document.getElementById("name").value = name;
  document.getElementById("phone").value = phone;
  document.getElementById("code").value = code;
   document.getElementById("saveBtn").innerText = "Update Contact";
}

// Clear form
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("code").value = "+91";
}

// Search
function searchContact() {
  const input = document.getElementById("searchValue");
  currentSearch = input.value;
  page = 1;
  loadContacts();
}



// Filter
function filterByCode() {
  page = 1;              // reset pagination
  loadContacts();        // reload with selected code
}


// Sort
document.getElementById("sort").addEventListener("change", () => {
  loadContacts();
});

// Pagination
function nextPage() {
  page++;
  loadContacts();
}

function prevPage() {
  if (page > 1) {
    page--;
    loadContacts();
  }
}
