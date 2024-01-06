//Constantes getElementById iniciarJuego()
const contenedorTarjetas = document.getElementById("contenedorTarjetas");

//Constantes getElementById ocultarOagregarSecciones()
const seleccionAtaque = document.getElementById("attackSelect");
const mensajes = document.getElementById("messagesContent");
const volverJugar = document.getElementById("footer");
const seccionSelecionMascota = document.getElementById("petSelect");
const backgroundBody = document.getElementById("main");

//Constantes getElementById seleccionarMascotaJugador()
const botonSelecionarMascota = document.getElementById("select-pet-button");
const nombreMascotaJugador = document.getElementById("playerPetName");

//Constantes getElementByID oderesMascotas()
const contenedorBotonesAtaque = document.getElementById("content-button");

//Constantes getElementByID seleccionarMascotaEnemiga()
const nombreMascotaEnemiga = document.getElementById("enemyPetName");

//Constantes getElementByID mensajesDeAtaques()
const mensajesBatallaJugador = document.getElementById("playerContentBattle");
const mensajesBatallaEnemigo = document.getElementById("enemyContentBattle");
const resultados = document.getElementById("resultado");

//Constantes getElementByID ResultadoBatalla()
const jugadorVidas = document.getElementById("playerLives");
const enemigoVidas = document.getElementById("enemyLives");

//Constantes getElementByID reiniciarJuego()
const botonReiniciar = document.getElementById("restart");

//Constantes getElementByID ganador()
const mensajeFinal = document.getElementById("messagesContent");

//Constante getElementByID MAPA "Canvas"
const contenedorMapa = document.getElementById("map-section");
const contenedorMovimientoBotones = document.getElementById(
  "contenedorBotonesMovimiento"
);
const mapa = document.getElementById("map");

//Variables del Canvas
let lienzo = mapa.getContext("2d");
let numeroMascota;
let botonesMovimiento = [];
let botonesMovimientoMokepones = [];
let idBotonesMovimiento = [];
let intervalo;
let nombreMascotaObjeto;
const mapaBackgroud = new Image();
mapaBackgroud.src = "./images/mokemap.webp";

let vidasJugador = 3;
let vidasEnemigo = 3;

//Variables iniciarJuego() y seleccionarMascotaJugador()
let mascotaHipodoge;
let mascotaCapipepo;
let mascotaRatigueya;
let opcionDeMokepones;
let nombreMascotaSeleccionadaJugador;
let nombreMascotaSeleccionadaEnemigo;
let objetoMascotaEnemigo;
let objetoMascotaSeleccionadaJugador;
let idMokepones = [];

//Variables poderesMascotaJugador()
let ataquesMascota;
let ataquesBotones;
let seleccionarAtaquesBotones;
let arrayAtaquesMokepones = [];

//Variables mensajesDeAtaques()
let ataqueSeleccionadoJugador;
let ataqueSeleccionadoEnemigo;

//Variable resultadoBatalla()
let resultado;
let quienGano;

//Array para guardar los mokepones con sus atributos
let mokepones = [];
let mokeponesEnemigos = [];
//Array para guardar los botones de los mokepones
let botonesAtaqueMokepones = [];

// Creo una clase mokepon
class Mokepon {
  constructor(nombre, foto, vida, caraMokepon, x, y) {
    //Construyo un objeto con atributos
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    //Atributos del Canvas
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 40;
    this.mokeponFoto = new Image();
    this.mokeponFoto.src = caraMokepon;
    this.mokeponVelocidadX = 0;
    this.mokeponVelocidadY = 0;
  }
  crearMokepon() {
    lienzo.drawImage(this.mokeponFoto, this.x, this.y, this.h, this.w);
  }
}
//Asigno los primeros 3 atributos a la clase Mokepon
// (Nombre, Foto, Vida)
let hipodoge = new Mokepon(
  "Hipodoge",
  "./images/HIPODOGE.png",
  vidasJugador,
  "./images/HIPODOGECARA.png",
  35,
  30
);
let capipepo = new Mokepon(
  "Capipepo",
  "./images/CAPIPEPO.png",
  vidasJugador,
  "./images/CAPIPEPOCARA.png",
  35,
  30
);
let ratigueya = new Mokepon(
  "Ratigueya",
  "./images/RATIGUEYA1.png",
  vidasJugador,
  "./images/RATIGUEYA1CARA.png",
  35,
  30
);

