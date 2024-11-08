document.getElementById("saveButton").addEventListener("click", function() {
    
    // Função para pegar o email da URL e armazenar em uma variável
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');

    // Aplica regex para padrão de senha forte
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    console.log('password value:', document.getElementById("password").value);
    console.log('confirm-password value:', document.getElementById("confirm-password").value);
    
    if (!passwordRegex.test(document.getElementById("password").value)) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas e minúsculas, um número e um caractere especial.',
            confirmButtonText: 'OK'
        })
        return;
    }

    var newPassword = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    if (newPassword === confirmPassword) {
        (async () => {
            try {
                // Adicionando 'await' aqui para aguardar a resposta da promessa
                const response = await fetch('http://localhost:80/api/password/reset/confirm', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email, password: newPassword, password_confirmation: confirmPassword })
                });
    
                const data = await response.json(); // Agora isso funcionará corretamente
                console.log(data);
    
                if (data.status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso',
                        text: 'Senha redefinida com sucesso!',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        window.location.href = 'http://localhost:8010/front-cardiosense/index.php';
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: 'Ocorreu um erro ao redefinir a senha. Tente novamente.',
                        confirmButtonText: 'OK'
                    });
                }
            } catch (error) {
                console.error('Erro:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Ocorreu um erro ao redefinir a senha. Tente novamente.',
                    confirmButtonText: 'OK'
                });
            }
        })();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'As senhas não coincidem. Tente novamente.',
            confirmButtonText: 'OK'
        });
        return;
    }
});

function togglePasswordVisibility(fieldId, iconElement) {
    const passwordField = document.getElementById(fieldId);
    const isPasswordVisible = passwordField.type === "text";

    // Altera o tipo do campo entre texto e senha
    passwordField.type = isPasswordVisible ? "password" : "text";
    
    // Troca os ícones de olho
    iconElement.classList.toggle("fa-eye");
    iconElement.classList.toggle("fa-eye-slash");
}


