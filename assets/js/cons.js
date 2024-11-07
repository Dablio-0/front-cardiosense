/* document.addEventListener("DOMContentLoaded", function() {
    tokenValidation(); // Validar o token de acesso ao carregar a página
});

// Função de validação do token
function tokenValidation() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "front-cardiosense/index.php";
    }
}
*/
// Toggle para o menu de perfil
function toggleProfileMenu(event) {
    event.stopPropagation();
    const profileMenu = document.getElementById("profileMenu");
    profileMenu.style.display = profileMenu.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", () => {
    document.getElementById("profileMenu").style.display = "none";
});

ocument.addEventListener("DOMContentLoaded", function() {
    loadRelatives(); 
});

function loadRelatives() {
    fetch('https://sua-api.com/parentes') 
        .then(response => response.json())
        .then(data => {
            populateRelativesSelect(data);
        })
        .catch(error => {
            console.error("Erro ao carregar parentes:", error);
            alert("Houve um erro ao carregar os parentes.");
        });
}

function populateRelativesSelect(relatives) {
    const selectElement = document.getElementById("relativeSelect");
    selectElement.innerHTML = ''; 

    const defaultOption = document.createElement("option");
    defaultOption.value = '';
    defaultOption.textContent = 'Selecione um parente';
    selectElement.appendChild(defaultOption);

    relatives.forEach(relative => {
        const option = document.createElement("option");
        option.value = relative.id; 
        option.textContent = relative.nome;
        selectElement.appendChild(option);
    });
}

function filterReports() {
    const selectedDate = document.getElementById("dateSelect").value;  
    if (!selectedDate) {
        alert("Por favor, selecione uma data.");
        return;
    }
    const date = document.getElementById('dateSelect').value;
    const relative = document.getElementById('relativeSelect').value;
    console.log('Data selecionada:', date);
    console.log('Parente selecionado:', relative);

    const exampleData = {
        date: selectedDate,
        heartRates: [72, 78, 80, 76, 82, 88, 85, 90, 86, 84, 81, 79, 76, 74, 73, 70],
        times: [
            "08:00", "08:10", "08:20", "08:30", "08:40", "08:50", 
            "09:00", "09:10", "09:20", "09:30", "09:40", "09:50", 
            "10:00", "10:10", "10:20", "10:30"
        ],
        averageBPM: 77.2
    };

    loadChart(exampleData);    
    showReportDetails(exampleData); 
}

function loadChart(data) {
    const ctx = document.getElementById("heartRateChart").getContext("2d");
   
    window.heartRateChart = new Chart(ctx, {
        type: "line", 
        data: {
            labels: data.times,  
            datasets: [{
                label: "Batimentos por Minuto (BPM)",
                data: data.heartRates, 
                borderColor: "#4c8bf5",  
                backgroundColor: "rgba(76, 139, 245, 0.2)",  
                borderWidth: 2, 
                fill: true,  
                tension: 0.4  
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

function showReportDetails(data) {
    const detailsContainer = document.getElementById("reportDetails");
    detailsContainer.innerHTML = `
        <p><strong>Data:</strong> ${data.date}</p>
        <p><strong>Batimentos Médios:</strong> ${data.averageBPM} BPM</p>
        <p><strong>Horário de Monitoramento:</strong> ${data.times[0]} - ${data.times[data.times.length - 1]}</p>
    `;
}
