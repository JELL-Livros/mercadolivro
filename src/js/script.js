// Jell Livros — Dev 1: única funcionalidade JavaScript do cabeçalho (tema).
const themeButton = document.querySelector('#theme-button');
const themeIcon = document.querySelector('#theme-icon');

// Alterna entre os modos claro e escuro.
themeButton.addEventListener('click', () => {
  const darkMode = document.body.classList.toggle('dark-mode');
  themeIcon.textContent = darkMode ? '☀' : '☾';
  themeButton.setAttribute(
    'aria-label',
    darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'
  );
});
