document.getElementById('change-pic').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('profilePicPreview').src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
});

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
        // Envia dados para a API
        const response = await fetch('https://sua-api-endpoint.com/perfil', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, sexo, password, altura, peso, imc }),
        });

        // Verifica a resposta da API
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
