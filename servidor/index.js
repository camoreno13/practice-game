const express = require('express')
//cors - npm i cors - express
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
// crear una carpeta y poner todos los archivos staticos para que funcione desde localhost 
// op 1 
// http://LAPTOP-DKT647BO.local:8080 - mac - linux 
// windowx - ipconfig - pegar la ipv4 - adaptandor inalambrico 
class jugador {
    constructor(id){
        this.id = id 
    }

    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }

    actualizarPosicion(x ,y ){
        this.x = x 
        this.y = y 
    }
}

const jugadores = []

class mokepon {
    constructor(nombre){
        this.nombre = nombre
    }
}

app.get("/unirse" , (req ,res) => {
    const id = `${Math.random()}`
    const player = new jugador(id)
    jugadores.push(player)

    res.setHeader('Access-Control-Allow-Origin', "*")
    
    res.send(id)
})

app.post("/mokepon/:jugadorId" , (req , res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const moke = new mokepon(nombre)
    const index = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if(index >= 0){
        jugadores[index].asignarMokepon(moke)
    } 
    console.log("jugadores : " , jugadores)
    console.log("id : " , jugadorId)
    res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req , res ) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0 
    const y = req.body.y || 0 
    const index = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if(index >= 0){
        jugadores[index].actualizarPosicion(x , y)
    } 
    console.log("jugadores - posicion : " , jugadores)

    const enemigos = jugadores.filter( jugador => 
        jugadorId != jugador.id
    )
    // res.end()
    res.send({enemigos})
})

// servidor up
app.listen(8080 , () => {
    console.log("Server Funcionando")
})