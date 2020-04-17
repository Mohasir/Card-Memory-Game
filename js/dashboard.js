let pathImages = ['img/cards/card-back.png',
    'img/cards/card-black-panther.png',
    'img/cards/card-black-widow.png',
    'img/cards/card-gog.png',
    'img/cards/card-hulk.png',
    'img/cards/card-iron-man.png',
    'img/cards/card-scarlet-witch.png',
    'img/cards/card-shield.png',
    'img/cards/card-spiderman.png']


let btnReplay = document.querySelectorAll('.btn-replay');
let card = document.querySelectorAll('.card');
let timer = document.querySelectorAll('.timer');
//let movements = document.querySelector('.movements');
let popupWin = document.querySelector('.cont-popup')
let scroll = document.querySelector('body')
let images = [], as = [];
let pairs = 0, interval;

window.addEventListener('load', () => {
    startGame();
});


btnReplay.forEach((el) => {
    el.addEventListener('click', () => {
        startGame();
        popupWin.style.display = 'none';
        scroll.style.overflowY = 'scroll';
        card.forEach((element) => element.src = pathImages[0]);
    });
})


// agrega a cada elemento 'card' el evento 'click' para mostrar la carta
card.forEach((element, i) => {
    element.addEventListener('click', () => {
        if (element.src.includes(pathImages[0])) {
            if (as.length < 2) {
                element.src = images[i];
                anime({
                    targets: element,
                    scale: [0, 1],
                    easing: 'easeOutExpo',
                    duration: 500
                });
                as.push(element)
                if (as.length == 2) {
                    matching(as)  
                }
            }
        }
    });
});


// funcion retorna un 'array' con las rutas de las imagenes de forma aleatoria
const getPathRandom = (n) => {
    var array = []
    while (array.length < n) {
        var pathImg = pathImages[Math.ceil(Math.random() * n)];//guarda la ruta de una imagen de forma aleatoria
        //verifica si en el array ya existe la ruta de la imagen
        //si no exite agrega la ruta de la imagen al array
        if (!array.includes(pathImg)) array[array.length] = pathImg;
    }
    return array = array.concat(array).sort(() => (Math.random() - 0.5)) //duplica el array y desordena los elementos
}

//funcion para comprobar si se econtro el par de la tarjeta
const matching = (ar) => {
    if (ar[0].src === ar[1].src) { //comprueba si el par son iguales
        anime({
            targets: ar,
            scale: [1, 0],
            easing: 'easeOutExpo',
            duration: 500
        });

        //cuando se encuentra todos los pares se muestra el popup
        if (pairs == 8) {
            popupWin.style.display = 'flex';
            scroll.style.overflowY = 'hidden';
            clearInterval(interval)
        }

        pairs++
        //movements.textContent = parseInt(movements.textContent) + 1
        as = [];
    } else {   // si no son iguales se voltean las tarjetas
        window.setTimeout(() => {
            as.forEach((el) => el.src = pathImages[0])
            anime({
                targets: as,
                scale: [0, 1],
                easing: 'easeOutBounce',
                duration: 500
            });
            as = [];
            //movements.textContent = parseInt(movements.textContent) + 1
        }, 500);
    }
}

//reinicia el juego y vuelve a colocar las tarjetas de forma aletoria
const startGame = () => {
    anime({
        targets: '.dashboard-card .card',
        scale: [
            { value: .1, easing: 'easeOutSine', duration: 500 },
            { value: 1, easing: 'easeInOutQuad', duration: 1000 }
        ],
        delay: anime.stagger(200, { grid: [4, 4], from: 'center' }),
    });
    //movements.textContent = 0;
    pairs = 0;
    images = getPathRandom(8);
    console.log(images)
    startTimer();
}

//funcion para iniciar el cronometro
const startTimer = () => {
    var s = 0, m = 0
    var second = '', minute = '';
    clearInterval(interval)
    interval = window.setInterval(() => {
        if (s == 60) {
            s = 0;
            m++;
        }

        (s < 10) ? second = `0${s++}` : second = `${s++}`;
        (m < 10) ? minute = `0${m}` : minute = `${m}`;

        timer.forEach((el) => el.textContent = `${minute}:${second}`)

    }, 1000);
}

