// alert("welcome to mokepon")

const sectionAtaques = document.getElementById("seleccionar-ataque");
const btnReset = document.getElementById("btn-reinicar");
const btnfuego = document.getElementById("ataque-fuego");
const btntierra = document.getElementById("ataque-tierra");
const botonReset = document.getElementById("btn-reinicar");
const btnagua = document.getElementById("ataque-agua");
const botonMascotaJugador = document.getElementById("boton-mascota");

const seccionMensajes = document.getElementById("resultado");
const mensajeJugador = document.getElementById("ataque-jugador");
const mensajeEnemigo = document.getElementById("ataque-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const spanStatus = document.getElementById("status");

const inputHipogoroth = document.getElementById("Hipogoroth");
const inputplantadigoth = document.getElementById("plantadigoth");
const inputacuatodogth = document.getElementById("acuatodogth");

const spanMascotaJugador = document.getElementById("mascota-jugador");


const sectionMascota = document.getElementById("seleccionar-mascota");
const spanMascotaenemigo = document.getElementById("mascota-enemigo");

let ataqueJugador;
let ataqueEnemigo;
let resultado;
let vidaJugador = 3;
let vidaEnemigo = 3;

function initGame() {
  sectionAtaques.style.display = "none";
  btnReset.style.display = "none";
  let seccionMensajes = document.getElementById("resultado");
  seccionMensajes.innerHTML = "Buena suerte";
  //obtener el elemento HTML con el id del elemento
  // let botonMascotaJugador = document.getElementById("boton-mascota");
  //crea un evento sobre el elemento anterior para activarse cuando se le da clic
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  btnagua.addEventListener("click", ataqueAgua);
  btnfuego.addEventListener("click", ataqueFuego);
  btntierra.addEventListener("click", ataqueTierra);
  botonReset.addEventListener("click", resetGame);
}

function ataqueAgua() {
  ataqueJugador = "agua";
  ataqueAleatorioEnemigo();
}

function ataqueFuego() {
  ataqueJugador = "fuego";
  ataqueAleatorioEnemigo();
}

function ataqueTierra() {
  ataqueJugador = "tierra";
  ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);
  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "fuego";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "agua";
  } else if (ataqueAleatorio == 3) {
    ataqueEnemigo = "tierra";
  }

  crearMensaje();
}

function crearMensaje() {
  combate();

  let notificacion = document.createElement("p");
  let newAtaqueJugador = document.createElement("p");
  let newAtaqueEnemigo = document.createElement("p");

  seccionMensajes.innerHTML = resultado;
  newAtaqueJugador.innerHTML = ataqueJugador;
  newAtaqueEnemigo.innerHTML = ataqueEnemigo;

  seccionMensajes.appendChild(notificacion);
  mensajeJugador.appendChild(newAtaqueJugador);
  mensajeEnemigo.appendChild(newAtaqueEnemigo);
}

function combate() {
  if (ataqueJugador == ataqueEnemigo) {
    resultado = "Empate";
  } else if (ataqueJugador == "agua" && ataqueEnemigo == "fuego") {
    resultado = "Ganamos";
    vidaEnemigo--;
    spanVidasEnemigo.innerHTML = vidaEnemigo;
  } else if (ataqueJugador == "tierra" && ataqueEnemigo == "agua") {
    resultado = "Ganamos";
    vidaEnemigo--;
    spanVidasEnemigo.innerHTML = vidaEnemigo;
  } else if (ataqueJugador == "fuego" && ataqueEnemigo == "tierra") {
    resultado = "Ganamos";
    vidaEnemigo--;
    spanVidasEnemigo.innerHTML = vidaEnemigo;
  } else {
    resultado = "Perdimos";
    vidaJugador--;
    spanVidasJugador.innerHTML = vidaJugador;
  }
  revisarVidas();
}

function revisarVidas() {
  if (vidaEnemigo == 0) {
    spanStatus.innerHTML = "<h1> Ganaste el combate</h1>";
    disabledBtns();
    btnReset.style.display = "block";
  } else if (vidaJugador == 0) {
    spanStatus.innerHTML = "<h1> Perdiste el combate </h1>";
    disabledBtns();
    btnReset.style.display = "block";
  }
}

function disabledBtns() {
  btnfuego.disabled = true;
  btnagua.disabled = true;
  btntierra.disabled = true;
}

function seleccionarMascotaJugador() {
  if (inputHipogoroth.checked) {
    spanMascotaJugador.innerHTML = "Hipogoroth";
  } else if (inputacuatodogth.checked) {
    spanMascotaJugador.innerHTML = "acuatodogth";
  } else if (inputplantadigoth.checked) {
    spanMascotaJugador.innerHTML = "plantadigoth";
  } else {
    alert("seleccionar mascota");
  }

  sectionAtaques.style.display = "flex";
  sectionMascota.style.display = "none";

  seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    spanMascotaenemigo.innerHTML = "Hipogoroth";
  } else if (ataqueAleatorio == 2) {
    spanMascotaenemigo.innerHTML = "acuatodogth";
  } else if (ataqueAleatorio == 3) {
    spanMascotaenemigo.innerHTML = "plantadigoth";
  }
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function resetGame() {
  console.log("reset Game");
  location.reload();
}

// necesario para evitar que se llamen las funciones antes de usarlas
window.addEventListener("load", initGame);
