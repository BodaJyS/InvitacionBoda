const tituloCancion = document.querySelector('.reproductor-musica h1');
const nombreArtista = document.querySelector('.reproductor-musica p');

const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');

const inconoControl = document.getElementById('iconoControl');
const botonReproducirPausar = document.querySelector('.controles button.boton-reproducir-pausar');

const canciones = [
    {
        titulo:'A Year Ago',
        nombre:'NEFFEX',
        fuente:'music/A Year Ago - NEFFEX.mp3'
    },
];

let indiceCancionActual = 0;

function actualizarInfoCancion(){
    cancion.src = canciones[indiceCancionActual].fuente;
    cancion.addEventListener('loadeddata',function(){});
};

cancion.addEventListener('loadedmetadata', function(){
    progreso.max = cancion.duration;
    progreso.value = cancion.currentTime;
});

botonReproducirPausar.addEventListener('click', reproducirPausar);

function reproducirPausar(){
    if(cancion.paused){
        reproducirCancion();
    } else {
        pausarCancion();
    }
};

function reproducirCancion(){
    cancion.play();
    inconoControl.classList.add('bi-pause-fill')
    inconoControl.classList.remove('bi-play-fill')
}

function pausarCancion(){
    cancion.pause();
    inconoControl.classList.remove('bi-pause-fill')
    inconoControl.classList.add('bi-play-fill')
}

cancion.addEventListener('timeupdate', function(){
    if(!cancion.paused){
        progreso.value = cancion.currentTime;
    }
});

progreso.addEventListener('input', function(){
    cancion.currentTime = progreso.value;
});

document.addEventListener("DOMContentLoaded", function () {
    const articles = document.querySelectorAll(".fade-article");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible"); // Aplica la clase `visible`
                    observer.unobserve(entry.target); // Deja de observar este elemento
                }
            });
        },
        { threshold: 0.5 } // Activa el efecto cuando el 50% del elemento esté visible
    );

    articles.forEach((article) => observer.observe(article));
});
document.addEventListener("DOMContentLoaded", function () {
    const articles = document.querySelectorAll(".fade-Contenedor");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible"); // Aplica la clase `visible`
                    observer.unobserve(entry.target); // Deja de observar este elemento
                }
            });
        },
        { threshold: 0.01 } // Activa el efecto cuando el 50% del elemento esté visible
    );

    articles.forEach((article) => observer.observe(article));
});

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const carouselItems = document.querySelectorAll(".carousel-item");

    let currentIndex = 0;

    // Abrir modal con la imagen correspondiente
    carouselItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            currentIndex = index;
            const imgSrc = this.getAttribute("data-src");
            modalImage.src = imgSrc;
        });
    });

    // Navegar en el modal
    document.getElementById("modalPrev").addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        modalImage.src = carouselItems[currentIndex].getAttribute("data-src");
    });

    document.getElementById("modalNext").addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        modalImage.src = carouselItems[currentIndex].getAttribute("data-src");
    });
});

const countToDate = new Date("2025-01-25T00:00:00").getTime(); // Fecha objetivo
let previousTimeBetweenDates;

setInterval(() => {
  const currentDate = new Date().getTime();
  const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);
  flipAllCards(timeBetweenDates);

  previousTimeBetweenDates = timeBetweenDates;
}, 250);

function flipAllCards(time) {
  const days = Math.floor(time / (3600 * 24));
  const hours = Math.floor((time % (3600 * 24)) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  flip(document.querySelector("[data-days-tens]"), Math.floor(days / 10));
  flip(document.querySelector("[data-days-ones]"), days % 10);
  flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
  flip(document.querySelector("[data-hours-ones]"), hours % 10);
  flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10));
  flip(document.querySelector("[data-minutes-ones]"), minutes % 10);
  flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10));
  flip(document.querySelector("[data-seconds-ones]"), seconds % 10);
}

function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector(".top");
  const startNumber = parseInt(topHalf.textContent);
  if (newNumber === startNumber) return;

  const bottomHalf = flipCard.querySelector(".bottom");
  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");

  topHalf.textContent = startNumber;
  bottomHalf.textContent = startNumber;
  topFlip.textContent = startNumber;
  bottomFlip.textContent = newNumber;

  topFlip.addEventListener("animationstart", () => {
    topHalf.textContent = newNumber;
  });
  topFlip.addEventListener("animationend", () => {
    topFlip.remove();
  });
  bottomFlip.addEventListener("animationend", () => {
    bottomHalf.textContent = newNumber;
    bottomFlip.remove();
  });
  flipCard.append(topFlip, bottomFlip);
}

actualizarInfoCancion();