// mockApi.js - Mock API module for fruit data

export let fruits = [
    { id: 1, name: 'apple' },
    { id: 2, name: 'banana' },
    { id: 3, name: 'orange' },
    { id: 4, name: 'grape' },
    { id: 5, name: 'kiwi' },
    { id: 6, name: 'mango' },
    { id: 7, name: 'pear' },
    { id: 8, name: 'peach' },
    { id: 9, name: 'plum' },
    { id: 10, name: 'strawberry' }
];

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// API functions
export const api = {
    async getFruits() {
        await wait(300);
        return fruits;
    },

    async getFruitById(id) {
        await wait(200);
        const fruit = fruits.find(f => f.id === id);
        if (!fruit) throw new Error('Fruit not found');
        return fruit;
    },

    async addFruit(name) {
        await wait(300);
        const newFruit = { id: fruits.length + 1, name };
        fruits.push(newFruit);
        return newFruit;
    },

    async updateFruit(id, newName) {
        await wait(300);
        const fruit = fruits.find(f => f.id === id);
        if (!fruit) throw new Error('Fruit not found');
        fruit.name = newName;
        return fruit;
    },

    async deleteFruit(id) {
        await wait(300);
        const index = fruits.findIndex(f => f.id === id);
        if (index === -1) throw new Error('Fruit not found');
        const deleted = fruits.splice(index, 1);
        return deleted[0];
    }
};

// Expose functions globally so HTML can call them
window.getAll = async () => {
    try {
        const data = await api.getFruits();
        document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    } catch (e) {
        document.getElementById('output').textContent = e.message;
    }
};

window.getById = async () => {
    const id = Number(document.getElementById('getId').value);
    if (!id) {
        alert('Enter valid ID');
        return;
    }
    try {
        const data = await api.getFruitById(id);
        document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    } catch (e) {
        document.getElementById('output').textContent = e.message;
    }
};

window.addFruit = async () => {
    const name = document.getElementById('addName').value.trim();
    if (!name) {
        alert('Enter fruit name');
        return;
    }
    try {
        const data = await api.addFruit(name);
        document.getElementById('output').textContent = 'Added:\n' + JSON.stringify(data, null, 2);
    } catch (e) {
        document.getElementById('output').textContent = e.message;
    }
};

window.updateFruit = async () => {
    const id = Number(document.getElementById('updateId').value);
    const newName = document.getElementById('updateName').value.trim();
    if (!id || !newName) {
        alert('Enter valid ID and name');
        return;
    }
    try {
        const data = await api.updateFruit(id, newName);
        document.getElementById('output').textContent = 'Updated:\n' + JSON.stringify(data, null, 2);
    } catch (e) {
        document.getElementById('output').textContent = e.message;
    }
};

window.deleteFruit = async () => {
    const id = Number(document.getElementById('deleteId').value);
    if (!id) {
        alert('Enter valid ID');
        return;
    }
    try {
        const data = await api.deleteFruit(id);
        document.getElementById('output').textContent = 'Deleted:\n' + JSON.stringify(data, null, 2);
    } catch (e) {
        document.getElementById('output').textContent = e.message;
    }
};
