function tokenValidation() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = '../../index.html';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    tokenValidation();

    const profileIcon = document.querySelector(".profile-container");
    const profileMenu = document.querySelector("#profileMenu");
    let currentEditRow = null;

    profileIcon.addEventListener("click", () => {
        profileMenu.style.display = profileMenu.style.display === "none" || profileMenu.style.display === "" ? "block" : "none";
    });

    document.addEventListener("click", (event) => {
        if (!profileIcon.contains(event.target) && !profileMenu.contains(event.target)) {
            profileMenu.style.display = "none";
        }
    });

    window.abrirFormularioCadastro = () => {
        document.getElementById("formCadastro").style.display = "block";
        document.querySelector(".popup-content h3").textContent = "Cadastrar Novo Familiar";
        resetForm();
    };

    window.fecharFormularioCadastro = () => {
        document.getElementById("formCadastro").style.display = "none";
        resetForm();
    };

    window.cadastrarFamiliar = async () => {
        const nameInput = document.getElementById("family-name");
        const ageInput = document.getElementById("family-age");
        const familyRelationInput = document.getElementById("family-relation");
        const familyTableBody = document.querySelector("#familyTable tbody");

        if (nameInput.value && ageInput.value && familyRelationInput.value) {
            const familyMember = {
                name: nameInput.value,
                age: ageInput.value,
                relation: familyRelationInput.value
            };

            try {
                if (currentEditRow) {
                    // Editar um familiar existente
                    currentEditRow.cells[0].textContent = nameInput.value;
                    currentEditRow.cells[1].textContent = ageInput.value;
                    currentEditRow.cells[2].textContent = familyRelationInput.value;

                    // Atualiza os dados na API
                    await fetch(`http://localhost:8010/api/family/${currentEditRow.dataset.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(familyMember)
                    });

                    alert("Parente editado com sucesso.");
                } else {
                    // Adicionar um novo familiar
                    const response = await fetch("http://localhost:8010/api/family", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(familyMember)
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const newRow = familyTableBody.insertRow();
                        newRow.dataset.id = data.id; // Armazena o ID retornado pela API
                        newRow.innerHTML = `
                            <td>${nameInput.value}</td>
                            <td>${ageInput.value}</td>
                            <td>${familyRelationInput.value}</td>
                            <td>
                                <button class="btn-editar" onclick="editarFamiliar(this)">Editar</button>
                                <button class="btn-deletar" onclick="deletarFamiliar(this)">Deletar</button>
                            </td>
                        `;
                        alert("Parente cadastrado com sucesso.");
                    } else {
                        alert("Erro ao enviar dados para a API.");
                    }
                }

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

    window.editarFamiliar = (btn) => {
        const row = btn.parentNode.parentNode;
        const name = row.cells[0].textContent;
        const age = row.cells[1].textContent;
        const relation = row.cells[2].textContent;

        document.getElementById("family-name").value = name;
        document.getElementById("family-age").value = age;
        document.getElementById("family-relation").value = relation;
        document.querySelector(".popup-content h3").textContent = "Editar Familiar";

        abrirFormularioCadastro();
        currentEditRow = row;
    };

    window.deletarFamiliar = (btn) => {
        const row = btn.parentNode.parentNode;
        if (confirm("Deseja realmente excluir este familiar?")) {
            row.remove();
            alert("Familiar deletado com sucesso.");
        }
    };

    const resetForm = () => {
        document.getElementById("family-name").value = "";
        document.getElementById("family-age").value = "";
        document.getElementById("family-relation").value = "";
        currentEditRow = null;
    };
});
