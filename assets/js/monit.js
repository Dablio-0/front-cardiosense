function tokenValidation(){
    const token = localStorage.getItem('token');
    if (!token) {
        localStorage.clear();
        window.location.href = 'http://localhost:8010/front-cardiosense/index.php';
    }
}

// Inicializa o gráfico
const ctx = document.getElementById('batimentosChart').getContext('2d');
const heartRateChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Rótulos de tempo (minuto:segundo)
        datasets: [{
            label: 'Batimentos por Minuto (bpm)',
            data: [], // Dados dos batimentos
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 2,
            fill: true,
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: { display: true, text: 'Tempo (min:seg)' }
            },
            y: {
                title: { display: true, text: 'Batimentos (bpm)' },
                beginAtZero: true
            }
        }
    }
});


// Função para atualizar o gráfico com dados da API
async function updateChart() {
    try {
        const response = await fetch('http://localhost:80/api/monitor/data/bpm', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao buscar os dados do gráfico.',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = 'http://localhost:8010/front-cardiosense/views/home.php';
            });
            return;
        }

        const data = await response.json();

        // Organiza dados para o gráfico
        const newLabels = [];
        const newData = [];

        const values = Object.values(data);

        console.log('Dados:', values);
        if (values.length === 0) {
            console.log('Nenhum dado encontrado');
            return;
        }

        values.forEach(value => {
            newLabels.push(`${value.minute}:${value.second}`);
            newData.push(value.bpm);
        });

        console.log('Labels:', newLabels);
        console.log('Data:', newData);

        if (newLabels.length === 0) {
            console.log('Nenhum dado encontrado');
            return;
        }

        if (newLabels.length > 10) {
            newLabels.shift();
            newData.shift();
        }

        

        // Atualiza o gráfico com novos dados
        heartRateChart.data.labels = newLabels;
        heartRateChart.data.datasets[0].data = newData;
        heartRateChart.update();
    } catch (error) {
        console.error('Erro ao atualizar o gráfico:', error);
    }
}

setInterval(updateChart, 15000);

updateChart();

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
});


