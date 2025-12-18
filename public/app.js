const API = "http://localhost:5000/api/contact";

let page = 1;
const limit = 5;
let editId = null;
let currentSearch = "";
let totalContacts = 0;



window.onload = loadContacts;


async function loadContacts() {
  const code = document.getElementById("filtercode").value;
  const sort = document.getElementById("sort").value;

  let url = `${API}?page=${page}&limit=${limit}`;

  if (currentSearch) {
    url += `&search=${encodeURIComponent(currentSearch)}`;
  }

  if (code !== "") {
    url += `&code=${encodeURIComponent(code)}`;
  }

  if (sort) {
    url += `&sort=${sort}`;
  }

  const res = await fetch(url);
const data = await res.json();

totalContacts = data.total;

showContacts(data.contacts);
updatePaginationButtons();

}




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
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const code = document.getElementById("code").value;

  // Name validation
if (!name) {
  alert("Name is required");
  return;
}

if (name.length < 3) {
  alert("Name must have at least 3 characters");
  return;
}

// Phone validation
if (!phone) {
  alert("Phone number is required");
  return;
}


// Phone validation: 10 or 11 digits and starts with 6-9
if (!/^[6-9][0-9]{9,10}$/.test(phone)) {
  alert("Phone number must be 10 or 11 digits and start with 6, 7, 8, or 9");
  return;
}



  const contact = { name, phone, countryCode: code };

  if (editId) {
    await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    });
    editId = null;
    document.getElementById("saveBtn").innerText = "Save Contact";
  } else {
    const res = await fetch(API, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(contact)
});

const data = await res.json();

if (!res.ok) {
  alert(data.message);
  return;
}

  }

  clearForm();
  loadContacts();
}


// Edit 
function editContact(id, name, phone, code) {
  editId = id;
  document.getElementById("name").value = name;
  document.getElementById("phone").value = phone;
  document.getElementById("code").value = code;
   document.getElementById("saveBtn").innerText = "Update Contact";
}


// Delete contact
async function deleteContact(id) {
  const confirmDelete = confirm("Are you sure you want to delete this contact?");
  if (!confirmDelete) return;

  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  loadContacts();
}


function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("code").value = "+91";
}

// Search
function searchContact() {
  currentSearch = document.getElementById("searchValue").value;
  page = 1;
  loadContacts();
}

function filterByCode() {
  page = 1;             
  loadContacts();        
}

document.getElementById("sort").addEventListener("change", () => {
  loadContacts();
});


function updatePaginationButtons() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Prev disabled on page 1
  prevBtn.disabled = page === 1;

  // Next disabled on last page
  const lastPage = Math.ceil(totalContacts / limit);
  nextBtn.disabled = page >= lastPage;
}


function nextPage() {
  const lastPage = Math.ceil(totalContacts / limit);
  if (page < lastPage) {
    page++;
    loadContacts();
  }
}


function prevPage() {
  if (page > 1) {
    page--;
    loadContacts();
  }
}
