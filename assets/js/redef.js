document.getElementById("sendButton").addEventListener("click", async function() {
    var email = document.getElementById("securityAnswer").value;

    if (!email) {
        alert("Por favor, insira um email.");
        return;
    }

    console.log('Email:', email);
    
    await fetch('http://localhost:80/api/password/reset/code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => {
        if (response.ok) {
            Swal.fire({
                title: 'Sucesso!',
                text: 'Código enviado com sucesso. Verifique seu email.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } else {
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao enviar o código. Verifique seu email e tente novamente.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
        return response.json();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro de comuicação com a API.');
    });
});

document.getElementById("closePopupButton").addEventListener("click", function() {
    document.getElementById("popupOverlay").style.display = "none";
});

document.getElementById("saveButton").addEventListener("click", async function() {
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword === confirmPassword) {
      
        await fetch('http://localhost:80/api/password/reset/code', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: document.getElementById("securityAnswer").value })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) { 
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: 'Senha redefinida com sucesso!',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = 'http://localhost:8010/front-cardiosense/index.php';
                });
                document.getElementById("popupOverlay").style.display = "none";
            } else {
                Swak.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Ocorreu um erro ao redefinir a senha. Tente novamente.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.reload();
                });
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


