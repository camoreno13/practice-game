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
const spanMascotaJugador = document.getElementById("mascota-jugador");
const sectionMascota = document.getElementById("seleccionar-mascota");
const spanMascotaenemigo = document.getElementById("mascota-enemigo");
const btnAtaquesMascota = document.getElementById("cards-ataques");
const contenedorCards = document.getElementById("cards");


// Canvas
const sectionVerMapa = document.getElementById("container-map");
const map = document.getElementById("map");
let lienzo = map.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./assets/mokemap.png";

let alturaBuscada
let anchoMapa = window.innerWidth - 20 

const maxAnchoMap = 800

if(anchoMapa > maxAnchoMap){
  anchoMapa = maxAnchoMap - 20 
}


alturaBuscada = anchoMapa * 600 / 800

map.width  = anchoMapa
map.height = alturaBuscada

// clases
class Mokepon {
  constructor(nombre, foto, vida, fotoMapa, x = 20, y = 40) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 80;
    this.alto = 80;
    this.x = aleatorio(0 , map.width - this.ancho);
    this.y = aleatorio(0 , map.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  pintar() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

let hipogoroth = new Mokepon(
  "Hipogoroth",
  "./assets/hipo.png",
  3,
  "./assets/hipodoge.png"
);
let ratigueya = new Mokepon(
  "Plantadigoth",
  "./assets/rati.png",
  3,
  "./assets/ratigueya.png"
);
let capipepo = new Mokepon(
  "Capipepo",
  "./assets/capi.png",
  3,
  "./assets/capipepo.png"
);

let hipogorothEnemigo = new Mokepon(
  "Hipogoroth",
  "./assets/hipo.png",
  3,
  "./assets/hipodoge.png",
  500,
  200
);
let ratigueyaEnemigo = new Mokepon(
  "Plantadigoth",
  "./assets/rati.png",
  3,
  "./assets/ratigueya.png",
  100,
  350
);
let capipepoEnemigo = new Mokepon(
  "Capipepo",
  "./assets/capi.png",
  3,
  "./assets/capipepo.png",
  700,
  400
);

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

// Variables
let ataqueJugador;
let ataqueEnemigo;
let resultado;
let vidaJugador = 3;
let vidaEnemigo = 3;
let optMokepon;
let inputHipogoroth;
let inputplantadigoth;
let inputacuatodogth;
let mascotaJugador;
let btnfuego;
let btntierra;
let btnagua;

let mokepon;



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

  sectionVerMapa.style.display = "none";

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
  let ataques;
  for (let i = 0; i < mokepones.length; i++) {
    if (mokepones[i].nombre === nameMokepon) {
      ataques = mokepones[i].ataques;
      mokepon = mokepones[i];
    }
  }
  printMascota();
  mostrarAtaques(ataques);
}

function printMascota() {
  // lienzo.fillRect(5,15,20,20)
  let imgMascota = new Image();
  imgMascota.src = mokepon.foto;
  // img , x , y , x-size, y-size
  lienzo.drawImage(
    imgMascota,
    mokepon.x,
    mokepon.y,
    mokepon.alto,
    mokepon.ancho
  );
}

function pintarCanvas() {
  mokepon.x = mokepon.x + mokepon.velocidadX;
  mokepon.y = mokepon.y + mokepon.velocidadY;
  // Limpia el mapa mara no mostrar imagenes repetidas
  lienzo.clearRect(0, 0, map.clientWidth, map.clientHeight);

  lienzo.drawImage(mapaBackground, 0, 0, map.width, map.height);

  // lienzo.drawImage(
  //   mokepon.mapaFoto,
  //   mokepon.x,
  //   mokepon.y,
  //   mokepon.ancho,
  //   mokepon.alto
  // );

  mokepon.pintar();
  hipogorothEnemigo.pintar();
  ratigueyaEnemigo.pintar();
  capipepoEnemigo.pintar();

  if (mokepon.velocidadX !== 0 || mokepon.velocidadY !== 0) {
    colision(ratigueyaEnemigo);
    colision(capipepoEnemigo);
    colision(hipogorothEnemigo);
  }
}

function detenerMovimiento() {
  mokepon.velocidadX = 0;
  mokepon.velocidadY = 0;
}
function moverAr() {
  // mokepon.y -= 5;
  // pintarCanvas()
  mokepon.velocidadY = -5;
}

function moverAb() {
  mokepon.velocidadY = 5;
}

function moverDer() {
  mokepon.velocidadX = 5;
}

function moverIzq() {
  mokepon.velocidadX = -5;
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

  spanMascotaJugador.innerHTML = mascotaJugador;
  sectionVerMapa.style.display = "flex";
  sectionMascota.style.display = "none";

  iniciarMapa();

  extraerAtaques(mascotaJugador);
}

function iniciarMapa() {
  invervalo = setInterval(pintarCanvas, 50);
  // definiar propiedades del mapa
  // generar un mapa responsive y = anchoActual *  altura / ancho
  // map.width = 800;
  // map.height = 600;

  // Evento tecla presionada
  window.addEventListener("keydown", presionarTecla);
  window.addEventListener("keyup", detenerMovimiento);
}

function presionarTecla(event) {
  switch (event.key) {
    case "ArrowUp":
      moverAr();
      break;

    case "ArrowDown":
      moverAb();
      break;

    case "ArrowLeft":
      moverIzq();
      break;
    case "ArrowRight":
      moverDer();
      break;

    default:
      break;
  }
}

function colision(enemigo) {
  //colisiones 
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derEnemigo = enemigo.x + enemigo.ancho;
  const izqEnemigo = enemigo.x;

  const arribaMokepon = mokepon.y;
  const abajoMokepon = mokepon.y + mokepon.alto;
  const derMokepon = mokepon.x + mokepon.ancho;
  const izqMokepon = mokepon.x;

  if (
    abajoMokepon < arribaEnemigo ||
    arribaMokepon > abajoEnemigo ||
    derMokepon < izqEnemigo ||
    izqMokepon > derEnemigo
  ) {
    return
  }

  detenerMovimiento();
  sectionAtaques.style.display = 'flex'
  sectionVerMapa.style.display = 'none'

  
  seleccionarMascotaEnemigo(enemigo);
  // alert("colision con : " + enemigo.nombre)
}

function mostrarAtaques(ataques) {
  let ataque;

  ataques.forEach((element) => {
    ataque = `<button class="btn-ataques" id="${element.id}"> ${element.nombre}</button>`;

    btnAtaquesMascota.innerHTML += ataque;
  });

  btnfuego = document.getElementById("btn-fuego");
  btntierra = document.getElementById("btn-tierra");
  btnagua = document.getElementById("btn-agua");

  btnagua.addEventListener("click", ataqueAgua);
  btnfuego.addEventListener("click", ataqueFuego);
  btntierra.addEventListener("click", ataqueTierra);
}

function seleccionarMascotaEnemigo(enemigo) {
  // let ataqueAleatorio = aleatorio(1, 3);
  
  // let ataqueAleatorio = aleatorio(0, mokepones.length - 1); -- 
  spanMascotaenemigo.innerHTML = enemigo.nombre;
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
