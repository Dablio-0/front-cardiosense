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
        const response = await fetch('http://localhost:8010/api/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // Verifica a resposta da API
        if (response.ok) {
            const result = await response.json();
            console.log('Resposta da API:', result);
            alert('Login realizado com sucesso!');
           
        } else if (response.status === 401) {
            alert('Email ou senha incorretos. Tente novamente.');
        } else {
            console.error('Erro ao enviar dados para a API:', response.statusText);
            alert('Erro ao realizar login. Tente novamente mais tarde.');
        }
    } catch (error) {
        console.error('Erro na comunicação com a API:', error);
        alert('Erro na comunicação com a API.');
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
