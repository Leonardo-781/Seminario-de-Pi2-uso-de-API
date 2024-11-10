<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Melhor Forma de Sonegar</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        <h1>Carta de Cripto</h1>
        <button id="fetch-button">Obter Dados</button>

        <div class="charts">
            <canvas id="priceChart"></canvas>
            <canvas id="marketCapChart"></canvas>
            <canvas id="volumeChart"></canvas>
        </div>

        <div id="output"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>
