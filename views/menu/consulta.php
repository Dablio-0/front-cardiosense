<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Histórico de Batimentos - CardioSense</title>
    <link rel="stylesheet" href="../../assets/css/cons.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="shortcut icon" href="../../assets/images/cardioicon.ico" type="image/x-icon">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <header>
        <div class="logo-container">
            <img src="../../assets/images/logo.png" alt="CardioSense Logo" class="logo">
            <div class="brand-slogan">
                <span class="brand-name">CardioSense</span>
                <span class="slogan">Precisão em cada batida</span>
            </div>
        </div>
        <div class="header-actions">
            <div class="header-icons">
                <div class="profile-container">
                    <button class="profile-button" title="Perfil" onclick="toggleProfileMenu(event)">
                        <i class="fas fa-user"></i>
                    </button>
                    <div class="profile-menu" id="profileMenu">
                        <a href="../../views/user/perfilUsuario.php">Acessar Perfil</a>
                        <a href="../../views/login/index.php" class="logout-button">Sair</a>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <main>
        <div class="filter-container">
            <h2>Filtrar Consulta</h2>
            <div class="filter-row">
                <div class="filter-input-wrapper">
                    <label for="dateSelect">Selecione a data:</label>
                    <input type="date" id="dateSelect" class="filter-input">
                </div>
                <div class="filter-input-wrapper">
                    <label for="relativeSelect">Selecione um parente:</label>
                    <select id="relativeSelect" class="filter-input">
                        <option value="">Carregando...</option>
                    </select>
                </div>
            </div>
            <button class="filter-button" onclick="filterReports()">Buscar Consulta</button>
        </div>

        <div class="report-container">
            <div class="chart-section">
                <canvas id="heartRateChart"></canvas>
            </div>
            <div class="info-section">
                <h2>Detalhes da Consulta</h2>
                <div id="reportDetails">
                    <p>Selecione uma consulta para ver os detalhes.</p>
                </div>
            </div>
        </div>
    </main>

    <script src="../../assets/js/cons.js"></script>
</body>
</html>
