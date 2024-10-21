document.addEventListener('DOMContentLoaded', () => {
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
