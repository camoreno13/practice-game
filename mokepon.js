// alert("welcome to mokepon")
//constantes
const sectionAtaques = document.getElementById("seleccionar-ataque");
const btnReset = document.getElementById("btn-reinicar");
const botonReset = document.getElementById("btn-reinicar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const seccionMensajes = document.getElementById("resultado");
const mensajeJugador = document.getElementById("ataque-jugador");
const mensajeEnemigo = document.getElementById("ataque-enemigo");
const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");
const spanStatus = document.getElementById("status");
let spanMascotaJugador = document.getElementById("mascota-jugador");
const sectionMascota = document.getElementById("seleccionar-mascota");
const spanMascotaenemigo = document.getElementById("mascota-enemigo");
const btnAtaquesMascota = document.getElementById('cards-ataques')

//variables

// clases
class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
  }
}

let hipogoroth = new Mokepon("Hipogoroth", "./assets/hipo.png", 3);
let ratigueya = new Mokepon("Plantadigoth", "./assets/rati.png", 3);
let capipepo = new Mokepon("Capipepo", "./assets/capi.png", 3);

hipogoroth.ataques.push(
  { nombre: "agua", id: "btn-agua" },
  { nombre: "tierra", id: "btn-tierra" },
  { nombre: "fuego", id: "btn-fuego" }
);

ratigueya.ataques.push(
  { nombre: "agua", id: "btn-agua" },
  { nombre: "tierra", id: "btn-tierra" },
  { nombre: "fuego", id: "btn-fuego" }
);

capipepo.ataques.push(
  { nombre: "agua", id: "btn-agua" },
  { nombre: "tierra", id: "btn-tierra" },
  { nombre: "fuego", id: "btn-fuego" }
);

let mokepones = [];
mokepones.push(hipogoroth, ratigueya, capipepo);
//console.log("mokepones: ", mokepones);

let ataqueJugador;
let ataqueEnemigo;
let resultado;
let vidaJugador = 3;
let vidaEnemigo = 3;
let optMokepon;
let inputHipogoroth
let inputplantadigoth
let inputacuatodogth
let mascotaJugador

let btnfuego
let btntierra
let btnagua

const contenedorCards = document.getElementById("cards");

function initGame() {
  sectionAtaques.style.display = "none";
  btnReset.style.display = "none";

  mokepones.forEach((mokepon) => {
    optMokepon = `<input type="radio" name="mascota" id=${mokepon.nombre} />
    <label for=${mokepon.nombre} class="card-mokepon">
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt=${mokepon.nombre} />
    </label>`;
    contenedorCards.innerHTML += optMokepon;

    inputHipogoroth = document.getElementById("Hipogoroth");
    inputplantadigoth = document.getElementById("Plantadigoth");
    inputacuatodogth = document.getElementById("Capipepo");
  });

  let seccionMensajes = document.getElementById("resultado");
  seccionMensajes.innerHTML = "Buena suerte";
  //obtener el elemento HTML con el id del elemento
  // let botonMascotaJugador = document.getElementById("boton-mascota");
  //crea un evento sobre el elemento anterior para activarse cuando se le da clic
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
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

function extraerAtaques(nameMokepon) {
  let ataques 
  for (let i = 0; i < mokepones.length; i++) {
    if(mokepones[i].nombre === nameMokepon){
      ataques = mokepones[i].ataques
    }
  }
  console.log("ataques" , ataques)
  mostrarAtaques(ataques)
}

function seleccionarMascotaJugador() {
  // if (inputHipogoroth.checked) {
  //   spanMascotaJugador.innerHTML = "Hipogoroth";
  // } else if (inputacuatodogth.checked) {
  //   spanMascotaJugador.innerHTML = "acuatodogth";
  // } else if (inputplantadigoth.checked) {
  //   spanMascotaJugador.innerHTML = "plantadigoth";
  // } else {
  //   alert("seleccionar mascota");
  // }

  // optimizado 1 fuente de verdad
  if (inputHipogoroth.checked) {
    mascotaJugador = inputHipogoroth.id;
  } else if (inputacuatodogth.checked) {
    mascotaJugador = inputacuatodogth.id;
  } else if (inputplantadigoth.checked) {
    mascotaJugador = inputplantadigoth.id;
  } else {
    alert("seleccionar mascota");
  }

  spanMascotaJugador.innerHTML = mascotaJugador 
  sectionAtaques.style.display = "flex";
  sectionMascota.style.display = "none";

  extraerAtaques(mascotaJugador)
  seleccionarMascotaEnemigo();
}



function mostrarAtaques(ataques){
  let ataque 

  ataques.forEach(element => {
    ataque = `<button class="btn-ataques" id="${element.id}"> ${element.nombre}</button>`

    btnAtaquesMascota.innerHTML += ataque

  })

  btnfuego = document.getElementById("btn-fuego");
  btntierra = document.getElementById("btn-tierra");
  btnagua = document.getElementById("btn-agua");
  
  btnagua.addEventListener("click", ataqueAgua);
  btnfuego.addEventListener("click", ataqueFuego);
  btntierra.addEventListener("click", ataqueTierra);
}

function seleccionarMascotaEnemigo() {
  // let ataqueAleatorio = aleatorio(1, 3);
  let ataqueAleatorio = aleatorio(0, mokepones.length -1);
  spanMascotaenemigo.innerHTML = mokepones[ataqueAleatorio].nombre
  // if (ataqueAleatorio == 1) {
  //   spanMascotaenemigo.innerHTML = "Hipogoroth";
  // } else if (ataqueAleatorio == 2) {
  //   spanMascotaenemigo.innerHTML = "acuatodogth";
  // } else if (ataqueAleatorio == 3) {
  //   spanMascotaenemigo.innerHTML = "plantadigoth";
  // }
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
