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
    <style>
        /* Estilização para os quadradinhos do código */
        .code-input {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin: 20px 0;
        }
        
        .code-input input {
            width: 40px;
            height: 40px;
            font-size: 20px;
            text-align: center;
            border: 2px solid #ccc;
            border-radius: 5px;
        }

        .code-input input:focus {
            border-color: #00aaff;
            outline: none;
        }

        /* Estilização dos botões */
        #sendCodeButton {
            background-color: #00aaff;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }

        #sendCodeButton:hover {
            background-color: #007acc;
        }

        .btn {
            display: inline-block;
            margin-top: 15px;
            padding: 10px 20px;
            color: #00aaff;
            text-decoration: none;
            border: 2px solid #00aaff;
            border-radius: 100px;
            font-size: 16px;
            text-align: center;
        }

        .btn:hover {
            background-color: #00aaff;
            color: #fff;
        }
    </style>
</head>
<body>
    <div id="pageContent" class="container">
        <img src="../../assets/images/logo.png" alt="CardioSense Logo">
        <h4>CARDIOSENSE</h4>
        <p>Precisão em cada batida</p>
        <h2>Recuperação de Senha</h2>
        <br>
        <p>Um código foi enviado para <?php echo $_GET['email']; ?>. Insira o código abaixo para redefinir sua senha.</p>
        
        <div class="code-input">
            <input type="text" maxlength="1" oninput="moveToNext(this, 'code2')" id="code1">
            <input type="text" maxlength="1" oninput="moveToNext(this, 'code3')" id="code2">
            <input type="text" maxlength="1" oninput="moveToNext(this, 'code4')" id="code3">
            <input type="text" maxlength="1" oninput="moveToNext(this, 'code5')" id="code4">
            <input type="text" maxlength="1" oninput="moveToNext(this, 'code6')" id="code5">
            <input type="text" maxlength="1" id="code6">
            <input type="hidden" id="emailField" value="<?php echo $_GET['email'] ?>">
        </div>
        
        <!-- Alteração no botão para "onclick" -->
        <button onclick="submitCode()">Enviar</button>
        <a href="../../index.php" class="btn">Voltar</a>
    </div>

    <script src="../../assets/js/redef.js"></script>
    <script>
        // Função para mover automaticamente para o próximo campo
        function moveToNext(current, nextFieldID) {
            if (current.value.length >= 1) {
                document.getElementById(nextFieldID).focus();
            }
        }

        // Função para coletar o código e enviar (exemplo)
        function submitCode() {
            let code = '';
            for (let i = 1; i <= 6; i++) {
                code += document.getElementById('code' + i).value;
            }

            // pegar o email que está na rota

            if (!code) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Por favor, insira o código de verificação.',
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false
                });
                return;
            }

            console.log('Email:', email);
            console.log('Código:', code);
            try {
                fetch('http://localhost:80/api/password/reset/code/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email, reset_code: code })
                })
                .then(response => {
                    if (response.ok) { 
                        Swal.fire({
                            title: 'Sucesso!',
                            text: 'Código verificado com sucesso.',
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false
                        });
                        // Correção de 'windows' para 'window'
                        window.location.href = "http://localhost:8010/front-cardiosense/views/login/redefinir.php";
                    } else {
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Código inválido ou expirado. Tente novamente.',
                            icon: 'error',
                            timer: 1500,
                            showConfirmButton: false
                        });
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Ocorreu um erro no envio do código.',
                        icon: 'error',
                        showConfirmButton: true
                    });
                });
            } catch (error) {
                console.error('Erro:', error);
                Swal.fire({
                    title: 'Erro!',
                    text: 'Ocorreu um erro ao processar a solicitação.',
                    icon: 'error',
                    showConfirmButton: true
                });
            }
        }
    </script>
</body>
</html>
