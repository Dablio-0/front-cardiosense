document.getElementById("sendButton").addEventListener("click", function() {
    var email = document.getElementById("securityAnswer").value;

    
    if (!email) {
        alert("Por favor, insira um email.");
        return;
    }

    
    fetch('http//localhost/api/password/reset/code', { //Endereço da Rota
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.exists) { 
            document.getElementById("popupOverlay").style.display = "flex";
        } else {
            alert("Email não encontrado. Tente novamente.");
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert("Erro ao tentar acessar.");
    });
});

document.getElementById("closePopupButton").addEventListener("click", function() {
    document.getElementById("popupOverlay").style.display = "none";
});

document.getElementById("saveButton").addEventListener("click", function() {
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword === confirmPassword) {
      
        fetch('localhost/api/password/reset/code', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: document.getElementById("securityAnswer").value })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) { 
                alert("Senha redefinida com sucesso!");
                document.getElementById("popupOverlay").style.display = "none";
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
