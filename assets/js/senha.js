document.getElementById("saveButton").addEventListener("click", function() {
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword === confirmPassword) {
        fetch('http//localhost:8010/api/password/reset/confirm', {  // Certifique-se de que o endereço está correto
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: newPassword })  // Envia a nova senha
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) { 
                alert("Senha redefinida com sucesso!");
                // Redirecione para a página de login ou outra página, se necessário
                window.location.href = 'views/login/login.php'; 
            } else {
                alert("Erro ao redefinir a senha. Tente novamente.");
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Ocorreu um erro");
        });
    } else {
        alert("As senhas não coincidem. Tente novamente.");
    }
});
