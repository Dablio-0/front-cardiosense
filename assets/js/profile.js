function tokenvalidation(){
    const token = localStorage.getItem('token');
    if (!token) {
        localStorage.clear();
        window.location.href = 'http://localhost:8010/front-cardiosense/index.php';
    }
}

// Função para carregar dados do perfil da API
function carregarPerfil() {
    try {
        // Mostrar os dados de usuário salvos em localStorage
        const user = localStorage.getItem('user');
        console.log('Usuário:', user);

        if (!user) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Usuário não encontrado.',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = 'http://localhost:8010/front-cardiosense/index.php';
            });
            return;
        }

        const perfil = JSON.parse(user);

        document.getElementById('name').value = perfil.name;
        document.getElementById('email').value = perfil.email;

        // Preencher o campo sexo com o valor do perfil, ajustado para MALE, FEMALE ou OTHER
        if (perfil.sex) {
            const sexoSelect = document.getElementById('sexo');
            sexoSelect.value = perfil.sex; // Atribuir o valor de perfil.sex ao select
        }

        const imagemBase64 = perfil.image_profile || null;
        if (imagemBase64) {
            document.getElementById('profilePicPreview').src = imagemBase64;
        }

    } catch (error) {
        console.error('Erro ao pegar os dados do perfil:', error);
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

// Enviar a imagem em Base64 e dados do perfil para a API
async function alterar() {
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const sexo = document.getElementById('sexo').value;
    const profilePic = document.getElementById('profilePicPreview').src;

    // Validação simples
    if (!nome || !email || !sexo || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const user = localStorage.getItem('user');
    if (!user) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Usuário não encontrado.',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.href = 'http://localhost:8010/front-cardiosense/index.php';
        });
        return;
    }

    const parsedUser = JSON.parse(user);
    const userId = parsedUser.id;

    try {
        const response = await fetch(`https://localhost:80/api/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, sexo, password, profilePic }),
        });

        if (response.ok) {
            await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'Alterações salvas com sucesso.',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.reload();
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Ocorreu um erro ao salvar as alterações.',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.reload();
            });
        }
    } catch (error) {
        console.error('Erro:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Ocorreu um erro ao salvar as alterações. Tente novamente.',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.reload();
        });
    }
}

window.onload = () => {
    tokenvalidation();
    carregarPerfil();
};
