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


let quantidadeCarrinho = 0;

function atualizarContador() {
    const contador = document.getElementById("carrinho-contador");
    contador.textContent = quantidadeCarrinho;
}

function adicionarCarrinho(event) {
    const botao = event.currentTarget;
    const titulo = botao.dataset.titulo;
    const preco = botao.dataset.preco;

    quantidadeCarrinho++;
    atualizarContador();

    alert(`${titulo} (${preco}) foi adicionado ao carrinho!`);
}

function abrirCarrinho(event) {
    event.preventDefault();

    if (quantidadeCarrinho === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const resposta = confirm(
        `Você tem ${quantidadeCarrinho} livro(s) no carrinho. Deseja resetar o carrinho?`
    );

    if (resposta) {
        quantidadeCarrinho = 0;
        atualizarContador();
        alert("Carrinho resetado!");
    }
}

function configurarCarrinho() {
    const botoes = document.querySelectorAll(".adicionar");
    const botaoCarrinho = document.querySelector(".cart-link");

    botoes.forEach((botao) => {
        botao.addEventListener("click", adicionarCarrinho);
    });

    botaoCarrinho.addEventListener("click", abrirCarrinho);
}

configurarCarrinho();

// Mostra uma mensagem de status ("ok" ou "erro") em um parágrafo .msg
function mostrarMensagem(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.className = "msg" + (tipo ? " " + tipo : "");
}

// Cria um elemento com classe e texto (textContent evita injeção de HTML)
function criarElemento(tag, classe, texto) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto !== undefined) el.textContent = texto;
    return el;
}

// Reinicia uma animação CSS no elemento
function reiniciarAnimacao(elemento, classe) {
    elemento.classList.remove(classe);
    void elemento.offsetWidth;
    elemento.classList.add(classe);
}

// Livros da livraria (usados na prévia)
const LIVROS = [
    { titulo: "Inteligência Artificial", capa: "src/assets/Inteligencia%20Artificial.jpg" },
    { titulo: "Tecnologia X Humanidade", capa: "src/assets/Tecnologia%20X%20Humanidade.jpg" },
    { titulo: "Vida 3.0", capa: "src/assets/vida%203.0.jpg" },
    { titulo: "Ciência e Tecnologia", capa: "src/assets/ciencia%20e%20tecnologia.jpg" },
    { titulo: "Tecnologia na Infância", capa: "src/assets/tecnologia%20na%20infancia.jpg" }
];


// ---------- 1) Título / Perfil ----------

const TITULO_PADRAO = "JELL Livros";
const CHAVE_TITULO = "jell-titulo";

const tituloSite = document.getElementById("titulo-site");
const formTitulo = document.getElementById("form-titulo");
const tituloInput = document.getElementById("titulo-input");
const tituloReset = document.getElementById("titulo-reset");
const tituloMsg = document.getElementById("titulo-msg");

function aplicarTitulo(texto) {
    tituloSite.textContent = texto;
    tituloSite.title = texto;
    document.title = texto;
}

// O localStorage pode estar indisponível; por isso o try/catch
function salvarTitulo(texto) {
    try { localStorage.setItem(CHAVE_TITULO, texto); } catch (e) { /* ignora */ }
}

function apagarTitulo() {
    try { localStorage.removeItem(CHAVE_TITULO); } catch (e) { /* ignora */ }
}

function carregarTitulo() {
    try {
        const salvo = localStorage.getItem(CHAVE_TITULO);
        if (salvo) aplicarTitulo(salvo);
    } catch (e) { /* ignora */ }
}

formTitulo.addEventListener("submit", (event) => {
    event.preventDefault();
    const novo = tituloInput.value.trim();

    if (!novo) {
        mostrarMensagem(tituloMsg, "Digite um nome ou termo para atualizar o título.", "erro");
        return;
    }

    aplicarTitulo(novo);
    salvarTitulo(novo);
    mostrarMensagem(tituloMsg, `Título atualizado para “${novo}”.`, "ok");
    tituloInput.value = "";
});

tituloReset.addEventListener("click", () => {
    aplicarTitulo(TITULO_PADRAO);
    apagarTitulo();
    tituloInput.value = "";
    mostrarMensagem(tituloMsg, "Título restaurado para o padrão.", "ok");
});

