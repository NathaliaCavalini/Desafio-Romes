//Feita pela aluna Nathália Luísa e Lucas Hipólito

let nomeJogador = "";
let pontos = 0;
let fase = 1;
let cartasViradas = [];
let cartasSelecionadas = [];
let maxFases = 10;

function iniciarJogo() {
  const nomeInput = document.getElementById('nickname').value;
  if (!nomeInput) return alert("Digite seu nome!");
  nomeJogador = nomeInput;

  document.getElementById("tela-inicial").classList.add("escondido");
  document.getElementById("tela-jogo").classList.remove("escondido");
  document.getElementById("boas-vindas").textContent = `Boa sorte, ${nomeJogador}!`;

  iniciarFase();
}

function iniciarFase() {
  document.getElementById("fase-atual").textContent = fase;
  let tabuleiro = document.getElementById("tabuleiro");
  tabuleiro.innerHTML = "";

  // Define o número de pares por fase
  let numPares = Math.min(4 + fase, 10); // Começa com 5 pares, máximo 10

  // Criar pares de cartas (usando emojis como exemplo)
  const emojis = ['🍌','🍍','🥥','🌴','🦜','🐒','🦎','🪲','🐠','🐚'];
  let cartas = [];
  for (let i = 0; i < numPares; i++) {
    cartas.push(emojis[i], emojis[i]);
  }

  // Embaralhar
  cartas.sort(() => Math.random() - 0.5);

  // Definir grid dinamicamente
  let colunas = Math.ceil(Math.sqrt(cartas.length));
  tabuleiro.style.gridTemplateColumns = `repeat(${colunas}, 80px)`;

  // Criar cartas no DOM
  cartas.forEach((emoji, index) => {
    let carta = document.createElement("div");
    carta.classList.add("card");
    carta.dataset.valor = emoji;
    carta.dataset.index = index;
    carta.addEventListener("click", virarCarta);
    tabuleiro.appendChild(carta);
  });

  cartasViradas = [];
}

function virarCarta(e) {
  const carta = e.currentTarget;
  const valor = carta.dataset.valor;
  const index = carta.dataset.index;

  if (cartasViradas.includes(index) || cartasSelecionadas.length === 2) return;

  carta.textContent = valor;
  carta.classList.add("revelada");
  cartasSelecionadas.push({ carta, valor, index });

  if (cartasSelecionadas.length === 2) {
    const [c1, c2] = cartasSelecionadas;
    if (c1.valor === c2.valor) {
      pontos += 100;
      cartasViradas.push(c1.index, c2.index);
      cartasSelecionadas = [];

      if (cartasViradas.length === document.querySelectorAll('.card').length) {
        setTimeout(proximaFase, 1000);
      }
    } else {
      pontos -= 125;
      setTimeout(() => {
        c1.carta.textContent = "";
        c2.carta.textContent = "";
        c1.carta.classList.remove("revelada");
        c2.carta.classList.remove("revelada");
        cartasSelecionadas = [];
      }, 1000);
    }
    document.getElementById("pontuacao").textContent = pontos;
  }
}

function proximaFase() {
  fase++;
  if (fase > maxFases) {
    mostrarResultadoFinal();
  } else {
    iniciarFase();
  }
}

function mostrarResultadoFinal() {
  document.getElementById("tela-jogo").classList.add("escondido");
  document.getElementById("tela-final").classList.remove("escondido");

  let mensagem = "";
  if (pontos >= 900) {
    mensagem = "🦸 Meu herói não usa capa... Ele ZERA O JOGO DA MEMÓRIA!!!";
  } else if (pontos >= 600) {
    mensagem = "😐 É... Aceitável...";
  } else {
    mensagem = "🐟 Tu é um peixe Betta.";
  }

  document.getElementById("mensagem-final").textContent = mensagem;
  document.getElementById("pontuacao-final").textContent = pontos;
}

function reiniciar() {
  pontos = 0;
  fase = 1;
  document.getElementById("pontuacao").textContent = 0;
  document.getElementById("tela-final").classList.add("escondido");
  document.getElementById("tela-jogo").classList.remove("escondido");
  iniciarFase();
}
