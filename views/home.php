
<?php
session_start();

// // Inicializar seções acessadas se não estiverem setadas
// if (!isset($_SESSION['secoes_acessadas'])) {
//     $_SESSION['secoes_acessadas'] = [];
// }

// // Adicionar uma seção acessada quando a página for carregada
// if (isset($_GET['secao'])) {
//     $secao = htmlspecialchars($_GET['secao']);
    
//     // Adicionar a nova seção no início da lista
//     if (!in_array($secao, $_SESSION['secoes_acessadas'])) {
//         array_unshift($_SESSION['secoes_acessadas'], $secao);
//     } else {
//         // Se a seção já existe, movê-la para o início
//         $_SESSION['secoes_acessadas'] = array_diff($_SESSION['secoes_acessadas'], [$secao]);
//         array_unshift($_SESSION['secoes_acessadas'], $secao);
//     }
// }

// // Recuperando as seções acessadas
// $secoes_acessadas = $_SESSION['secoes_acessadas'];
// ?>



<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tela Inicial</title>
    <link rel="stylesheet" href="../assets/css/inicial.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="shortcut icon" href="../assets/images/cardioicon.ico" type="image/x-icon">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <header>
        <div class="logo-container">
            <img src="../assets/images/logo.png" alt="CardioSense Logo" class="logo">
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
                        <a href="../views/user/perfilUsuario.php">Acessar Perfil</a> <!--DEIXAR O IGUAL OS BOTÕES -->
                        <button class="logout-button" onclick="logout()">Sair</button>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <main>
        <section class="cards">
            <div class="card" onclick="handleCardClick('Monitoramento', '../views/menu/monitoramento.php')">
                <i class="fas fa-heartbeat card-icon"></i>
                <h3>MONITORAMENTO</h3>
                <p>Acompanhe seus batimentos cardíacos AO VIVO</p>
            </div>
            <div class="card" onclick="handleCardClick('Família', '../views/menu/familia.php')">
                 <i class="fas fa-users card-icon"></i> 
                <h3>FAMÍLIA</h3> 
                 <p>Acompanhe a saúde dos seus familiares</p> 
                </div>

            <div class="card" onclick="handleCardClick('Consulta', '../views/menu/consulta.php')">
                <i class="fas fa-stethoscope card-icon"></i>
                <h3>CONSULTA</h3>
                <p>Consulte seu histórico de ritmos cardíacos</p>
            </div>
            <div class="card" onclick="handleCardClick('Sobre', '../views/sobre.php')">
                <i class="fas fa-info-circle card-icon"></i>
                <h3>SOBRE</h3>
                <p>Saiba tudo sobre o CardioSense</p>
            </div>
        </section>
        
    </main>
<!--
    <div class="widgets">
    <div class="widget" id="sessions">
        <h2>Seções acessadas recentemente</h2> 
        <ul id="sectionList"></ul>
    </div>
</div> !-->


    <script src="../assets/js/home.js"></script>
</body>
</html>
