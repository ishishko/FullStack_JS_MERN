import Express from "express";
import dotenv from "dotenv";

import conectarBBDD from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

const app = Express();

dotenv.config();

conectarBBDD();

app.use(Express.json());
app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servido funcionando en puerto ${PORT}`);
});
