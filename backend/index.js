import Express from "express";
import dotenv from "dotenv";
import conectarBBDD from "./config/db.js";

const app = Express();
dotenv.config();

conectarBBDD();

app.use("/", (req, res) => {
  res.send("Hola Mundo");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servido funcionando en puerto ${PORT}`);
});