carregarTitulo();


// ---------- 2) Vitrine dinâmica: 3 mais vendidos ----------

const ranking = ["Inteligência Artificial", "Vida 3.0", "Tecnologia X Humanidade"];

const rankingLista = document.getElementById("ranking");
const formRanking = document.getElementById("form-ranking");
const rankTitulo = document.getElementById("rank-titulo");
const rankPos = document.getElementById("rank-pos");
const rankMsg = document.getElementById("rank-msg");

function renderizarRanking(posicaoAtualizada) {
    rankingLista.innerHTML = "";

    ranking.forEach((titulo, indice) => {
        const item = criarElemento("li", "rank-item");
        item.appendChild(criarElemento("span", "rank-num", String(indice + 1)));
        item.appendChild(criarElemento("span", "rank-nome", titulo));

        if (indice === posicaoAtualizada) {
            item.classList.add("atualizado");
        }

        rankingLista.appendChild(item);
    });
}

formRanking.addEventListener("submit", (event) => {
    event.preventDefault();

    const titulo = rankTitulo.value.trim();
    const posicao = Number(rankPos.value);

    if (!titulo) {
        mostrarMensagem(rankMsg, "Digite o título do livro.", "erro");
        return;
    }

    if (!Number.isInteger(posicao) || posicao < 1 || posicao > 3) {
        mostrarMensagem(rankMsg, "A posição deve ser um número inteiro de 1 a 3.", "erro");
        return;
    }

    ranking[posicao - 1] = titulo;
    renderizarRanking(posicao - 1);
    mostrarMensagem(rankMsg, `“${titulo}” agora ocupa a posição ${posicao}.`, "ok");
    rankTitulo.value = "";
    rankPos.value = "";
});

renderizarRanking();


// ---------- 3) Calendário de lançamentos ----------

// Troque os dados abaixo pelos lançamentos reais da sua livraria
const LANCAMENTOS = [
    { mes: "Novembro de 2026", categoria: "Tecnologia", titulo: "IA no Dia a Dia", descricao: "Como a inteligência artificial já aparece na rotina de casa, do trabalho e da escola." },
    { mes: "Dezembro de 2026", categoria: "Ciência", titulo: "O Futuro da Computação", descricao: "Dos computadores quânticos aos chips que imitam o cérebro: o que vem por aí." },
    { mes: "Janeiro de 2027", categoria: "Educação", titulo: "Aprender com Máquinas", descricao: "Ferramentas digitais e o novo papel de professores e estudantes." },
    { mes: "Fevereiro de 2027", categoria: "Sociedade", titulo: "Vida Conectada", descricao: "Redes, privacidade e os limites entre o mundo online e o offline." },
    { mes: "Março de 2027", categoria: "Futuro", titulo: "Cidades Inteligentes", descricao: "Tecnologia a serviço de cidades mais sustentáveis e humanas." },
    { mes: "Abril de 2027", categoria: "Tecnologia", titulo: "Ética em Algoritmos", descricao: "Quem decide o que as máquinas decidem? Um guia para entender o debate." }
];

const lancLista = document.getElementById("lanc-lista");
const formLanc = document.getElementById("form-lanc");
const lancNum = document.getElementById("lanc-num");
const lancResultado = document.getElementById("lanc-resultado");
const lancDica = document.getElementById("lanc-dica");
const DICA_PADRAO = "Passe o mouse sobre um mês.";

function marcarMesAtivo(numero) {
    lancLista.querySelectorAll(".lanc-item").forEach((item) => {
        item.classList.toggle("ativo", Number(item.dataset.numero) === numero);
    });
}

function mostrarLancamento(numero) {
    const lancamento = LANCAMENTOS[numero - 1];

    lancResultado.innerHTML = "";
    lancResultado.appendChild(criarElemento("span", "lanc-tag", `${lancamento.categoria} · ${lancamento.mes}`));
    lancResultado.appendChild(criarElemento("h3", "", lancamento.titulo));
    lancResultado.appendChild(criarElemento("p", "", lancamento.descricao));

    marcarMesAtivo(numero);
}

