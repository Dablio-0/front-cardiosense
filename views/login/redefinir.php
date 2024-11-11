<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="../../assets/css/redef.css">
    <link rel="shortcut icon" href="../../assets/images/cardioicon.ico" type="image/x-icon">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <title>Redefina sua Senha</title>
</head>
<body>
    <div id="pageContent" class="container">
        <img src="../../assets/images/logo.png" alt="CardioSense Logo">
        <h4>CARDIOSENSE</h1>
        <p>Precisão em cada batida</p>
        <h2>Recuperação de Senha</h2>
        <br>
        <div class="input-group">
            <i class="icon fas fa-envelope"></i>
            <input type="email" id="securityAnswer" placeholder="Insira seu Email" required>
        </div>
        <button id="sendButton" class="btn">Enviar</button>
        <button id="backButton" class="btn">Voltar</button>
    </div>

    <script>
        document.getElementById('backButton').addEventListener('click', function() {
            window.location.href = '../../index.php';
        });
    </script>

    <script src="../../assets/js/redef.js"></script>
</body>
</html>
