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

    // Aplica regex para padrão de senha forte
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    console.log('password value:', password);
    console.log('confirm-password value:', confirmPassword);
    
    if (!passwordRegex.test(password)) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas e minúsculas, um número e um caractere especial.',
            confirmButtonText: 'OK'
        })
        return;
    }

    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'As senhas não coincidem. Tente novamente.',
            confirmButtonText: 'OK'
        })
        return;
    }

    // Formata a data para o formato d/m/y
    const [year, month, day] = dataNascimento.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    try {
        const response = await fetch('http://localhost:80/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: nome, email: email, date_birth: formattedDate, sex: sexo, password: password, password_confirmation: confirmPassword })
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Resposta da API:', result);
            Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'Cadastro realizado com sucesso!',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = 'http://localhost:8010/front-cardiosense/index.php';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao realizar o cadastro. Tente novamente.',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.reload(); 
            });
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro de comunicação com a API.');
    }
}

function togglePasswordVisibility(fieldId, iconElement) {
    const passwordField = document.getElementById(fieldId);
    const isPasswordVisible = passwordField.type === "text";

    passwordField.type = isPasswordVisible ? "password" : "text";
    iconElement.classList.toggle("fa-eye");
    iconElement.classList.toggle("fa-eye-slash");
}
