import express from "express";
import { perfil, registrar, confirmar } from "../controllers/vetrinarioController.js";

const router = express.Router();

router.post("/", registrar);

router.get("/perfil", perfil);

router.get("/confirmar/:token", confirmar);

export default router;
