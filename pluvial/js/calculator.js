document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cost-estimator');
    const resultBox = document.getElementById('result-box');
    const priceDisplay = document.getElementById('estimated-price');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const roofFactor = parseFloat(document.getElementById('roof-type').value);
            const gutters = parseFloat(document.getElementById('gutters').value) || 0;
            const downspouts = parseFloat(document.getElementById('downspouts').value) || 0;
            const materialPrice = parseFloat(document.getElementById('material').value);

            // Base calculation
            // Material price is per meter (average for gutter/downspout mix for simplicity in this demo)
            // In reality, gutters and downspouts might have different prices.
            // Let's assume materialPrice is average linear meter price.

            const totalLength = gutters + downspouts;
            let baseCost = totalLength * materialPrice;

            // Apply complexity factor (accessories, corners, difficulty)
            // 20% extra for accessories is standard, plus roof factor
            baseCost = baseCost * 1.2 * roofFactor;

            // Round to nearest 10
            const finalPrice = Math.ceil(baseCost / 10) * 10;

            // Display
            priceDisplay.textContent = `${finalPrice} RON`;
            resultBox.style.display = 'block';

            // Scroll to result
            resultBox.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
