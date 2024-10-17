const {
  levantaservidor,
  registracancion,
  leecancion,
  modificacancion,
  eliminacancion,
} = require("./inciaserver");

levantaservidor(3000, "Servidor Levantado Ok");
leecancion();
registracancion("repertorio.json");
modificacancion();
eliminacancion();
