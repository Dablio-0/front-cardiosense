function tokenValidation() {
    const token = localStorage.getItem('token');
    if (!token) {
        localStorage.clear();
        window.location.href = 'http://localhost:8010/front-cardiosense/index.php';
    }
}
function toggleProfileMenu(event) {
    event.stopPropagation();
    const profileMenu = document.getElementById('profileMenu');
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
}


document.addEventListener('click', function() {
    const profileMenu = document.getElementById('profileMenu');
    if (profileMenu) {
        profileMenu.style.display = 'none';
    }
});

// Renderiza as seções acessadas ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderSections();
});

// Atualiza as seções acessadas
function updateRecentSections(secao) {
    let sections = JSON.parse(localStorage.getItem('secoes_acessadas')) || [];
    sections = sections.filter(item => item !== secao);
    sections.unshift(secao);
    localStorage.setItem('secoes_acessadas', JSON.stringify(sections));
    renderSections(); // Renderiza a lista após a atualização
}


function handleCardClick(secao, url) {
    updateRecentSections(secao);
    setTimeout(() => {
        window.location.href = url; 
    }, 50);
}

// Renderiza as seções na tela
function renderSections() {
    const sections = JSON.parse(localStorage.getItem('secoes_acessadas')) || [];
    const sectionList = document.getElementById('sectionList');
    if (sectionList) {
        sectionList.innerHTML = ''; // Limpa a lista antes de renderizar
        sections.forEach(secao => {
            const li = document.createElement('li');
            li.textContent = secao;
            sectionList.appendChild(li);
        });
    }
}
