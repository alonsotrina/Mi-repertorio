const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get("/canciones", (req, res) => {
    const productos = JSON.parse(fs.readFileSync("canciones.json"))
    res.json(productos)
})

app.post("/canciones", (req, res) => {
    const producto = req.body
    const productos = JSON.parse(fs.readFileSync("canciones.json"))
    productos.push(producto)
    fs.writeFileSync("canciones.json", JSON.stringify(productos))
    res.send("Canción agregada con éxito!")
})

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params
    const productos = JSON.parse(fs.readFileSync("canciones.json"))
    const index = productos.findIndex(p => p.id == id)
    productos.splice(index, 1)
    fs.writeFileSync("canciones.json", JSON.stringify(productos))
    res.send("Canción eliminado con éxito")
})


app.put("/canciones/:id", (req, res) => {
    const { id } = req.params
    const producto = req.body

    const productos = JSON.parse(fs.readFileSync("canciones.json"))
    const index = productos.findIndex(p => p.id == id)

    productos[index] = producto
    fs.writeFileSync("canciones.json", JSON.stringify(productos))
    res.send("Canción modificado con éxito")
})

app.listen(3000, console.log("¡Hola Mundo con expres!"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
