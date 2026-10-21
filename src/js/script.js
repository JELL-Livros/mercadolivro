
/* Jell Livros — Dev 1
   Funcionalidades do cabeçalho, busca e tema.
*/

// Seleciona os elementos do cabeçalho
const themeToggle = document.querySelector("#theme-toggle");
const themeLabel = document.querySelector("#theme-label");
const themeSymbol = document.querySelector("#theme-symbol");

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchFeedback = document.querySelector("#search-feedback");

const navLinks = document.querySelectorAll(".nav-link");

// MODO CLARO E ESCURO
themeToggle.addEventListener("change", () => {
    const modoEscuro = themeToggle.checked;

    document.body.classList.toggle("dark-mode", modoEscuro);

    themeLabel.textContent = modoEscuro
        ? "Modo escuro"
        : "Modo claro";

    themeSymbol.textContent = modoEscuro
        ? "☾"
        : "☀";

    themeToggle.setAttribute(
        "aria-checked",
        String(modoEscuro)
    );
});

// BARRA DE BUSCA
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const termo = searchInput.value.trim();

    if (termo === "") {
        searchFeedback.textContent =
            "Digite um livro ou uma tecnologia para pesquisar.";

        searchInput.focus();
        return;
    }

    searchFeedback.textContent =
        `Você pesquisou por: "${termo}".`;

});

// NAVEGAÇÃO DO CABEÇALHO
navLinks.forEach((link) => {
    link.addEventListener("click", () => {

        navLinks.forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});
