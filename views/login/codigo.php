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
        </div>
        
        <!-- Alteração no botão para "onclick" -->
        <button onclick="submitCode()">Enviar</button>
        <a href="../../index.php" class="btn">Voltar</a>
    </div>

    <script src="../../assets/js/redef.js"></script>
    <script>
        // Função para pegar o email da URL e armazenar em uma variável
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');

        // Função para mover automaticamente para o próximo campo
        function moveToNext(current, nextFieldID) {
            if (current.value.length >= 1) {
                document.getElementById(nextFieldID).focus();
            }
        }

        // Função para coletar o código e enviar (exemplo)
        function submitCode() {
            let code = '';

            // Coletar os valores dos campos de código
            for (let i = 1; i <= 6; i++) {
                code += document.getElementById('code' + i).value;
            }

            if (!code || !email) { // Validação se email está presente
                Swal.fire({
                    title: 'Erro!',
                    text: 'Por favor, insira o código de verificação e o email.',
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false
                });
                return;
            }

            console.log('Email:', email);
            console.log('Código:', code);

            // Enviar a requisição para o backend
            fetch('http://localhost:80/api/password/reset/code/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, reset_code: code }) // Incluindo o email
            })
            .then(response => response.json()) // Primeiro converte a resposta em JSON
            .then(data => { // Agora trata os dados JSON
                if (data.status) { // Verifica status no JSON retornado
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Seu código de verificação foi verificado com sucesso.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });

                    // Redirecionar para a tela de redefinição de senha
                    window.location.href = 'http://localhost:8010/front-cardiosense/views/login/senha.php?email=' + email;
                } else {
                    Swal.fire({
                        title: 'Erro!',
                        text: data.message || 'Ocorreu um erro ao verificar o código. Por favor, tente novamente.',
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
                    text: 'Não foi possível conectar ao servidor. Tente novamente mais tarde.',
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false
                });
            });

        }
    </script>
</body>
</html>
