// Jell Livros — funcionalidades do cabeçalho (Dev 1)
const body = document.body;
const themeToggle = document.querySelector("#theme-toggle");
const themeLabel = document.querySelector("#theme-label");
const themeSymbol = document.querySelector("#theme-symbol");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchFeedback = document.querySelector("#search-feedback");
const cartButton = document.querySelector("#cart-button");
const cartCount = document.querySelector("#cart-count");

// Alternância de tema claro/escuro com checkbox.
themeToggle.addEventListener("change", () => {
  const darkModeEnabled = themeToggle.checked;
  body.classList.toggle("dark-mode", darkModeEnabled);
  themeLabel.textContent = darkModeEnabled ? "Modo escuro" : "Modo claro";
  themeSymbol.textContent = darkModeEnabled ? "☾" : "☀";
  themeToggle.setAttribute("aria-checked", String(darkModeEnabled));
});

// Busca demonstrativa: exibe o termo digitado sem recarregar a página.
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const term = searchInput.value.trim();

  if (!term) {
    searchFeedback.textContent = "Digite um título, livro ou tecnologia para pesquisar.";
    searchInput.focus();
    return;
  }

  searchFeedback.textContent = `Busca realizada por: “${term}”. A integração com o catálogo pode ser feita pela equipe.`;
});

// Mantém a navegação visualmente marcada de acordo com o link clicado.
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

// Interação provisória do carrinho para demonstrar o botão.
cartButton.addEventListener("click", () => {
  const currentCount = Number(cartCount.textContent);
  cartCount.textContent = String(currentCount + 1);
  cartButton.setAttribute("aria-label", `Carrinho de compras, ${currentCount + 1} itens demonstrativos`);
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
