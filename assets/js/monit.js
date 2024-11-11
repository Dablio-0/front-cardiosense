// Função de validação do token
function tokenValidation(){
    const token = localStorage.getItem('token');
    if (!token) {
        localStorage.clear();
        window.location.href = 'http://localhost:8010/front-cardiosense/index.php';
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

    token = localStorage.getItem('token');

    try {
        const response = await fetch(`http://localhost:80/api/monitor/data/bpm`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        atualizarDados(data);
    } catch (error) {
        console.error('Erro ao conectar ao apresentar os dados:', error);
        
        // alert('Não foi possível conectar ao ESP32. Tente novamente.');
    }
}

// Função para atualizar os dados no gráfico
function atualizarDados(response) {
    // Verifica se `data` existe e se é um objeto
 
    console.log(response.data);
    if (!response || !response.data || typeof response.data !== 'object') {
        console.error("Dados inválidos ou ausentes no objeto de resposta");
        return;
    }

    Object.keys(response.data).forEach((timestamp) => {
        const bpmArray = response.data[timestamp];

        bpmArray.forEach((bpm) => {
            const labels = batimentosChart.data.labels;
            const chartData = batimentosChart.data.datasets[0].data;
            
            labels.push(labels.length); // Usando índice incremental como timestamp
            chartData.push(bpm);

            // Limita o gráfico aos últimos 30 registros
            if (labels.length > 30) {
                labels.shift();
                chartData.shift();
            }
        });
    });

    batimentosChart.update();
}


// Toggle para o menu de perfil
function toggleProfileMenu(event) {
    event.stopPropagation();
    const profileMenu = document.getElementById('profileMenu');
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
}

// Fecha o menu de perfil ao clicar fora
document.addEventListener('click', () => {
    document.getElementById('profileMenu').style.display = 'none';
});

// Carrega o token, consulta ritmo e ativa a atualização contínua
document.addEventListener('DOMContentLoaded', () => {
    tokenValidation();
    const secao = 'Consulta';
    updateRecentSections(secao);
    consultarRitmo(); // Primeira consulta ao carregar a página
    
    // Configura para repetir a consulta a cada 60 segundos (1 minuto)
    setInterval(consultarRitmo, 60000);
});

// Função para atualizar seções recentes no armazenamento local
function updateRecentSections(secao) {
    let sections = JSON.parse(localStorage.getItem('secoes_acessadas')) || [];
    sections = sections.filter(item => item !== secao);
    sections.unshift(secao);
    if (sections.length > 5) sections.pop(); 
    localStorage.setItem('secoes_acessadas', JSON.stringify(sections));
}
