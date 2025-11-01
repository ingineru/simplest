const items = [];
const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const itemsList = document.getElementById('itemsList');
let editIndex = -1;

function renderItems() {
    itemsList.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = item;

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => startEdit(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteItem(index);

        buttonsDiv.appendChild(editBtn);
        buttonsDiv.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(buttonsDiv);
        itemsList.appendChild(li);
    });
}

function addItem() {
    const value = itemInput.value.trim();
    if (!value) return alert('Please enter an item.');

    if (editIndex === -1) {
        // Create
        items.push(value);
    } else {
        // Update
        items[editIndex] = value;
        editIndex = -1;
        addBtn.textContent = 'Add';
    }
    itemInput.value = '';
    renderItems();
}

function startEdit(index) {
    itemInput.value = items[index];
    editIndex = index;
    addBtn.textContent = 'Update';
    itemInput.focus();
}

function deleteItem(index) {
    if (confirm('Are you sure to delete this item?')) {
        items.splice(index, 1);
        if (editIndex === index) {
            editIndex = -1;
            addBtn.textContent = 'Add';
            itemInput.value = '';
        }
        renderItems();
    }
}

addBtn.addEventListener('click', addItem);

// Initial render
renderItems();

// Add event listener for Enter key
itemInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        addItem();
    }
});
