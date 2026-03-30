const API = "/api/contact";

let page = 1;
const limit = 5;
let editId = null;
let currentSearch = "";
let totalContacts = 0;

window.onload = loadContacts;

function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  const iconName = type === "success" ? "check-circle" : "alert-circle";
  toast.innerHTML = `
    <i data-lucide="${iconName}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

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

  try {
    const res = await fetch(url);
    const data = await res.json();

    totalContacts = data.total;
    showContacts(data.contacts);
    updatePaginationUI();
  } catch (error) {
    showToast("Failed to load contacts", "error");
  }
}

function showContacts(contacts) {
  const tbody = document.getElementById("contactTable");
  tbody.innerHTML = "";

  if (contacts.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-secondary); padding: 3rem;">No contacts found</td></tr>`;
    return;
  }

  contacts.forEach(c => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td style="font-weight: 500;">${c.name}</td>
      <td>
        <span style="background: var(--bg-input); padding: 2px 8px; border-radius: 4px; font-size: 0.85rem;">
          ${c.countryCode}
        </span>
      </td>
      <td style="font-family: monospace; letter-spacing: 0.05em;">${c.phone}</td>
      <td>
        <div class="action-btns">
          <button class="btn btn-edit" title="Edit Contact" onclick="editContact('${c._id}','${c.name}','${c.phone}','${c.countryCode}')">
            <i data-lucide="edit-3" style="width: 18px;"></i>
          </button>
          <button class="btn btn-delete" title="Delete Contact" onclick="deleteContact('${c._id}')">
            <i data-lucide="trash-2" style="width: 18px;"></i>
          </button>
        </div>
      </td>
    `;

    tbody.appendChild(row);
  });
  
  lucide.createIcons();
}

async function addContact() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const code = document.getElementById("code").value;

  if (!name || name.length < 3) {
    showToast("Name must have at least 3 characters", "error");
    return;
  }

  if (!/^\d{7,15}$/.test(phone)) {
    showToast("Invalid phone number: must be 7-15 digits", "error");
    return;
  }

  const contact = { name, phone, countryCode: code };

  try {
    if (editId) {
      const res = await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
      });
      
      if (res.ok) {
        showToast("Contact updated successfully!");
        cancelEdit();
      } else {
        const data = await res.json();
        showToast(data.message || "Update failed", "error");
      }
    } else {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
      });

      const data = await res.json();

      if (res.ok) {
        showToast("Contact added successfully!");
        clearForm();
      } else {
        showToast(data.message || "Failed to add contact", "error");
        return;
      }
    }
    loadContacts();
  } catch (error) {
    showToast("Server connection error", "error");
  }
}

function editContact(id, name, phone, code) {
  editId = id;
  document.getElementById("name").value = name;
  document.getElementById("phone").value = phone;
  document.getElementById("code").value = code;
  
  document.getElementById("formTitle").innerText = "Edit Contact";
  document.getElementById("saveBtn").querySelector('span').innerText = "Update Contact";
  document.getElementById("saveBtn").querySelector('i').setAttribute('data-lucide', 'refresh-cw');
  document.getElementById("cancelBtn").classList.remove("hidden");
  
  lucide.createIcons();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelEdit() {
  editId = null;
  clearForm();
  document.getElementById("formTitle").innerText = "Add New Contact";
  document.getElementById("saveBtn").querySelector('span').innerText = "Save Contact";
  document.getElementById("saveBtn").querySelector('i').setAttribute('data-lucide', 'save');
  document.getElementById("cancelBtn").classList.add("hidden");
  lucide.createIcons();
}

async function deleteContact(id) {
  if (!confirm("Are you sure you want to delete this contact?")) return;

  try {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Contact deleted successfully!");
      loadContacts();
    } else {
      showToast("Failed to delete contact", "error");
    }
  } catch (error) {
    showToast("Server connection error", "error");
  }
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("code").value = "+91";
}

function searchContact() {
  currentSearch = document.getElementById("searchValue").value;
  page = 1;
  loadContacts();
}

function filterByCode() {
  page = 1;
  loadContacts();
}

function updatePaginationUI() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const lastPage = Math.ceil(totalContacts / limit) || 1;

  prevBtn.disabled = page === 1;
  nextBtn.disabled = page >= lastPage;

  const start = totalContacts === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalContacts);
  
  document.getElementById("paginationRange").innerText = `${start}-${end}`;
  document.getElementById("totalCount").innerText = totalContacts;
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
