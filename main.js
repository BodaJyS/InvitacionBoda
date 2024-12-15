// --- VARIABLES GLOBALES PARA REPRODUCTOR ---
const tituloCancion = document.querySelector('.reproductor-musica h1');
const nombreArtista = document.querySelector('.reproductor-musica p');
const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');
const inconoControl = document.getElementById('iconoControl');
const botonReproducirPausar = document.querySelector('.controles button.boton-reproducir-pausar');

// Lista de canciones
const canciones = [
    {
        fuente: 'music/TusOjitos.mp3'
    },
];

// Estado inicial
let indiceCancionActual = 0;

// --- FUNCIONES PARA REPRODUCTOR ---
function actualizarInfoCancion() {
    cancion.src = canciones[indiceCancionActual].fuente;
}

function reproducirPausar() {
    if (cancion.paused) {
        reproducirCancion();
    } else {
        pausarCancion();
    }
}

function reproducirCancion() {
    cancion.play();
    inconoControl.classList.add('bi-pause-fill');
    inconoControl.classList.remove('bi-play-fill');
}

function pausarCancion() {
    cancion.pause();
    inconoControl.classList.remove('bi-pause-fill');
    inconoControl.classList.add('bi-play-fill');
}

// --- EVENTOS PARA REPRODUCTOR ---
cancion.addEventListener('loadedmetadata', function () {
    progreso.max = cancion.duration;
    progreso.value = cancion.currentTime;
});

cancion.addEventListener('timeupdate', function () {
    if (!cancion.paused) {
        progreso.value = cancion.currentTime;
    }
});

progreso.addEventListener('input', function () {
    cancion.currentTime = progreso.value;
});

botonReproducirPausar.addEventListener('click', reproducirPausar);

// --- FUNCIONES PARA INTERSECTION OBSERVER ---
function iniciarIntersectionObserver(clase, threshold = 0.5) {
    const elements = document.querySelectorAll(clase);

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: threshold }
    );

    elements.forEach((element) => observer.observe(element));
}
function iniciarIntersectiondiv(clase, threshold = 0.5) {
    const elements = document.querySelectorAll(clase);

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: threshold }
    );

    elements.forEach((element) => observer.observe(element));
}

// --- FUNCIONES PARA MODAL ---
function iniciarModal() {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const carouselItems = document.querySelectorAll(".imgCar");
    let currentIndex = 0;

    carouselItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            currentIndex = index;
            const imgSrc = this.getAttribute("data-src");
            modalImage.src = imgSrc;
        });
    });

    document.getElementById("modalPrev").addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        modalImage.src = carouselItems[currentIndex].getAttribute("data-src");
    });

    document.getElementById("modalNext").addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        modalImage.src = carouselItems[currentIndex].getAttribute("data-src");
    });
}

// --- FUNCIONES PARA TEMPORIZADOR ---
function iniciarTemporizador() {
    const countToDate = new Date("2025-01-04T16:30:00").getTime();

    setInterval(() => {
        const currentDate = new Date().getTime();
        const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);
        flipAllCards(timeBetweenDates);
    }, 250);
}

// --- INICIALIZACIONES ---
document.addEventListener("DOMContentLoaded", function () {
    // Reproductor de música
    actualizarInfoCancion();

    // Intersection Observer
    iniciarIntersectionObserver(".fade-article", 0.1);
    iniciarIntersectiondiv(".fade-Contenedor", 0);

    // Modal
    iniciarModal();

    // Temporizador
    iniciarTemporizador();
});

