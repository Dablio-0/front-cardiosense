<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta de Batimentos - CardioSense</title>
    <link rel="stylesheet" href="../../assets/css/monit.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="shortcut icon" href="../../assets/images/cardioicon.ico" type="image/x-icon">
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
        <div class="consulta-container">
            <h2>Consulta de Batimentos Cardíacos</h2>
            <div class="graph-container">
                <canvas id="batimentosChart"></canvas>
            </div>
            <button class="btn-voltar" id="btnVoltar" onclick="window.history.back()">Voltar</button>
        </div>
    </main>
  
    <script src="../../assets/js/monit.js"></script>
</body>
</html>