let hipodogeEnemigo = new Mokepon(
  "Hipodoge",
  "./images/HIPODOGE.png",
  vidasJugador,
  "./images/HIPODOGECARA.png",
  aleatorio(270, 0),
  aleatorio(190, 75)
);
let capipepoEnemigo = new Mokepon(
  "Capipepo",
  "./images/CAPIPEPO.png",
  vidasJugador,
  "./images/CAPIPEPOCARA.png",
  aleatorio(270, 0),
  aleatorio(190, 75)
);
let ratigueyaEnemigo = new Mokepon(
  "Ratigueya",
  "./images/RATIGUEYA1.png",
  vidasJugador,
  "./images/RATIGUEYA1CARA.png",
  aleatorio(270, 0),
  aleatorio(190, 75)
);

//Asigno los ataques de los mokepones como atributos a la clase Mokepon
hipodoge.ataques.push(
  { nombre: "FUEGO 🔥", id: "fire-button" },
  { nombre: "AGUA 💧", id: "water-button" },
  { nombre: "TIERRA 🌿", id: "land-button" }
);
capipepo.ataques.push(
  { nombre: "FUEGO 🔥", id: "fire-button" },
  { nombre: "AGUA 💧", id: "water-button" },
  { nombre: "TIERRA 🌿", id: "land-button" }
);
ratigueya.ataques.push(
  { nombre: "FUEGO 🔥", id: "fire-button" },
  { nombre: "AGUA 💧", id: "water-button" },
  { nombre: "TIERRA 🌿", id: "land-button" }
);

//Con el método push indexo los atributos dentro de un array y se
//guardan en la clase moketon en el objeto de ataques
mokepones.push(hipodoge, capipepo, ratigueya);
mokeponesEnemigos.push(hipodogeEnemigo, capipepoEnemigo, ratigueyaEnemigo);

function inicioJuego() {
  ocultarOagregarSecciones();
  mokepones.forEach((Mokepon) => {
    opcionDeMokepones = `
            <input name="mascota" id=${Mokepon.nombre} type="radio">
            <label for=${Mokepon.nombre}>
                <img src=${Mokepon.foto}>
                <p>${Mokepon.nombre}</p>
            </label>
        `;
    //Agrego el HTML con JS
    contenedorTarjetas.innerHTML += opcionDeMokepones;
  });

  mokepones.forEach((Mokepon) => {
    arrayMokepones = document.getElementById(Mokepon.nombre);
    idMokepones.push(arrayMokepones);
  });

  idMokepones.forEach((Mokepon) => {
    Mokepon.addEventListener("click", (e) => {
      if (e.target.checked) {
        nombreMascotaSeleccionadaJugador = e.target.id;
      }
    });
  });

  botonSelecionarMascota.addEventListener("click", seleccionarMascotaJugador);
  botonSelecionarMascota.addEventListener("click", ocultarOagregarSecciones);
  botonReiniciar.addEventListener("click", reiniciarJuego);
}

function ocultarOagregarSecciones() {
  if (nombreMascotaSeleccionadaJugador == undefined) {
    //Secciones a ocultar
    seleccionAtaque.style.display = "none";
    mensajes.style.display = "none";
    volverJugar.style.display = "none";
    contenedorMapa.style.display = "none";
    mapa.style.display = "none";

    //Secciones a mostrar
    seccionSelecionMascota.style.display = "flex";
  } else if (nombreMascotaSeleccionadaJugador != undefined) {
    //Secciones a mostrar
    backgroundBody.style.backgroundImage = "url(./images/BackgroundNight.jpg)";
    contenedorMapa.style.display = "flex";
    mapa.style.display = "flex";
    intervalo = setInterval(creacionMapa, 50);
    window.addEventListener("keydown", teclaPresionada);
    window.addEventListener("keyup", detenerMovimiento);

    //Secciones a ocultar
    seccionSelecionMascota.style.display = "none";
  }
}

