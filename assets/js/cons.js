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
document.getElementById('consultarRitmo').addEventListener('click', async () => {
    try {
        const response = await fetch('http://<IP_DO_SEU_ESP32>/dados'); // Substitua pelo IP do seu ESP32
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const bpm = data.bpm;
        atualizarDados(bpm);
    } catch (error) {
        console.error('Erro ao conectar ao ESP32:', error);
        alert('Não foi possível conectar ao ESP32. Tente novamente.');
    }
});

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


document.getElementById('btnVoltar').addEventListener('click', () => {
    window.history.back();
});


document.addEventListener('DOMContentLoaded', () => {
    const secao = 'Consulta';
    updateRecentSections(secao);
});

function updateRecentSections(secao) {
    let sections = JSON.parse(localStorage.getItem('secoes_acessadas')) || [];
    sections = sections.filter(item => item !== secao);
    sections.unshift(secao);
    if (sections.length > 5) sections.pop(); // Mantém no máximo 5 seções recentes
    localStorage.setItem('secoes_acessadas', JSON.stringify(sections));
}
document.getElementById('parenteSelect').addEventListener('change', (event) => {
    const consultarButton = document.getElementById('consultarRitmo');
    consultarButton.disabled = !event.target.value; // Habilita o botão se uma opção for selecionada
});
