function tokenValidation() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../../index.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    tokenValidation();
    renderSections(); // Renderiza as seções acessadas ao carregar a página
});

// Alterna a visibilidade do menu de perfil
function toggleProfileMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('profileMenu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

// Fecha o menu se clicar fora dele
window.onclick = function(event) {
    const menu = document.getElementById('profileMenu');
    if (menu.style.display === 'block' && !menu.contains(event.target)) {
        menu.style.display = 'none';
    }
};

// Atualiza as seções acessadas
function updateRecentSections(secao) {
    let sections = JSON.parse(localStorage.getItem('secoes_acessadas')) || [];
    sections = sections.filter(item => item !== secao); // Remove a seção se já existir
    sections.unshift(secao); // Adiciona a nova seção no início
    localStorage.setItem('secoes_acessadas', JSON.stringify(sections));
    renderSections(); // Renderiza a lista após a atualização
}

// Lida com o clique nos cards
function handleCardClick(secao, url) {
    updateRecentSections(secao);
    setTimeout(() => {
        window.location.href = url; // Redireciona para a nova página
    }, 50);
}

// Renderiza as seções na tela
function renderSections() {
    const sections = JSON.parse(localStorage.getItem('secoes_acessadas')) || [];
    const sectionList = document.getElementById('sectionList');

    // Verifica se o elemento existe
    if (sectionList) {
        sectionList.innerHTML = ''; // Limpa a lista antes de renderizar
        sections.forEach(secao => {
            const li = document.createElement('li');
            li.textContent = secao;
            sectionList.appendChild(li);
        });
    }
}

async function logout() {

    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user.id : null;
        const token = localStorage.getItem('token');

        console.log('Usuário:', userId);
        console.log('Token:', token);

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        if (!userId || !token) {
            console.error('Usuário ou token não encontrado');
            return;
        }

        const response = await fetch(`http://localhost:80/api/logout/${userId}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            console.log('Logout bem-sucedido');
            window.location.href = 'http://localhost:8010/front-cardiosense/';
        } else {
            console.error('Erro ao fazer logout');
        }
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
}
