document.addEventListener("DOMContentLoaded", () => {
    const profileIcon = document.querySelector(".profile-container");
    const profileMenu = document.querySelector(".profile-menu");
    
    // Alternar a exibição do menu de perfil
    profileIcon.addEventListener("click", () => {
        profileMenu.style.display = profileMenu.style.display === "none" || profileMenu.style.display === "" ? "block" : "none";
    });

    // Configurar o evento para ocultar o menu ao clicar fora dele
    document.addEventListener("click", (event) => {
        if (!profileIcon.contains(event.target) && !profileMenu.contains(event.target)) {
            profileMenu.style.display = "none";
        }
    });

    // Botão de Voltar
    const btnVoltar = document.querySelector(".btn-voltar");
    btnVoltar.addEventListener("click", () => {
        window.history.back();
    });

    // Adicionando evento para botões de ações na tabela de monitoramento
    const actionButtons = document.querySelectorAll(".actions button");
    actionButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const familiarId = event.target.dataset.familiarId;
            window.location.href = `monitorar_familiar.php?id=${familiarId}`;
        });
    });
});
