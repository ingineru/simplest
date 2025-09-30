const apiUrl = '/api/items';

const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const itemsList = document.getElementById('itemsList');

let editId = null;

// Fetch and render all items on page load
async function fetchItems() {
    try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error('Failed to fetch items');
        const items = await res.json();
        renderItems(items);
    } catch (error) {
        alert(error.message);
    }
}

// Render items to the list
function renderItems(items) {
    itemsList.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = item.name;

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => startEdit(item));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteItem(item.id));

        buttonsDiv.appendChild(editBtn);
        buttonsDiv.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(buttonsDiv);
        itemsList.appendChild(li);
    });
}

// Prepare form for editing an item
function startEdit(item) {
    itemInput.value = item.name;
    editId = item.id;
    addBtn.textContent = 'Update';
    itemInput.focus();
}

// Handle add or update button click
addBtn.addEventListener('click', async () => {
    const name = itemInput.value.trim();
    if (!name) {
        alert('Please enter an item name');
        return;
    }
    if (editId) {
        await updateItem(editId, name);
    } else {
        await createItem(name);
    }
    itemInput.value = '';
    editId = null;
    addBtn.textContent = 'Add';
    await fetchItems();
});

// Create item via API
async function createItem(name) {
    try {
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        if (!res.ok) throw new Error('Failed to create item');
        await res.json();
    } catch (error) {
        alert(error.message);
    }
}

// Update item via API
async function updateItem(id, name) {
    try {
        const res = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        if (!res.ok) throw new Error('Failed to update item');
        await res.json();
    } catch (error) {
        alert(error.message);
    }
}

// Delete item via API
async function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
        const res = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete item');
        await fetchItems();
    } catch (error) {
        alert(error.message);
    }
}

// Initial fetch of items when the page loads
fetchItems();
