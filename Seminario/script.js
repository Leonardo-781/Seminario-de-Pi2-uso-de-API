document.getElementById('fetch-button').addEventListener('click', fetchData);

function fetchData() {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=10&page=1';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados da API');
            }
            return response.json();
        })
        .then(data => {
            displayData(data);
            renderChartsRecursive(data, 0);  
        })
        .catch(error => {
            document.getElementById('output').innerText = 'Erro: ' + error.message;
        });
}

function displayData(coins) {
    const output = document.getElementById('output');
    output.innerHTML = '';

    coins.forEach(coin => {
        const coinDiv = document.createElement('div');
        coinDiv.classList.add('crypto-card');
        coinDiv.innerHTML = `
            <img src="${coin.image}" alt="${coin.name}">
            <div class="crypto-name">${coin.name}</div>
            <div class="crypto-symbol">${coin.symbol.toUpperCase()}</div>
            <div class="crypto-price">R$${coin.current_price.toFixed(2)}</div>
        `;
        output.appendChild(coinDiv);
    });
}

function renderChartsRecursive(coins, index) {
    if (index >= 3) return;  

    const coinNames = coins.map(coin => coin.name);
    const prices = coins.map(coin => coin.current_price);
    const marketCaps = coins.map(coin => coin.market_cap);
    const volumes = coins.map(coin => coin.total_volume);

    const chartData = [
        { canvasId: 'priceChart', label: 'Preço em R$', data: prices, type: 'bar', title: 'Preço das Criptomoedas (R$)' },
        { canvasId: 'marketCapChart', label: 'Valor de Mercado em R$', data: marketCaps, type: 'pie', title: 'Valor de Mercado das Criptomoedas (R$)' },
        { canvasId: 'volumeChart', label: 'Volume em R$', data: volumes, type: 'line', title: 'Volume de Transações das Criptomoedas (R$)' }
    ];

    const { canvasId, label, data, type, title } = chartData[index];

    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type,
        data: {
            labels: coinNames,
            datasets: [{
                label,
                data,
                backgroundColor: type === 'pie' ? [
                    '#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#2ecc71',
                    '#3498db', '#e74c3c', '#9b59b6', '#34495e', '#f1c40f'
                ] : 'rgba(58, 134, 255, 0.6)',
                borderColor: type === 'line' ? 'rgba(255, 206, 86, 1)' : 'rgba(58, 134, 255, 1)',
                borderWidth: type === 'line' ? 2 : 1,
                fill: type === 'line' ? false : true,
                tension: type === 'line' ? 0.1 : 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: type !== 'line' },
                title: { display: true, text: title }
            }
        }
    });

    
    renderChartsRecursive(coins, index + 1);
}
