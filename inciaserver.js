const archivo = require("fs");
const express = require("express");
const path = require("path");

const app = express();

let cancionesdata = [];

// Arrow Function que inicializa Server
const levantaservidor = (puerto, mensaje) => {
  app.listen(puerto, console.log(mensaje));
  app.use(express.json());
};

// Arrow Function que Graba los datos en el json
const registracancion = (Narchivo) => {
  app.post("/canciones", (req, res) => {
    const cancion = req.body;
    const cancionesdata = JSON.parse(archivo.readFileSync(Narchivo));
    cancionesdata.push(cancion);
    archivo.writeFileSync(Narchivo, JSON.stringify(cancionesdata));
    res.send("Cancion Agregada Correctamente");
  });
};

// EN casa de Querer no colocar un EndPoint re-dirige a la HOME
const index = path.join(__dirname, "index.html");

app.get("/", (req, res) => {
  res.sendFile(index);
});

// Arrow Function que Leer las canciones creadas
const leecancion = () => {
  app.get("/canciones", (req, res) => {
    const cancionesdata = JSON.parse(
      archivo.readFileSync("repertorio.json", "utf8")
    );
    res.json(cancionesdata);
  });
};

// ArrowFunction que modifica un arreglo segun el parametro del ENDpoint

const modificacancion = () => {
  app.put("/canciones/:id", (req, res) => {
    const { id } = req.params;
    const databody = req.body;
    const cancionesdata = JSON.parse(
      archivo.readFileSync("repertorio.json", "utf8")
    );
    const clavemodifica = cancionesdata.findIndex(
      (buscado) => buscado.id == id
    );
    cancionesdata[clavemodifica] = databody;
    archivo.writeFileSync("repertorio.json", JSON.stringify(cancionesdata));

    res.json("modificación Realizada");
  });
};

const eliminacancion = () => {
  app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params;
    const cancionesdata = JSON.parse(
      archivo.readFileSync("repertorio.json", "utf8")
    );
    const clavemodifica = cancionesdata.findIndex(
      (buscado) => buscado.id == id
    );
    cancionesdata.splice(clavemodifica, 1);
    archivo.writeFileSync("repertorio.json", JSON.stringify(cancionesdata));

    res.json("Elinación Realizada");
  });
};

// Exporta las Funciones que necesito
module.exports = {
  levantaservidor,
  registracancion,
  leecancion,
  modificacancion,
  eliminacancion,
};
