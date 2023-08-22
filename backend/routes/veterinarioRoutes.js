import express from "express";
import { perfil, registrar, confirmar, autenticar } from "../controllers/vetrinarioController.js";

const router = express.Router();

router.post("/", registrar);

router.get("/perfil", perfil);

router.get("/confirmar/:token", confirmar);

router.post("/login", autenticar);

export default router;