function seleccionarMascotaJugador() {
  if (nombreMascotaSeleccionadaJugador == undefined) {
    alert("No has seleccionado una MASCOTA");
  }

  for (let index = 0; index < mokepones.length; index++) {
    if (nombreMascotaSeleccionadaJugador == mokepones[index].nombre) {
      nombreMascotaJugador.innerHTML = mokepones[index].nombre;
      objetoMascotaSeleccionadaJugador = mokepones[index];
    }
  }
  poderesMascotaJugador(nombreMascotaSeleccionadaJugador);
  //seleccionarMascotaEnemiga()
  seleccionarPoderesMascotaJugador();
}
/*
function seleccionarMascotaEnemiga() {
    let mascotaEnemigaAleatoria = aleatorio(mokepones.length - 1, 0)
    nombreMascotaSeleccionadaEnemigo = mokepones[mascotaEnemigaAleatoria].nombre
    nombreMascotaEnemiga.innerHTML =  mokepones[mascotaEnemigaAleatoria].nombre 
}
*/
function poderesMascotaJugador(nombreMascotaSeleccionadaJugador) {
  mokepones.forEach((Mokepon) => {
    if (nombreMascotaSeleccionadaJugador === Mokepon.nombre) {
      ataquesMascota = Mokepon.ataques;
    }
  });
  ataquesMascota.forEach((ataquesMascota) => {
    ataquesBotones = `
            <button class="botonAtaque" id=${ataquesMascota.id}>${ataquesMascota.nombre}</button>
        `;
    contenedorBotonesAtaque.innerHTML += ataquesBotones;
  });
  botonesAtaqueMokepones = document.querySelectorAll(".botonAtaque");
}
function poderesMacotaEnemigo() {
  let ataqueAleatorioEnemigo = aleatorio(mokepones.length - 1, 0);
  ataqueSeleccionadoEnemigo =
    mokepones[ataqueAleatorioEnemigo].ataques[ataqueAleatorioEnemigo].nombre;
}

function seleccionarPoderesMascotaJugador() {
  let i = 0;
  botonesAtaqueMokepones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "FUEGO 🔥") {
        ataqueSeleccionadoJugador = e.target.textContent;
        console.log(ataqueSeleccionadoJugador);
      } else if (e.target.textContent === "AGUA 💧") {
        ataqueSeleccionadoJugador = e.target.textContent;
        console.log(ataqueSeleccionadoJugador);
      } else if (e.target.textContent === "TIERRA 🌿") {
        ataqueSeleccionadoJugador = e.target.textContent;
        console.log(ataqueSeleccionadoJugador);
      }
      poderesMacotaEnemigo();
      mensajesDeAtaques(ataqueSeleccionadoJugador, ataqueSeleccionadoEnemigo);
      ResultadoBatalla();
    });
  });
  i++;
}

function mensajesDeAtaques(
  ataqueSeleccionadoJugador,
  ataqueSeleccionadoEnemigo
) {
  //JUGADOR
  let poderSeleccionadoJugador = document.createElement("p");
  poderSeleccionadoJugador.innerHTML = ataqueSeleccionadoJugador;
  mensajesBatallaJugador.appendChild(poderSeleccionadoJugador);
  //ENEMIGO
  let poderSeleccionadoEnemigo = document.createElement("p");
  poderSeleccionadoEnemigo.innerHTML = ataqueSeleccionadoEnemigo;
  mensajesBatallaEnemigo.appendChild(poderSeleccionadoEnemigo);
}

function ResultadoBatalla() {
  if (ataqueSeleccionadoJugador == ataqueSeleccionadoEnemigo) {
    resultados.innerHTML = "EMPATE";
  } else if (
    (ataqueSeleccionadoJugador == "TIERRA 🌿" &&
      ataqueSeleccionadoEnemigo == "FUEGO 🔥") ||
    (ataqueSeleccionadoJugador == "FUEGO 🔥" &&
      ataqueSeleccionadoEnemigo == "AGUA 💧") ||
    (ataqueSeleccionadoJugador == "AGUA 💧" &&
      ataqueSeleccionadoEnemigo == "TIERRA 🌿")
  ) {
    resultados.innerHTML = "GANASTE";
    vidasEnemigo--;
    enemigoVidas.innerHTML = " " + vidasEnemigo;
  } else {
    resultados.innerHTML = "PERDISTE";
    vidasJugador--;
    jugadorVidas.innerHTML = " " + vidasJugador;
  }
  ganador();
}

