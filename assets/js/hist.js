document.addEventListener('DOMContentLoaded', () => {
    const profileMenu = document.getElementById('profileMenu');
    const btnVoltar = document.getElementById('btnVoltar');

    if (btnVoltar) {
        btnVoltar.addEventListener('click', function() {
            window.history.back();
        });
    }

    const profileButton = document.querySelector('.profile-button');
    if (profileButton) {
        profileButton.addEventListener('click', function(event) {
            event.stopPropagation();
            if (profileMenu) {
                profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    }

    document.addEventListener('click', function(event) {
        if (profileMenu && !profileMenu.contains(event.target)) {
            profileMenu.style.display = 'none';
        }
    });

    // Renderiza o histórico de dados reais da API
    renderHistorico();

    renderSections(); // Renderiza as seções acessadas ao carregar a página
});

function renderHistorico() {
    fetch('http://localhost:8010/api/historico') 
        .then(response => response.json())
        .then(data => {
            const tabela = document.getElementById('historicoTabela');
            tabela.innerHTML = ''; // Limpa a tabela antes de preencher

            data.forEach(item => {
                const row = document.createElement('tr');
                const dataCell = document.createElement('td');
                const bpmCell = document.createElement('td');

                dataCell.textContent = item.dataHora;
                bpmCell.textContent = item.bpm;

                row.appendChild(dataCell);
                row.appendChild(bpmCell);
                tabela.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar histórico:', error);
            alert('Não foi possível carregar o histórico. Tente novamente.');
        });
}

function updateRecentSections(secao) {
    let sections = JSON.parse(localStorage.getItem('secoes_acessadas')) || [];
    sections = sections.filter(item => item !== secao);
    sections.unshift(secao);
    localStorage.setItem('secoes_acessadas', JSON.stringify(sections));
    renderSections(); // Renderiza a lista após a atualização
}

function renderSections() {
    const sections = JSON.parse(localStorage.getItem('secoes_acessadas')) || [];
    const sectionList = document.getElementById('sectionList');
    sectionList.innerHTML = ''; // Limpa a lista antes de renderizar
    sections.forEach(secao => {
        const li = document.createElement('li');
        li.textContent = secao;
        sectionList.appendChild(li);
    });
}
