const listaCenarios = [
    {
        texto: "Um vídeo de um líder político declarando guerra surge na internet. Ao olhar de perto, o movimento dos lábios dele não bate perfeitamente com o áudio e a iluminação do rosto muda de repente.",
        resposta: "deepfake",
        explicacao: "Correto! Bordas embaçadas no rosto, falhas na sincronia da boca e falta de piscadas naturais são indícios clássicos de simulação por IA."
    },
    {
        texto: "Uma transmissão ao vivo oficial feita por uma grande emissora de TV exibe um especialista dando dicas de segurança digital em um estúdio físico real.",
        resposta: "real",
        explicacao: "Muito bem! Fontes jornalísticas consolidadas e transmissões ao vivo checadas são canais seguros de informação."
    },
    {
        texto: "Um áudio atribuído a um influenciador famoso circula no WhatsApp pedindo transferências de dinheiro urgente, mas o tom de voz parece robótico e sem pausas para respirar.",
        resposta: "deepfake",
        explicacao: "Isso mesmo! A clonagem de voz por IA frequentemente peca na entonação natural, ritmo e respiração humana."
    }
];

let indiceAtual = 0;
let pontuacao = 0;

const btnAcessibilidade = document.getElementById('btn-acessibilidade');
const textoCenario = document.getElementById('texto-cenario');
const formJogo = document.getElementById('form-jogo');
const painelJogo = document.getElementById('painel-jogo');
const feedbackJogo = document.getElementById('feedback-jogo');
const textoFeedback = document.getElementById('texto-feedback');
const btnProximo = document.getElementById('btn-proximo');
const displayPontos = document.getElementById('pontos');

btnAcessibilidade.addEventListener('click', () => {
    const temaAtivo = document.documentElement.getAttribute('data-theme');
    if (temaAtivo === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        btnAcessibilidade.textContent = 'Modo Escuro';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        btnAcessibilidade.textContent = 'Modo Claro';
    }
});

function carregarDesafio() {
    if (indiceAtual < listaCenarios.length) {
        textoCenario.textContent = listaCenarios[indiceAtual].texto;
        formJogo.reset();
        feedbackJogo.classList.add('hidden');
        formJogo.classList.remove('hidden');
    } else {
        painelJogo.classList.add('hidden');
        feedbackJogo.classList.remove('hidden');
        btnProximo.classList.add('hidden');
        textoFeedback.innerHTML = `<h3>Fim de Jogo!</h3><p>Sua pontuação final foi de <strong>${pontuacao} de ${listaCenarios.length}</strong> acertos.</p>`;
    }
}

formJogo.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const respostaUsuario = formJogo.elements['escolha'].value;
    const cenarioAtual = listaCenarios[indiceAtual];
    
    formJogo.classList.add('hidden');
    feedbackJogo.classList.remove('hidden');
    
    if (respostaUsuario === cenarioAtual.resposta) {
        pontuacao++;
        displayPontos.textContent = pontuacao;
        textoFeedback.textContent = "✅ " + cenarioAtual.explicacao;
    } else {
        textoFeedback.textContent = "❌ Errado. " + cenarioAtual.explicacao;
    }
});

btnProximo.addEventListener('click', () => {
    indiceAtual++;
    carregarDesafio();
});

carregarDesafio();
