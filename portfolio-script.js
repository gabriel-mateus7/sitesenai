// script.js
function mostrarTexto(id) {
    // Esconde todos os textos
    document.querySelectorAll('.texto').forEach(texto => {
        texto.style.display = 'none';
    });
    
    // Mostra o texto específico
    document.getElementById(id).style.display = 'block';
}
const imgs = document.getElementById("img");
const img = document.querySelectorAll("#img img");

let idx = 0;

function carrossel() {
    idx++;
    if (idx > img.length - 1) {
        idx = 0;
    }

    imgs.style.transform = `translateX(${-idx * 500}px)`;
}

setInterval(carrossel, 2000); // 2000 ms = 2 segundos


