async function cadastrar() {
    const nome = document.querySelector('input[placeholder="Nome"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const dataNascimento = document.querySelector('input[type="date"]').value;
    const sexo = document.querySelector('select').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!nome || !email || !dataNascimento || !sexo || !password || !confirmPassword) {
        const inputs = [
            { el: 'input[placeholder="Nome"]', field: nome },
            { el: 'input[placeholder="Email"]', field: email },
            { el: 'input[type="date"]', field: dataNascimento },
            { el: 'select', field: sexo },
            { el: '#password', field: password },
            { el: '#confirm-password', field: confirmPassword }
        ];

        inputs.forEach(input => {
            if (!input.field) {
                const element = document.querySelector(input.el);
                element.classList.add('shake');
                element.focus();
            }
        });

        setTimeout(() => {
            inputs.forEach(input => {
                document.querySelector(input.el).classList.remove('shake');
            });
        }, 500);

        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (password !== confirmPassword) {
        alert('As senhas não correspondem.');
        return;
    }

    try {
        const response = await fetch('http://localhost:8010/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, dataNascimento, sexo, password }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Resposta da API:', result);
            alert('Cadastro realizado com sucesso!');
            window.location.href = '../../index.php';
        } else {
            alert('Erro ao realizar cadastro. Tente novamente.');
        }
    } catch (error) {
        alert('Erro na comunicação com a API.');
    }
}

function togglePasswordVisibility(fieldId, iconElement) {
    const passwordField = document.getElementById(fieldId);
    const isPasswordVisible = passwordField.type === "text";

    passwordField.type = isPasswordVisible ? "password" : "text";
    iconElement.classList.toggle("fa-eye");
    iconElement.classList.toggle("fa-eye-slash");
}
