document.addEventListener("DOMContentLoaded", () => {
    const profileIcon = document.querySelector(".profile-container");
    const profileMenu = document.querySelector("#profileMenu");
    let currentEditRow = null; // Variável para armazenar a linha sendo editada

    // Alternar a exibição do menu de perfil
    profileIcon.addEventListener("click", () => {
        profileMenu.style.display = profileMenu.style.display === "none" || profileMenu.style.display === "" ? "block" : "none";
    });

    // Ocultar o menu ao clicar fora dele
    document.addEventListener("click", (event) => {
        if (!profileIcon.contains(event.target) && !profileMenu.contains(event.target)) {
            profileMenu.style.display = "none";
        }
    });

    // Função para abrir o formulário de cadastro
    window.abrirFormularioCadastro = () => {
        document.getElementById("formCadastro").style.display = "block";
        document.querySelector(".popup-content h3").textContent = "Cadastrar Novo Familiar"; // Título para cadastro
        resetForm(); // Reseta o formulário ao abrir
    };

    // Função para fechar o formulário de cadastro
    window.fecharFormularioCadastro = () => {
        document.getElementById("formCadastro").style.display = "none";
        resetForm(); // Reseta o formulário ao fechar
    };

    // Função para cadastrar novo familiar ou editar existente
    window.cadastrarFamiliar = async () => {
        const nameInput = document.getElementById("family-name");
        const ageInput = document.getElementById("family-age");
        const familyRelationInput = document.getElementById("family-relation");
        const familyTableBody = document.querySelector("#familyTable tbody");

        // Verifica se os campos estão preenchidos
        if (nameInput.value && ageInput.value && familyRelationInput.value) {
            try {
                // Faz a requisição para a API para obter o batimento cardíaco
                const response = await fetch("http://localhost:8010/api/heartbeat", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                let heartbeatValue = "Não disponível"; // Valor padrão
                if (response.ok) {
                    const data = await response.json();
                    heartbeatValue = data.heartbeat; // Batimento cardíaco
                }

                if (currentEditRow) {
                    // Edita a linha existente
                    currentEditRow.cells[0].textContent = nameInput.value;
                    currentEditRow.cells[1].textContent = ageInput.value;
                    currentEditRow.cells[2].textContent = heartbeatValue;
                    currentEditRow.cells[3].textContent = familyRelationInput.value;
                    alert("Parente editado com sucesso.");
                } else {
                    // Cria uma nova linha na tabela
                    const newRow = familyTableBody.insertRow();
                    newRow.innerHTML = `
                        <td>${nameInput.value}</td>
                        <td>${ageInput.value}</td>
                        <td>${heartbeatValue}</td>
                        <td>${familyRelationInput.value}</td>
                        <td>
                            <button class="btn-editar" onclick="editarFamiliar(this)">Editar</button>
                            <button class="btn-deletar" onclick="deletarFamiliar(this)">Deletar</button>
                        </td>
                    `;
                    alert("Parente cadastrado com sucesso.");
                }

                // Limpa os campos e fecha o popup
                resetForm();
                fecharFormularioCadastro();

            } catch (error) {
                console.error("Erro ao se comunicar com a API:", error);
                alert("Erro na comunicação com a API.");
            }
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    // Função para editar um familiar
    window.editarFamiliar = (btn) => {
        const row = btn.parentNode.parentNode; // Obtém a linha correspondente
        const name = row.cells[0].textContent;
        const age = row.cells[1].textContent;
        const relation = row.cells[3].textContent;

        // Preenche os campos do formulário com os dados do familiar
        document.getElementById("family-name").value = name;
        document.getElementById("family-age").value = age;
        document.getElementById("family-relation").value = relation;

        // Altera o título do formulário para "Editar Familiar"
        document.querySelector(".popup-content h3").textContent = "Editar Familiar";

        // Exibe o formulário
        abrirFormularioCadastro();

        // Armazena a linha atual sendo editada
        currentEditRow = row; // Salva a linha para edição
    };

    // Função para deletar um familiar com confirmação
    window.deletarFamiliar = (btn) => {
        const row = btn.parentNode.parentNode; // Obtém a linha correspondente
        const confirmDelete = confirm("Deseja realmente excluir este familiar?");
        
        if (confirmDelete) {
            row.remove(); // Remove a linha da tabela
            alert("Familiar deletado com sucesso.");
        }
    };

    // Função para resetar o formulário
    const resetForm = () => {
        document.getElementById("family-name").value = "";
        document.getElementById("family-age").value = "";
        document.getElementById("family-relation").value = "";
        currentEditRow = null; // Reseta a linha atual sendo editada
    };
});
