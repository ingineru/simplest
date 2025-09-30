// Mock data storage
let items = [
    { id: 1, name: 'Mock Item 1' },
    { id: 2, name: 'Mock Item 2' }
];

// A simple delay utility to simulate network latency
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Override window.fetch to intercept API calls to /api/items
const originalFetch = window.fetch;
window.fetch = async function (url, options = {}) {
    await delay(300); // simulate network delay

    const method = options.method ? options.method.toUpperCase() : 'GET';
    const baseUrl = '/api/items';

    if (url.startsWith(baseUrl)) {
        const idMatch = url.match(/\/api\/items\/(\d+)/);
        const id = idMatch ? parseInt(idMatch[1], 10) : null;

        if (method === 'GET') {
            if (id !== null) {
                const item = items.find(i => i.id === id);
                if (!item) return Promise.reject(new Error('Item not found'));
                return Promise.resolve(new Response(JSON.stringify(item), { status: 200 }));
            } else {
                return Promise.resolve(new Response(JSON.stringify(items), { status: 200 }));
            }
        }

        if (method === 'POST') {
            const body = JSON.parse(options.body);
            const newItem = { id: Date.now(), name: body.name };
            items.push(newItem);
            return Promise.resolve(new Response(JSON.stringify(newItem), { status: 201 }));
        }

        if (method === 'PUT' && id !== null) {
            const body = JSON.parse(options.body);
            const index = items.findIndex(i => i.id === id);
            if (index === -1) return Promise.reject(new Error('Item not found'));
            items[index].name = body.name;
            return Promise.resolve(new Response(JSON.stringify(items[index]), { status: 200 }));
        }

        if (method === 'DELETE' && id !== null) {
            const index = items.findIndex(i => i.id === id);
            if (index === -1) return Promise.reject(new Error('Item not found'));
            items.splice(index, 1);
            return Promise.resolve(new Response(null, { status: 204 }));
        }
    }

    // For other URLs, perform normal fetch
    return originalFetch(url, options);
};