// --- FUNCIONES PARA TEMPORIZADOR ---
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
function toggleNumberSelect() {
    const asistenciaSelect = document.getElementById("asistencia");
    const numeroContainer = document.getElementById("numeroContainer");
    if (asistenciaSelect.value === "si") {
      numeroContainer.style.display = "block";
    } else {
      numeroContainer.style.display = "none";
    }
}
document.addEventListener('DOMContentLoaded', () => {
    // Obtén la instancia del carrusel
    const carousel = bootstrap.Carousel.getOrCreateInstance(document.getElementById('carouselExample'));

    // Realiza tres desplazamientos al cargar
    const totalSlides = 6; // Número de slides a recorrer
    let count = 0;

    const preloadInterval = setInterval(() => {
        carousel.next(); // Desplaza al siguiente slide
        count++;
        if (count >= totalSlides) {
            clearInterval(preloadInterval); // Detén el desplazamiento tras recorrer todos los slides
            carousel.to(0); // Regresa al primer slide
            carousel.cycle(); // Inicia el carrusel automático
        }
    }, 50); // Intervalo rápido para recorrer los slides
});

const invitaciones = [
    { nombre: "Familia Pinto Chávez", totalInvitados: 7 },
    { nombre: "Lizbeth Pinto", totalInvitados: 2 },
    { nombre: "Sergio y Karina", totalInvitados: 2 },
    { nombre: "Yessenia Pinto", totalInvitados: 1 },
    { nombre: "Esposos Martínez Hernández", totalInvitados: 2 },
    { nombre: "Andrea Linares e Hijos", totalInvitados: 3 },
    { nombre: "Familia Hernández Linares", totalInvitados: 3 },
    { nombre: "Esposos Linares Méndez", totalInvitados: 2 },
    { nombre: "Sergio y Caroll", totalInvitados: 2 },
    { nombre: "Familia Méndez González", totalInvitados: 4 },
    { nombre: "Familia Calderón Méndez", totalInvitados: 4 },
    { nombre: "Haroldo Méndez", totalInvitados: 1 },
    { nombre: "Gladys Tello", totalInvitados: 1 },
    { nombre: "Lizardo y Ana", totalInvitados: 2 },
    { nombre: "Esposos Mijangos Soto", totalInvitados: 2 },
    { nombre: "Felipe Villatoro y Pareja", totalInvitados: 2 },
    { nombre: "Esposos Orellana Sagastume", totalInvitados: 2 },
    { nombre: "Sergio Villatoro y Pareja", totalInvitados: 2 },
    { nombre: "Erick Martínez y Pareja", totalInvitados: 2 },
    { nombre: "André Alvarado y Pareja", totalInvitados: 2 },
    { nombre: "Esposos Herrera Galindo", totalInvitados: 2 },
    { nombre: "Hugo Cajas y Esposa", totalInvitados: 2 },
    { nombre: "Gladys de Rosario", totalInvitados: 1 },
    { nombre: "Fraulen Valdez", totalInvitados: 1 },
    { nombre: "Karen Zarate", totalInvitados: 1 },
    { nombre: "Rodrigo Blanco", totalInvitados: 1 },
    { nombre: "Esposos Saenz Figueroa", totalInvitados: 2 },
    { nombre: "Dulce Velásquez", totalInvitados: 1 },
    { nombre: "Familia Hidalgo Figueroa", totalInvitados: 4 },
    { nombre: "Familia Agustín Argueta", totalInvitados: 3 },
    { nombre: "Nelson y Maritza", totalInvitados: 2 },
    { nombre: "Leonardo y Sulma", totalInvitados: 2 },
    { nombre: "Familia Agustín Carrillo", totalInvitados: 3 },
    { nombre: "Sandra Carrillo e hijos", totalInvitados: 3 },
    { nombre: "Julia Alva", totalInvitados: 1 },
    { nombre: "Jorge y Leticia", totalInvitados: 3 },
    { nombre: "Jissel Ola y Pareja", totalInvitados: 2 },
    { nombre: "Luis Godínez y Pareja", totalInvitados: 2 },
    { nombre: "Familia Valdéz Pérez", totalInvitados: 3 },
    { nombre: "María Figueroa", totalInvitados: 1 },
    { nombre: "Arcadio y Meli", totalInvitados: 2 },
    { nombre: "Gustavo Laing y Pablo Choz", totalInvitados: 2 },
    { nombre: "Brayan y Jaqueline", totalInvitados: 2 },
    { nombre: "Juana Figueroa", totalInvitados: 1 },
    { nombre: "Reyna y Nivia", totalInvitados: 3 },
    { nombre: "Poncia Saldivar y Mayly Figueroa", totalInvitados: 2 },
    { nombre: "Jorge Figueroa y Doris", totalInvitados: 2 },
    { nombre: "Brayan Girón y Pareja", totalInvitados: 2 },
    { nombre: "Odilia Leiva y Pareja", totalInvitados: 2 },
    { nombre: "Hno. Osmar Tello y Sra", totalInvitados: 2 },
    { nombre: "Jenniffer Mcklen", totalInvitados: 1 },
    { nombre: "Alexander Figueroa y Amarilis Pérez", totalInvitados: 2 },
    { nombre: "Tony Figueroa", totalInvitados: 1 },
    { nombre: "David y Alejandra", totalInvitados: 2 }
];

