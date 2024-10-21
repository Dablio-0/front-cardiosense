<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monitoramento - CardioSense</title>
    <link rel="stylesheet" href="assets/css/monit.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="shortcut icon" href="assets/images/cardioicon.ico" type="image/x-icon">
</head>
<body>
    <header>
        <div class="logo-container">
            <img src="assets/images/logo.png" alt="CardioSense Logo" class="logo">
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
                        <a href="views/user/perfilUsuario.php">Acessar Perfil</a>
                        <a href="views/login/login.php" class="logout-button">Sair</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
    
    <main>
        <section class="monitoramento">
           
            <h2>Monitoramento de Família</h2>
            <p>Acompanhe seus familiares aqui</p>
             <button class="btn-voltar" onclick="window.history.back()">Voltar</button>
        </section>
        
    </main>


    

    <script src = "assets/js/monit.js">
         
    </script>
</body>
</html>
