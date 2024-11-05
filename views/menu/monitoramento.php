<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monitoramento - CardioSense</title>
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
                    <div class="profile-menu" id="profileMenu" style="display: none;">
                        <a href="../../views/user/perfilUsuario.php">Acessar Perfil</a>
                        <a href="../../views/login/index.php" class="logout-button">Sair</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
    
    <main>
        <section class="monitoramento">
            <h2>Monitoramento de Família</h2>
            <p>Acompanhe seus familiares aqui</p>
            <button class="btn-adicionar" onclick="abrirFormularioCadastro()">Adicionar Familiar</button>
            <div class="family-monitor">
                <table id="familyTable">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Último Batimento Registrado</th>
                            <th>Parentesco</th>
                            <th>Ações</th> <!-- Nova coluna para ações -->
                        </tr>
                    </thead>
                    <tbody>
                        <!-- A tabela começa vazia, sem entradas pré-cadastradas -->
                    </tbody>
                </table>
            </div>
            <button class="btn-voltar" onclick="window.history.back()">Voltar</button>
        </section>
        
        <!-- Formulário de Cadastro de Familiar (Popup) -->
        <div class="popup" id="formCadastro" style="display: none;">
            <div class="popup-content">
                <h3>Cadastrar Novo Familiar</h3>
                <label for="family-name">Nome:</label>
                <input type="text" id="family-name" name="nome" required>
                <label for="family-age">Idade:</label>
                <input type="number" id="family-age" name="idade" required>
                <label for="family-relation">Parentesco:</label>
                <input type="text" id="family-relation" name="parentesco" required>
                <div class="popup-actions">
                    <button onclick="cadastrarFamiliar()">Cadastrar</button>
                    <button onclick="fecharFormularioCadastro()">Cancelar</button>
                </div>
            </div>
        </div>
    </main>

    <script src="../../assets/js/monit.js"></script>
</body>
</html>