const urlParams = new URLSearchParams(window.location.search);
const numeroInvitacion = parseInt(urlParams.get("i")); // Obtén el número de invitación desde la URL

if (numeroInvitacion > 0 && numeroInvitacion <= invitaciones.length) {
    const invitacionSeleccionada = invitaciones[numeroInvitacion - 1];
    document.getElementById("nombreInvitado").value = invitacionSeleccionada.nombre;
    document.getElementById("idInvitado").value = numeroInvitacion;
    let Trato = "tu";
    if (invitacionSeleccionada.totalInvitados > 1) { 
        Trato = "su";
    }
    document.getElementById("mensaje").textContent = `Hola! ${invitacionSeleccionada.nombre},  para organizarnos mejor, nos encantaría ${Trato} confirmación a más tardar el día 18 de diciembre de 2024.`;
    const numeroSelect = document.getElementById("numero");
    numeroSelect.innerHTML = '<option value="">Selecciona el número de invitados</option>';
    
    for (let i = 1; i <= invitacionSeleccionada.totalInvitados; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        numeroSelect.appendChild(option);
    }
} else {
    document.getElementById("mensaje").textContent = "Queridos amigos y familia, nos sería de gran utilidad, para organizarnos mejor, su confirmación a más tardar el día 18 de diciembre.";
}

var form = document.getElementById('sheetdb-form');
form.addEventListener("submit", e => {
    // Prevenir el envío por defecto del formulario
    e.preventDefault();

    // Verificar si el usuario ha seleccionado "No asistiré"
    const asistencia = document.getElementById('asistencia').value;
    if (asistencia === 'no') {
        // Si selecciona "No asistiré", se pone el valor de número de invitados en 0
        document.getElementById('numero').value = '0';
    }

    // Validar que se haya seleccionado una opción en el primer select
    if (!asistencia) {
        alert('Por favor, selecciona una opción en el campo "¿Podrás asistir a nuestra celebración?"');
        return;
    }

    // Validar que el número de asistentes haya sido seleccionado si la opción es "Sí"
    const numeroInvitados = document.getElementById('numero').value;
    if (asistencia === 'si' && !numeroInvitados) {
        alert('Por favor, selecciona el número de asistentes.');
        return;
    }

    // Verificar que los campos ocultos de nombre e ID no estén vacíos
    const nombreInvitado = document.getElementById('nombreInvitado').value;
    const idInvitado = document.getElementById('idInvitado').value;
    if (!nombreInvitado || !idInvitado) {
        alert('No se ha seleccionado un invitado válido. Por favor, revisa tus datos.');
        return;
    }

    // Si todas las validaciones pasaron, enviar el formulario
    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
    })
    .then(response => {
        if (response.ok) {
            // Si la respuesta es exitosa, mostrar el alert
            const modalElement = document.getElementById('exampleModal');
        const modal = new bootstrap.Modal(modalElement);

        // Mostrar el modal
        modal.show();
        } else {
            // Si hubo un error en la respuesta
            alert('Hubo un error al enviar el formulario, por favor inténtalo de nuevo.');
        }
    })
    .catch(error => {
        // Manejo de errores de red
        alert('Hubo un problema con la solicitud. Inténtalo nuevamente.');
        console.error('Error:', error);
    });
});
