document.addEventListener("DOMContentLoaded", function() {
    tokenValidation(); // Validar o token de acesso ao carregar a página
});

// Função de validação do token
function tokenValidation() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "front-cardiosense/index.php";
    }
}

// Toggle para o menu de perfil
function toggleProfileMenu(event) {
    event.stopPropagation();
    const profileMenu = document.getElementById("profileMenu");
    profileMenu.style.display = profileMenu.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", () => {
    document.getElementById("profileMenu").style.display = "none";
});

function filterReports() {
    // Pega a data selecionada
    const selectedDate = document.getElementById("dateSelect").value;  
    if (!selectedDate) {
        alert("Por favor, selecione uma data.");
        return;
    }

    // Simulando dados com base na data selecionada
    const exampleData = {
        date: selectedDate,
        heartRates: [72, 78, 80, 76, 82, 88, 85, 90, 86, 84, 81, 79, 76, 74, 73, 70],
        times: [
            "08:00", "08:10", "08:20", "08:30", "08:40", "08:50", 
            "09:00", "09:10", "09:20", "09:30", "09:40", "09:50", 
            "10:00", "10:10", "10:20", "10:30"
        ],
        averageBPM: 77.2 // Batimento médio para esse exemplo
    };

    loadChart(exampleData);    // Carregar o gráfico com os dados simulados
    showReportDetails(exampleData); // Exibir os detalhes da consulta
}

// Função para carregar o gráfico de batimentos cardíacos
function loadChart(data) {
    const ctx = document.getElementById("heartRateChart").getContext("2d");
    if (window.heartRateChart) window.heartRateChart.destroy();  // Destruir o gráfico anterior se houver

    window.heartRateChart = new Chart(ctx, {
        type: "line",  // Tipo do gráfico (linha)
        data: {
            labels: data.times,  // Horários das medições
            datasets: [{
                label: "Batimentos por Minuto (BPM)",
                data: data.heartRates,  // Batimentos para cada horário
                borderColor: "#4c8bf5",  // Cor da linha
                backgroundColor: "rgba(76, 139, 245, 0.2)",  // Cor de fundo
                borderWidth: 2,  // Largura da linha
                fill: true,  // Preencher área sob a linha
                tension: 0.4  // Curvatura da linha
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Horário"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Batimentos por Minuto (BPM)"
                    },
                    beginAtZero: false
                }
            }
        }
    });
}

// Função para exibir detalhes da consulta
function showReportDetails(data) {
    const detailsContainer = document.getElementById("reportDetails");
    detailsContainer.innerHTML = `
        <p><strong>Data:</strong> ${data.date}</p>
        <p><strong>Batimentos Médios:</strong> ${data.averageBPM} BPM</p>
        <p><strong>Horário de Monitoramento:</strong> ${data.times[0]} - ${data.times[data.times.length - 1]}</p>
    `;
}
