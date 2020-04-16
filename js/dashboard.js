

let pathImages = ['img/cards/card-back.png',
    'img/cards/card-black-panther.png',
    'img/cards/card-black-widow.png',
    'img/cards/card-gog.png',
    'img/cards/card-hulk.png',
    'img/cards/card-iron-man.png',
    'img/cards/card-scarlet-witch.png',
    'img/cards/card-shield.png',
    'img/cards/card-spiderman.png']


let btnReplay = document.getElementById('btn-replay');
let card = document.querySelectorAll('.card');
let timer = document.getElementById('timer');
let popupWin = document.querySelector('.cont-popup')
let scroll = document.querySelector('body')
let images = [];
let as = []
let contador = 1

window.addEventListener('load', () => {
    anime({
        targets: '.dashboard-card .card',
        scale: [
            { value: .1, easing: 'easeOutSine', duration: 500 },
            { value: 1, easing: 'easeInOutQuad', duration: 1000 }
        ],
        delay: anime.stagger(200, { grid: [4, 4], from: 'center' }),
    });
    images = getPathRandom(8)
});

btnReplay.addEventListener('click', () => {
    anime({
        targets: '.dashboard-card .card',
        scale: [
            { value: .1, easing: 'easeOutSine', duration: 500 },
            { value: 1, easing: 'easeInOutQuad', duration: 1200 }
        ],
        delay: anime.stagger(200, { grid: [4, 4], from: 'center' })
    });

    popupWin.style.display = 'none';
    scroll.style.overflowY = 'scroll';
    card.forEach((element) => element.src = pathImages[0]);
    images = getPathRandom(8);
});



// funcion retorna el 'array' con las rutas de las imagenes de forma aleatoria
const getPathRandom = (n) => {
    var ar1 = [], ar2 = []
    while ((ar1.length) < n & (ar2.length < n)) {
        var pathImg = pathImages[Math.ceil(Math.random() * n)];//guarda la ruta de una imagen de forma aleatoria
        //verifica si en el array ya existe la ruta de la imagen
        //si no exite agrega la ruta de la imagen al array
        if (!ar1.includes(pathImg)) ar1[ar1.length] = pathImg;
        if (!ar2.includes(pathImg)) ar2[ar2.length] = pathImg;
    }
    console.log(1)
    return array = ar1.concat(ar2).sort(() => (Math.random() - 0.5))

}

/* const getPathRandom = (n,array) => {
    while (array.length < n) {
        var pathImg = pathImages[Math.ceil(Math.random() * n)];
        if (!array.includes(pathImg)) array[array.length] = pathImg;
    }
}  */


// agrega a cada elemento 'card' el evento 'click' para mostrar la carta
card.forEach((element, i) => {
    element.addEventListener('click', () => {
        if (element.src.includes(pathImages[0])) {
            element.src = images[i];
            anime({
                targets: element,
                scale: [0, 1],
                easing: 'easeOutExpo',
                duration: 500
            });
            as.push(element)
            if (as.length == 2) {
                if (as[0].src === as[1].src) {
                    //as.forEach((el) => el.style.border = 'solid red 2px')
                    anime({
                        targets: as,
                        scale: [1,0],
                        easing: 'easeOutExpo',
                        duration: 500
                    });

                    if(contador == 1){
                        popupWin.style.display = 'flex';
                        scroll.style.overflowY = 'hidden';
                    }

                    contador++
                    as = [];
                } else {
                    window.setTimeout(() => {
                        as.forEach((el) => el.src = pathImages[0])
                        anime({
                            targets: as,
                            scale: [0, 1],
                            easing: 'easeOutBounce',
                            duration: 500
                        });
                        as = [];
                    }, 500);
                }

            }
        } else {
            element.src = pathImages[0];
            anime({
                targets: element,
                scale: [0, 1],
                easing: 'easeOutBounce',
                duration: 500
            });
        }
    });
});




const startTimer = () => {
    second = 50
    minute = 0

    var t = window.setInterval(() => {
        if (second == 60) {
            second = 0;
            minute++;
        }
        timer.textContent = `${minute}:${second++}`;
    }, 1000);
}


/* function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
} */