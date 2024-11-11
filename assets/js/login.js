async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validação simples
    if (!email || !password) {
        if (!email) {
            document.getElementById('email').classList.add('shake');
        }
        if (!password) {
            document.getElementById('password').classList.add('shake');
        }
        
        setTimeout(() => {
            document.getElementById('email').classList.remove('shake');
            document.getElementById('password').classList.remove('shake');
        }, 500);
        
        alert('Por favor, preencha todos os campos.');
        return;
    }

    console.log('Email:', email);
    console.log('Senha:', password);

    try {
        // Envia dados para a API
        const response = await fetch('http://localhost:80/api/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // Verifica a resposta da API
        if (response.ok) {
            const result = await response.json();
            // Salva o token no LocalStorage
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            window.location.href = 'http://localhost:8010/front-cardiosense/views/home.php';           
        } else if (response.status === 401) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Email ou senha incorretos.',
                confirmButtonText: 'OK'
            });

        } else {
            console.error('Erro ao enviar dados para a API:', response.statusText);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao enviar dados para a API.',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.reload();
            });
        }
    } catch (error) {
        console.error('Erro na comunicação com a API:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro na comunicação com a API.',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.reload();
        });
    }
}

// Visibilidade da senha
function togglePasswordVisibility() {
    const passwordField = document.getElementById("password");
    const icon = document.querySelector(".toggle-password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}
