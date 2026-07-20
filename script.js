let intervaloCronometro;
let inicioTempo;
let fimTempo;
let palavras = [
    "As linguagens de programação web são utilizadas especificamente em geral.",
    "A verdadeira alegria não é aquela que seu rosto mostra, mas sim a que vive no seu coração e faz você contagiar todo mundo à sua volta.",
    "Você percebe que encontrou a pessoa certa quando olha nos olhos dela",
    "Trazei três pratos de trigo para três tigres tristes comerem. O rato roeu a roupa do Rei de roma, a rainha com raiva resolveu remendar. Num ninho de mafagafos, cinco mafagafinhos há! Quem os desmafagafizá-los, um bom desmafagafizador será."
];
let indicePalavraAtual;
let palavraAtual;
let pontuacao = 0;

function iniciarCronometro() {
    inicioTempo = new Date().getTime();
    intervaloCronometro = setInterval(atualizarCronometro, 1000);
}

function atualizarCronometro() {
    const tempoAtual = new Date().getTime();
    const tempoDecorrido = tempoAtual - inicioTempo;
    const minutos = Math.floor(tempoDecorrido / 60000);
    const segundos = Math.floor((tempoDecorrido % 60000) / 1000);
    document.getElementById('cronometro').innerHTML = formatarNumero(minutos) + ':' + formatarNumero(segundos);
}

function pararCronometro() {
    clearInterval(intervaloCronometro);
    fimTempo = new Date().getTime();
}

function calcularEstatisticas() {
    const quantidadePalavras = palavras[0].split(' ').length;
    const quantidadeCorretas = quantidadePalavras;

    const precisao = (quantidadeCorretas / quantidadePalavras) * 100;
    const minutos = (fimTempo - inicioTempo) / 60000;
    const ppm = Math.round((quantidadePalavras / minutos) || 0);

    document.getElementById('ppm').innerHTML = ppm + ' palavras por minuto';
    document.getElementById('precisao').innerHTML = Math.round(precisao) + '% de precisão';

    let textoResultado = '';
    if (precisao === 100) {
        textoResultado = '<span class="correto">Correto!</span>';
    } else {
        textoResultado = '<span class="incorreto">Incorreto!</span>';
    }

    document.getElementById('resultado').innerHTML = textoResultado;
}

function formatarNumero(numero) {
    return (numero < 10) ? '0' + numero : numero;
}

function obterPalavraAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    return palavras[indiceAleatorio];
}

function atualizarExibicaoPalavra() {
    palavraAtual = obterPalavraAleatoria();
    indicePalavraAtual = 0;
    let palavraExibicao = '';
    for (let i = 0; i < palavraAtual.length; i++) {
        palavraExibicao += '<span>' + palavraAtual[i] + '</span>';
    }
    document.getElementById('texto').innerHTML = palavraExibicao;
}

    document.getElementById('botaoIniciar').addEventListener('click', function() {
    indicePalavraAtual = 0;
    atualizarExibicaoPalavra();
    document.getElementById('textoDigitado').value = '';
    document.getElementById('textoDigitado').disabled = false;
    document.getElementById('textoDigitado').focus();
    document.getElementById('resultado').innerHTML = '';

    document.getElementById('ppm').innerHTML = '0 palavras por minuto';
    document.getElementById('precisao').innerHTML = '0% de precisão';

    iniciarCronometro();
});

    document.getElementById('textoDigitado').addEventListener('input', function() {
    if (!intervaloCronometro) {
        iniciarCronometro();
    }

    const textoDigitado = document.getElementById('textoDigitado').value;
    const palavraExibida = palavraAtual.substr(0, textoDigitado.length);

    let quantidadeCorretas = 0;
    for (let i = 0; i < textoDigitado.length; i++) {
        if (textoDigitado[i] === palavraAtual[i]) {
            quantidadeCorretas++;
            document.getElementById('texto').childNodes[i].className = 'correto';
        } else {
            document.getElementById('texto').childNodes[i].className = 'incorreto';
        }
    }

    if (textoDigitado.length > indicePalavraAtual) {
        document.getElementById('texto').childNodes[indicePalavraAtual].className = '';
        indicePalavraAtual = textoDigitado.length;
        if (indicePalavraAtual < palavraAtual.length) {
            document.getElementById('texto').childNodes[indicePalavraAtual].className = 'atual';
        }
    }

    if (textoDigitado === palavraAtual) {
        pararCronometro();
        document.getElementById('textoDigitado').disabled = true;
        calcularEstatisticas();
        pontuacao++;
        atualizarPontuacao();
    }
});

document.getElementById('textoDigitado').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        pararCronometro();
        document.getElementById('textoDigitado').disabled = true;
        calcularEstatisticas();
        pontuacao++;
        atualizarPontuacao();
    }
});

document.getElementById('textoDigitado').addEventListener('blur', function() {
    const textoDigitado = document.getElementById('textoDigitado').value;

    if (textoDigitado !== '' && !textoDigitado.endsWith(' ')) {
        textoDigitado += ' ';
    }

    if (textoDigitado === palavras[0]) {
        pararCronometro();
        document.getElementById('textoDigitado').disabled = true;
        calcularEstatisticas();
        pontuacao++;
        atualizarPontuacao();
    }
});
function atualizarPontuacao() {
    document.getElementById('placar').innerHTML = 'Pontuação: ' + pontuacao;
}

document.getElementById('reiniciar').addEventListener('click', function() {
    reiniciarJogo();
});

function reiniciarJogo() {
    clearInterval(intervaloCronometro);
    inicioTempo = null;
    fimTempo = null;
    indicePalavraAtual = null;
    palavraAtual = null;
    pontuacao = 0;

    document.getElementById('textoDigitado').value = '';
    document.getElementById('textoDigitado').disabled = true;
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('ppm').innerHTML = '0 palavras por minuto';
    document.getElementById('precisao').innerHTML = '0% de precisão';
    document.getElementById('placar').innerHTML = 'Pontuação: 0';

}