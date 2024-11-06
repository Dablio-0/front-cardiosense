function tokenvalidation(){
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../../index.html';
    }
}

// Função para carregar dados do perfil da API
async function carregarPerfil() {
    try {
        const response = await fetch('https://localhost:80/api/user/profile');
        if (response.ok) {
            const perfil = await response.json();
            document.getElementById('name').value = perfil.nome;
            document.getElementById('email').value = perfil.email;
            document.getElementById('sexo').value = perfil.sexo;
            document.getElementById('altura').value = perfil.altura;
            document.getElementById('peso').value = perfil.peso;
            document.getElementById('imc').value = perfil.imc; // Assumindo que o IMC já está calculado
            document.getElementById('profilePicPreview').src = perfil.imagemUrl; // URL da imagem
        } else {
            console.error('Erro ao carregar perfil:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na comunicação com a API:', error);
    }
}

// Carregar a imagem no avatar
document.getElementById('change-pic').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('profilePicPreview').src = event.target.result;
            enviarImagemBase64(event.target.result);
        }
        reader.readAsDataURL(file);
    }
});

// Calcular IMC
document.getElementById('calcular-imc').addEventListener('click', function() {
    const altura = parseFloat(document.getElementById('altura').value) / 100;
    const peso = parseFloat(document.getElementById('peso').value);
    if (altura > 0 && peso > 0) {
        const imc = (peso / (altura * altura)).toFixed(2);
        document.getElementById('imc').value = imc;
        document.getElementById('resultado-imc').textContent = 'Seu IMC é: ' + imc;
    } else {
        document.getElementById('resultado-imc').textContent = 'Por favor, insira valores válidos.';
    }
});

// Enviar a imagem em Base64 para a API
async function enviarImagemBase64(base64Image) {
    try {
        const response = await fetch('https://localhost:8010/api/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64Image }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Imagem enviada com sucesso:', result);
        } else {
            console.error('Erro ao enviar a imagem:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na comunicação com a API:', error);
    }
}

// Função para alterar dados do perfil
async function alterar() {
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const sexo = document.getElementById('sexo').value;
    const password = document.getElementById('password').value;
    const altura = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;
    const imc = document.getElementById('imc').value;

    // Validação simples
    if (!nome || !email || !sexo || !password || !altura || !peso) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        const response = await fetch('https://localhost:80/api/user/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, sexo, password, altura, peso, imc }),
        });

        if (response.ok) {
            const result = await response.json();
            alert('Alterações salvas com sucesso!');
        } else {
            alert('Erro ao salvar alterações. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro na comunicação com a API:', error);
        alert('Erro na comunicação com a API.');
    }
}


window.onload = carregarPerfil;
