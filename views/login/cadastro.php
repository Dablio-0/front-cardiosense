<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CardioSense - Cadastro</title>
    <link rel="stylesheet" href="../../assets/css/cad.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="shortcut icon" href="../../assets/images/cardioicon.ico" type="image/x-icon">
</head>

<body>
    <div class="container">
        <img src="../../assets/images/logo.png" alt="Logo CardioSense" class="logo">
        <h1>CardioSense</h1>
        <p>Precisão em cada batida</p>

        <form onsubmit="event.preventDefault(); cadastrar();">
            <div class="input-group">
                <i class="fas fa-user icon"></i>
                <input type="text" placeholder="Nome" required>
            </div>

            <div class="input-group">
                <i class="fas fa-envelope icon"></i>
                <input type="email" placeholder="Email" required>
            </div>

            <div class="input-group">
                <i class="fas fa-calendar-alt icon"></i>
                <input type="date" class="custom-date-input" required>
            </div>

            <div class="input-group">
                <i class="fas fa-venus-mars icon-select"></i>
                <select required>
                    <option value="" disabled selected>Selecione o sexo</option>
                    <option value="MALE">Masculino</option>
                    <option value="FEMALE">Feminino</option>
                    <option value="OTHER">Outro</option>
                </select>
            </div>

            <div class="input-group">
                <i class="fas fa-lock icon"></i>
                <input type="password" placeholder="Senha" id="password" required>
                <i class="toggle-password fas fa-eye" title="Visualizar senha" onclick="togglePasswordVisibility('password', this)"></i>
            </div>

            <div class="input-group">
                <i class="fas fa-lock icon"></i>
                <input type="password" placeholder="Confirmar Senha" id="confirm-password" required>
                <i class="toggle-password fas fa-eye" title="Visualizar senha" onclick="togglePasswordVisibility('confirm-password', this)"></i>
            </div>

            <button type="submit">Cadastrar</button>
        </form>

        <a href="../../views/login/login.php" >Já possui uma conta? Faça login</a>
    </div>

    <script src="../../assets/js/cad.js"></script>
</body>

</html>
