<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="assets/css/login.css">
    <link rel="shortcut icon" href="assets/images/cardioicon.ico" type="image/x-icon">
    <title>CardioSense Login</title>
</head>
<body>
    <div id="pageContent" class="container">
        <img src="assets/images/logo.png" alt="CardioSense Logo">
        <h1>CARDIOSENSE</h1>
        <p>Precisão em cada batida</p>

        <div class="input-group">
            <i class="icon fas fa-envelope"></i>
            <input type="email" placeholder="Email" id="email">
        </div>
        <div class="input-group">
            <i class="icon fas fa-lock"></i>
            <input type="password" placeholder="Senha" id="password">
            <i class="toggle-password fas fa-eye" title="Visualizar senha" onclick="togglePasswordVisibility()"></i>
        </div>

        <button onclick="login()">Entrar</button>
        
        <a href="views/login/redefinir.php" class="forgot-password">Esqueceu a senha?</a>
        <a href="views/login/cadastro.php" class="signup-link">Ainda não tem uma conta? Crie uma agora</a>
    </div>

   


    <script src="assets/js/login.js"></script>
</body>
</html>
