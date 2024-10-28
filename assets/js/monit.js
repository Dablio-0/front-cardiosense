document.addEventListener("DOMContentLoaded", () => {
    const profileIcon = document.querySelector(".profile-container");
    const profileMenu = document.querySelector("#profileMenu");
    
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
    };

    // Função para fechar o formulário de cadastro
    window.fecharFormularioCadastro = () => {
        document.getElementById("formCadastro").style.display = "none";
    };

    // Função para cadastrar novo familiar
    window.cadastrarFamiliar = () => {
        const nameInput = document.getElementById("family-name");
        const ageInput = document.getElementById("family-age");
        const familyRelationInput = document.getElementById("family-relation");
        const familyTableBody = document.querySelector("#familyTable tbody");

        // Verifica se os campos estão preenchidos
        if (nameInput.value && ageInput.value && familyRelationInput.value) {
            // Aqui você deve buscar o último batimento da API
            const heartbeatValue = "Busque o valor do batimento da API"; // Substitua isso pela lógica da API

            // Cria uma nova linha na tabela com os dados do parente
            const newRow = familyTableBody.insertRow();
            newRow.innerHTML = `
                <td>${nameInput.value}</td>
                <td>${ageInput.value}</td>
                <td>${heartbeatValue}</td>
                <td>${familyRelationInput.value}</td>
            `;

            // Limpa os campos e fecha o popup
            nameInput.value = "";
            ageInput.value = "";
            familyRelationInput.value = ""; // Limpa o campo de parentesco
            fecharFormularioCadastro();
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };
});