function ganador() {
  let mensajeGanador = document.createElement("p");
  if (vidasJugador === 0) {
    mensajeGanador.innerHTML =
      nombreMascotaSeleccionadaEnemigo + ". Vuelve a intentarlo";
    mensajeFinal.appendChild(mensajeGanador);
    contenedorBotonesAtaque.style.display = "none";
    resultados.style.display = "none";
  } else if (vidasEnemigo == 0) {
    mensajeGanador.innerHTML =
      nombreMascotaSeleccionadaJugador + ". Felicidades 🎉🎉";
    mensajeFinal.appendChild(mensajeGanador);
    contenedorBotonesAtaque.style.display = "none";
    resultados.style.display = "none";
    quienGano = "Enemigo";
  }
}

function aleatorio(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function reiniciarJuego() {
  location.reload();
}

function creacionMapa() {
  //Rellenar un cuadrado (X, Y, Height, Width)
  //lienzo.fillRect(0, 0, 20, 40)
  objetoMascotaSeleccionadaJugador.x +=
    objetoMascotaSeleccionadaJugador.mokeponVelocidadX;
  objetoMascotaSeleccionadaJugador.y +=
    objetoMascotaSeleccionadaJugador.mokeponVelocidadY;
  lienzo.clearRect(0, 0, (mapa.width = 320), (mapa.height = 240));
  lienzo.drawImage(mapaBackgroud, 0, 0, mapa.width, mapa.height);
  objetoMascotaSeleccionadaJugador.crearMokepon();
  mokeponesEnemigos.forEach((mokeponesEnemigos) => {
    mokeponesEnemigos.crearMokepon();
  });

  if (
    objetoMascotaSeleccionadaJugador.x !== 0 ||
    objetoMascotaSeleccionadaJugador.y !== 0
  ) {
    mokeponesEnemigos.forEach((mokeponesEnemigos) => {
      objetoMascotaEnemigo = mokeponesEnemigos;
      revisarColision(mokeponesEnemigos, objetoMascotaSeleccionadaJugador);
    });
  }
}
//Funciones Movimiento de la Mascota
function moverAbajo() {
  objetoMascotaSeleccionadaJugador.mokeponVelocidadY = 5;
}
function moverArriba() {
  objetoMascotaSeleccionadaJugador.mokeponVelocidadY = -5;
}
function moverIzquierda() {
  objetoMascotaSeleccionadaJugador.mokeponVelocidadX = -5;
}
function moverDerecha() {
  objetoMascotaSeleccionadaJugador.mokeponVelocidadX = 5;
}
function detenerMovimiento() {
  objetoMascotaSeleccionadaJugador.mokeponVelocidadX = 0;
  objetoMascotaSeleccionadaJugador.mokeponVelocidadY = 0;
}

function teclaPresionada(e) {
  switch (e.key) {
    case "w":
    case "ArrowUp":
      moverArriba();
      break;
    case "s":
    case "ArrowDown":
      moverAbajo();
      break;
    case "a":
    case "ArrowLeft":
      moverIzquierda();
      break;
    case "d":
    case "ArrowRight":
      moverDerecha();
      break;
  }
}

function revisarColision(enemigo, mascotaJugador) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.h;
  const derechaEnemigo = enemigo.x + enemigo.w;
  const izquierdaEnemigo = enemigo.x;

  const arribaMascota = mascotaJugador.y;
  const abajoMascota = mascotaJugador.y + mascotaJugador.h;
  const derechaMascota = mascotaJugador.x + mascotaJugador.w;
  const izquierdaMascota = mascotaJugador.x;

  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }
  nombreMascotaEnemiga.innerHTML = objetoMascotaEnemigo.nombre;
  nombreMascotaSeleccionadaEnemigo = objetoMascotaEnemigo.nombre;
  seleccionAtaque.style.display = "flex";
  mensajes.style.display = "flex";
  volverJugar.style.display = "flex";
  contenedorMapa.style.display = "none";
  mapa.style.display = "none";
  detenerMovimiento();
}

window.addEventListener("load", inicioJuego);
