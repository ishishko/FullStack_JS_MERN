import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    console.log("token correcto");
  }

  try {
    token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");
    return next();
  } catch (e) {
    console.log(e);
    const error = new Error("Token No Valido 1");
    res.status(403).json({ msg: error.message });
  }

  if (!token) {
    const error = new Error("Token Inexistente");
    res.status(403).json({ msg: error.message });
  }
  next();
};

export default checkAuth;
