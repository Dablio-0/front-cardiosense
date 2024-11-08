<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil do Usuário</title>
    <link rel="stylesheet" href="../../assets/css/profile.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="shortcut icon" href="../../assets/images/cardioicon.ico" type="image/x-icon">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
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
    </header>   
    
    <main>
        <section class="profile">
            <div class="profile-content">
                <div class="profile-picture">  
                    <img src="../../assets/images/profile-pic.png" alt="" class="profile-pic" id="profilePicPreview">
                    <input type="file" id="change-pic" accept="image/*" title="Clique para alterar a foto de perfil" style="display: none;">
                </div>
                <button class="custom-file-upload" onclick="document.getElementById('change-pic').click();">Escolher Foto</button>
                <form class="profile-form" id="profileForm" enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="name">Nome:</label>
                        <input type="text" id="name" placeholder="Seu Nome" required>
                    </div>

                    <div class="form-group">
                        <label for="email">E-mail:</label>
                        <input type="email" id="email" placeholder="Seu E-mail" required>
                    </div>

                    <!-- <div class="form-group">
                        <label for="password">Senha:</label>
                        <input type="password" id="password" placeholder="Sua Senha" required>
                    </div> -->

                    <div class="form-group">
                        <label for="sexo">Sexo:</label>
                        <select id="sexo" required>
                            <option value="">Selecione seu sexo</option>
                            <option value="MALE">Masculino</option>
                            <option value="FEMALE">Feminino</option>
                            <option value="OTHER">Outro</option>
                        </select>
                    </div>


                    <!-- <div class="form-group">
                        <label for="altura">Altura (cm):</label>
                        <input type="number" id="altura" placeholder="Sua Altura" required>
                    </div>

                    <div class="form-group">
                        <label for="peso">Peso (kg):</label>
                        <input type="number" id="peso" placeholder="Seu Peso" required>
                    </div>

                    <div class="form-group">
                        <label for="imc">IMC:</label>
                        <input type="text" id="imc" readonly placeholder="IMC Calculado">
                    </div> -->

                    <!-- <button type="button" id="calcular-imc">Calcular IMC</button>
                    <p id="resultado-imc"></p> -->

                    <button type="button" onclick="alterar()" class="save-btn">Salvar Alterações</button>
                </form>
            </div>
            <button class="btn-voltar" onclick="window.location.href='../../views/home.php'">Voltar</button>
        </section>
    </main>

    <script src="../../assets/js/profile.js"></script>
</body>
</html>
