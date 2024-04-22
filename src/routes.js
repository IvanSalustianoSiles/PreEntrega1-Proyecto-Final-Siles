import express from "express";
import { exampleManager } from "./app.js";
const app = express();
let toSendObject = {};
app.get("/products", (req, res) => {
  if (req.query.limit) {
    try {
      toSendObject = {
        status: 1,
        payload: exampleManager.readFileAndSave().slice(0, +req.query.limit),
      }; // Aprovecho mi método preexistente "readFileAndSave" que lee el archivo y guarda su contenido en el array, retornándolo.

      res.send(toSendObject);
    } catch (error) {
      console.error(
        "Lo sentimos, ha ocurrido un error enviando la información que intentó capturar."
      );
    }
  } else {
    try {
      toSendObject = { status: 1, payload: exampleManager.readFileAndSave() };

      res.send(toSendObject);
    } catch (error) {
      console.error(
        "Lo sentimos, ha ocurrido un error enviando la información que intentó capturar."
      );
    }
  }
});

app.get("/products/:pid", (req, res) => {
  try {
    toSendObject = {
      status: 1,
      payload: exampleManager.readFileAndSave()[+req.params.pid - 1],
    }; // -1, puesto que lee desde la posición cero la id, que comienza en uno.

    res.send(toSendObject);
  } catch (error) {
    console.error(
      "Lo sentimos, ha ocurrido un error enviando la información que intentó capturar."
    );
  }
});

app.listen(8080, () => {
  console.log("Servidor activo.");
});
