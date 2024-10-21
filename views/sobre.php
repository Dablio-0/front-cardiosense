<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sobre - CardioSense</title>
    <link rel="stylesheet" href="assets/css/sobre.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
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
        <section class="sobre-content">
            <h1>Sobre o CardioSense</h1>
            <p>
                O <strong>CardioSense</strong> é uma solução inovadora voltada para o monitoramento de saúde cardiovascular em tempo real. 
                Desenvolvido com tecnologias de sensores e processamento de dados, o sistema permite que usuários monitorem 
                seus batimentos cardíacos de maneira precisa e confiável.
            </p>
            <p>
                Nosso objetivo é oferecer uma ferramenta acessível que auxilie médicos e pacientes a acompanharem a saúde cardiovascular, promovendo 
                intervenções mais rápidas e eficazes. O CardioSense é projetado para ser intuitivo, com uma interface amigável e um design moderno que 
                prioriza a experiência do usuário.
            </p>
            <p>
                Estamos comprometidos com a excelência e buscamos continuamente aprimorar nossas tecnologias, sempre com foco em melhorar a qualidade de vida dos nossos usuários.
            </p>
            <button class="btn-voltar" onclick="window.history.back()">Voltar</button>
        </section>
    </main>

    <script src = "assets/js/sobre.js"> </script>

   
</body>
</html>
