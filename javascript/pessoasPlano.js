// ---------- Elementos ----------
const MAX_PESSOAS = 4;

const lista = document.getElementById('listaPessoas');
const cards = Array.from(lista.querySelectorAll('.cardPessoa'));
const cardAdicionar = document.getElementById('cardAdicionar');

const busca = document.getElementById('busca');
const ordenar = document.getElementById('ordenar');
const formFiltros = document.getElementById('formFiltros');
const filtroTitular = document.getElementById('filtroTitular');
const filtroDependentes = document.getElementById('filtroDependentes');
const filtroParentesco = document.getElementById('filtroParentesco');
const btnLimpar = document.getElementById('btnLimpar');

const contagem = document.getElementById('contagem');
const semResultados = document.getElementById('semResultados');

// Filtros aplicados (só mudam ao clicar em "Aplicar filtros")
let filtros = { titular: true, dependentes: true, parentesco: 'todos' };

// ---------- Utilidades ----------
const normalizar = (t) =>
    t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

const plural = (n, singular, pluralTxt) => (n === 1 ? singular : pluralTxt);

// ---------- Banner e card "Adicionar" ----------
function atualizarPlano() {
    const total = cards.length;
    const vagas = MAX_PESSOAS - total;

    document.getElementById('contadorPlano').textContent = `${total} de ${MAX_PESSOAS} pessoas`;

    const titulo = document.getElementById('addTitulo');
    const texto = document.getElementById('addTexto');

    if (vagas > 0) {
        titulo.textContent = 'Mais alguém para cuidar';
        texto.textContent = `Você ainda tem ${vagas} ${plural(vagas, 'vaga disponível', 'vagas disponíveis')} no seu plano.`;
        cardAdicionar.classList.remove('cheio');
        cardAdicionar.removeAttribute('aria-disabled');
    } else {
        titulo.textContent = 'Plano completo';
        texto.textContent = 'Você usou todas as vagas do seu plano.';
        cardAdicionar.classList.add('cheio');
        cardAdicionar.setAttribute('aria-disabled', 'true');
    }
}

// ---------- Filtrar, buscar e ordenar ----------
function passaFiltros(card) {
    const termo = normalizar(busca.value);
    const nomeOk = !termo || normalizar(card.dataset.nome).includes(termo);

    const vinculo = card.dataset.vinculo; // "titular" | "dependente"
    const vinculoOk =
        (vinculo === 'titular' && filtros.titular) ||
        (vinculo === 'dependente' && filtros.dependentes);

    const parentescoOk =
        filtros.parentesco === 'todos' || card.dataset.parentesco === filtros.parentesco;

    return nomeOk && vinculoOk && parentescoOk;
}

function ordenarCards() {
    const criterios = {
        cadastro: (a, b) => a.dataset.ordem - b.dataset.ordem,
        nome: (a, b) => a.dataset.nome.localeCompare(b.dataset.nome, 'pt-BR'),
        antigo: (a, b) => a.dataset.ano - b.dataset.ano,
        novo: (a, b) => b.dataset.ano - a.dataset.ano,
    };
    // Reinsere antes do card "Adicionar", que fica sempre por último
    [...cards].sort(criterios[ordenar.value]).forEach((c) => lista.insertBefore(c, cardAdicionar));
}

function atualizarLista() {
    ordenarCards();

    let visiveis = 0;
    cards.forEach((card) => {
        const mostrar = passaFiltros(card);
        card.hidden = !mostrar;
        if (mostrar) visiveis++;
    });

    const total = cards.length;
    contagem.textContent =
        visiveis === total
            ? `${total} ${plural(total, 'pessoa cadastrada', 'pessoas cadastradas')}`
            : `Mostrando ${visiveis} de ${total}`;

    semResultados.hidden = visiveis > 0;
}

// ---------- Eventos ----------
formFiltros.addEventListener('submit', (e) => {
    e.preventDefault();
    filtros = {
        titular: filtroTitular.checked,
        dependentes: filtroDependentes.checked,
        parentesco: filtroParentesco.value,
    };
    atualizarLista();
});

btnLimpar.addEventListener('click', () => {
    filtroTitular.checked = true;
    filtroDependentes.checked = true;
    filtroParentesco.value = 'todos';
    busca.value = '';
    filtros = { titular: true, dependentes: true, parentesco: 'todos' };
    atualizarLista();
});

busca.addEventListener('input', atualizarLista);
ordenar.addEventListener('change', atualizarLista);

// Impede clique no "Adicionar pessoa" quando o plano está cheio
cardAdicionar.addEventListener('click', (e) => {
    if (cardAdicionar.classList.contains('cheio')) e.preventDefault();
});

// ---------- Início ----------
atualizarPlano();
atualizarLista();
