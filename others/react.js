let count = 0;

const countEl = document.getElementById('count');
const click = document.getElementById('click');
const reset = document.getElementById('reset');

click.addEventListener('click', () => {
    count++;
    countEl.textContent = `Button clicked ${count} times`;
});

reset.addEventListener('click', () => {
    count = 0;
    countEl.textContent = `Button clicked ${count} times`;
});
