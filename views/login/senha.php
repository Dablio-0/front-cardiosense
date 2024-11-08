<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="../../assets/css/senha.css">
    <link rel="shortcut icon" href="../../assets/images/cardioicon.ico" type="image/x-icon">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <title>Redefina sua Senha</title>
</head>
<body>
    <div id="pageContent" class="container">
        <img src="../../assets/images/logo.png" alt="CardioSense Logo">
        <h3>CARDIOSENSE</h3>
        <h4>Precisão em cada batida</h4>
        <h2>Recuperação de Senha</h2>
        <p>Insira uma senha nova e repita a mesma senha para confirmar.</p>
        <p>A senha deve conter no mínimo 8 caracteres. Utilize letras maiúsculas, minúsculas, números e símbolos especiais.</p>
        <br>
        <div class="input-group">
            <input type="password" placeholder="Senha" id="password" required>
            <i class="toggle-password fas fa-eye" title="Visualizar senha" onclick="togglePasswordVisibility('password', this)"></i>
        </div>

        <div class="input-group">
            <input type="password" placeholder="Confirmar Senha" id="confirm-password" required>
            <i class="toggle-password fas fa-eye" title="Visualizar senha" onclick="togglePasswordVisibility('confirm-password', this)"></i>
        </div>

        <button id="saveButton">Salvar</button>
        <a href="../../index.php" class="btn">Voltar</a>

        <script src="../../assets/js/senha.js"></script>
    </div>
</body>
</html>
