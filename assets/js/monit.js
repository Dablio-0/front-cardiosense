function tokenValidation(){
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'front-cardiosense/index.php';
    }
}

// Inicializa o gráfico
const ctx = document.getElementById('batimentosChart').getContext('2d');
const batimentosChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Batimentos Cardíacos por Minuto (BPM)',
            data: [],
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderColor: '#007bff',
            borderWidth: 2,
            pointBackgroundColor: '#007bff'
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tempo (s)',
                    color: '#007bff'
                },
                ticks: {
                    color: '#007bff'
                }
            },
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Batimentos por Minuto (BPM)',
                    color: '#007bff'
                },
                ticks: {
                    color: '#007bff'
                }
            }
        }
    }
});

// Função para consultar o ritmo atual do ESP32
async function consultarRitmo() {
    try {
        const response = await fetch(`http://localhost:80/api`); 
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const bpm = data.bpm;
        atualizarDados(bpm);
    } catch (error) {
        console.error('Erro ao conectar ao ESP32:', error);
        alert('Não foi possível conectar ao ESP32. Tente novamente.');
    }
}

// Função para atualizar os dados no gráfico
function atualizarDados(bpm) {
    const labels = batimentosChart.data.labels;
    const data = batimentosChart.data.datasets[0].data;
    const timestamp = labels.length; 
    labels.push(timestamp);
    data.push(bpm);

    // Limita os dados do gráfico para os últimos 30 registros
    if (labels.length > 30) {
        labels.shift();
        data.shift();
    }

    batimentosChart.update();
}

// Toggle para o menu de perfil
function toggleProfileMenu(event) {
    event.stopPropagation();
    const profileMenu = document.getElementById('profileMenu');
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', () => {
    document.getElementById('profileMenu').style.display = 'none';
});

// Executa a consulta de batimentos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    tokenValidation();
    const secao = 'Consulta';
    updateRecentSections(secao);
    consultarRitmo(); // Chama a função para consultar batimentos ao carregar
});

function updateRecentSections(secao) {
    let sections = JSON.parse(localStorage.getItem('secoes_acessadas')) || [];
    sections = sections.filter(item => item !== secao);
    sections.unshift(secao);
    if (sections.length > 5) sections.pop(); 
    localStorage.setItem('secoes_acessadas', JSON.stringify(sections));
}


