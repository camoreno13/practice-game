// alert("welcome to mokepon")
let ataqueJugador;
let ataqueEnemigo;
let resultado;
let vidaJugador = 3;
let vidaEnemigo = 3;

function initGame() {
  let sectionAtaques = document.getElementById("seleccionar-ataque");
  sectionAtaques.style.display = "none";

  let btnReset = document.getElementById("btn-reinicar");
  btnReset.style.display = "none";

  //obtener el elemento HTML con el id del elemento
  let botonMascotaJugador = document.getElementById("boton-mascota");
  //crea un evento sobre el elemento anterior para activarse cuando se le da clic
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

  let btnagua = document.getElementById("ataque-agua");
  btnagua.addEventListener("click", ataqueAgua);

  let btnfuego = document.getElementById("ataque-fuego");
  btnfuego.addEventListener("click", ataqueFuego);

  let btntierra = document.getElementById("ataque-tierra");
  btntierra.addEventListener("click", ataqueTierra);

  let botonReset = document.getElementById("btn-reinicar");
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
  let seccionMensajes = document.getElementById("mensajes");
  let parrafo = document.createElement("p");
  parrafo.innerHTML =
    "Tu mascota ataco con: " +
    ataqueJugador +
    ", la mascota del enemigo ataco con: " +
    ataqueEnemigo +
    ". " +
    resultado;

  seccionMensajes.appendChild(parrafo);
}

function combate() {
  let spanVidasJugador = document.getElementById("vidas-jugador");
  let spanVidasEnemigo = document.getElementById("vidas-enemigo");

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
  let spanStatus = document.getElementById("status");

  if (vidaEnemigo == 0) {
    spanStatus.innerHTML = "<h1> Ganaste el combate</h1>";
    disabledBtns();

    let btnReset = document.getElementById("btn-reinicar");
    btnReset.style.display = "block";
  } else if (vidaJugador == 0) {
    spanStatus.innerHTML = "<h1> Perdiste el combate </h1>";
    disabledBtns();
    let btnReset = document.getElementById("btn-reinicar");
    btnReset.style.display = "block";
  }
}

function disabledBtns() {
  let fire = (document.getElementById("ataque-fuego").disabled = true);
  let water = document.getElementById("ataque-agua");
  water.disabled = true;
  let earth = document.getElementById("ataque-tierra");
  earth.disabled = true;
}

function seleccionarMascotaJugador() {
  let inputHipogoroth = document.getElementById("Hipogoroth");
  let inputplantadigoth = document.getElementById("plantadigoth");
  let inputacuatodogth = document.getElementById("acuatodogth");

  let spanMascotaJugador = document.getElementById("mascota-jugador");

  if (inputHipogoroth.checked) {
    spanMascotaJugador.innerHTML = "Hipogoroth";
  } else if (inputacuatodogth.checked) {
    spanMascotaJugador.innerHTML = "acuatodogth";
  } else if (inputplantadigoth.checked) {
    spanMascotaJugador.innerHTML = "plantadigoth";
  } else {
    alert("seleccionar mascota");
  }

  let sectionAtaques = document.getElementById("seleccionar-ataque");
  sectionAtaques.style.display = "block";

  let sectionMascota = document.getElementById("seleccionar-mascota");
  sectionMascota.style.display = "none";

  seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);
  let spanMascotaenemigo = document.getElementById("mascota-enemigo");

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