function mostrarAviso(texto) {
    lancResultado.innerHTML = "";
    lancResultado.appendChild(criarElemento("p", "dica", texto));
    marcarMesAtivo(0);
}

function renderizarLancamentos() {
    LANCAMENTOS.forEach((lancamento, indice) => {
        const numero = indice + 1;
        const item = criarElemento("li", "lanc-item");
        item.dataset.numero = numero;
        item.tabIndex = 0;
        item.appendChild(criarElemento("span", "lanc-num", String(numero)));
        item.appendChild(criarElemento("span", "", lancamento.mes));

        // Clique (ou Enter/Espaço) escolhe o mês
        const escolher = () => {
            lancNum.value = numero;
            mostrarLancamento(numero);
        };
        item.addEventListener("click", escolher);
        item.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                escolher();
            }
        });

        // Evento de mouse: muda o texto da dica ao passar o mouse por cima
        item.addEventListener("mouseover", () => {
            lancDica.textContent = `Clique para ver os lançamentos de ${lancamento.mes}.`;
        });
        item.addEventListener("mouseout", () => {
            lancDica.textContent = DICA_PADRAO;
        });

        lancLista.appendChild(item);
    });
}

// Valida o número digitado e mostra o resultado na hora
function processarNumeroMes() {
    const texto = lancNum.value.trim();

    if (texto === "") {
        mostrarAviso("Escolha um número para ver os lançamentos do mês.");
        return;
    }

    const numero = Number(texto);

    if (!Number.isInteger(numero) || numero < 1 || numero > LANCAMENTOS.length) {
        mostrarAviso(`Número inválido. Digite um valor de 1 a ${LANCAMENTOS.length}.`);
        return;
    }

    mostrarLancamento(numero);
}

lancNum.addEventListener("input", processarNumeroMes);
formLanc.addEventListener("submit", (event) => {
    event.preventDefault();
    processarNumeroMes();
});

lancNum.max = LANCAMENTOS.length;
renderizarLancamentos();


// ---------- 4) Geração dinâmica de imagem: Prévia do Livro ----------

const previaSelect = document.getElementById("previa-select");
const previaGerar = document.getElementById("previa-gerar");
const previaLimpar = document.getElementById("previa-limpar");
const previaMsg = document.getElementById("previa-msg");
const previaArea = document.getElementById("previa-area");
const TEXTO_GERAR = previaGerar.textContent;

LIVROS.forEach((livro, indice) => {
    const opcao = criarElemento("option", "", livro.titulo);
    opcao.value = indice;
    previaSelect.appendChild(opcao);
});

function gerarPrevia() {
    const indice = Number(previaSelect.value);
    const livro = LIVROS[indice];
    const idImagem = `previa-img-${indice}`;

    // Validação: se a imagem já foi gerada, não cria outra
    const existente = document.getElementById(idImagem);
    if (existente) {
        mostrarMensagem(previaMsg, `A prévia de “${livro.titulo}” já foi gerada.`, "erro");
        reiniciarAnimacao(existente.closest(".ereader"), "destaque");
        return;
    }

    const figura = criarElemento("figure", "ereader");

    const imagem = document.createElement("img");
    imagem.id = idImagem;
    imagem.src = livro.capa;
    imagem.alt = `Prévia da capa do livro ${livro.titulo}`;

    figura.appendChild(imagem);
    figura.appendChild(criarElemento("figcaption", "", livro.titulo));
    previaArea.appendChild(figura);

    mostrarMensagem(previaMsg, `Prévia de “${livro.titulo}” gerada.`, "ok");
}

previaGerar.addEventListener("click", gerarPrevia);

// Eventos de mouse: o texto do botão muda ao passar o mouse
previaGerar.addEventListener("mouseover", () => {
    previaGerar.textContent = "Clique para gerar!";
});
previaGerar.addEventListener("mouseout", () => {
    previaGerar.textContent = TEXTO_GERAR;
});

previaLimpar.addEventListener("click", () => {
    previaArea.innerHTML = "";
    mostrarMensagem(previaMsg, "Prévias removidas.", "ok");
});
