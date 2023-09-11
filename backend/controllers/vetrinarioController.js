import bcrypt from "bcrypt";

import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/olvidePassword.js";

const registrar = async (req, res, next) => {
  const { nombre, email, password } = req.body;

  //revisar usuarios duplicados
  const existeUsuario = await Veterinario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    //Crear Nuevo veterinario
    const veterinario = new Veterinario(req.body);

    // Hash Password
    const saltRounds = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(veterinario.password, saltRounds);
    veterinario.password = passHash;

    //Guardar Veterinario
    const veterinarioGuardado = await veterinario.save();
    //Enviar email
    emailRegistro({
      email,
      nombre,
      token: veterinarioGuardado.token,
    });

    console.log("Veterinario Creado, Email Enviado");
    console.log(veterinarioGuardado);

    res.json(veterinarioGuardado);
  } catch (e) {
    console.log(e);
  }
};

const perfil = (req, res) => {
  const { veterinario } = req;

  res.json(veterinario);
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Veterinario.findOne({ token });
  console.log(usuarioConfirmar);
  if (!usuarioConfirmar) {
    const error = new Error("Token Invalido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario Confirmado Correctamente" });
  } catch (e) {
    console.log(e);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  console.log("autenticando " + email);

  //Comprobar si Usuario existe
  const usuario = await Veterinario.findOne({ email });
  if (!usuario) {
    const error = new Error("Usuario no Existe");
    return res.status(403).json({ msg: error.message });
  }

  //Comprobar usuario confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu Cuenta no ha sido Confirmada");
    return res.status(403).json({ msg: error.message });
  }

  //Autenticar Usuario
  const passwordConfirmada = await bcrypt.compare(password, usuario.password);
  console.log(passwordConfirmada);
  if (passwordConfirmada) {
    usuario.token = generarJWT(usuario.id);
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: usuario.token,
    });
  } else {
    const error = new Error("El Password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;

  const existeVeterinario = await Veterinario.findOne({ email });
  if (!existeVeterinario) {
    const error = new Error("El mail no existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existeVeterinario.token = generarId();
    await existeVeterinario.save();
    //Enviar email con instrucciones
    emailOlvidePassword({
      email,
      nombre: existeVeterinario.nombre,
      token: existeVeterinario.token,
    });
    res.json({ msg: "Hemos enviado un mail con las Instrucciones" });
  } catch (e) {
    console.log(e);
  }
};

const comprobarToken = async (req, res) => {
  const token = req.params.token;
  console.log(token);

  const tokenValido = await Veterinario.findOne({ token });
  if (tokenValido) {
    res.json({ msg: "Token Valido" });
  } else {
    const error = new Error("Token No es Valido");
    return res.status(400).json({ msg: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const veterinario = await Veterinario.findOne({ token });

  if (!veterinario) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    veterinario.token = null;
    const saltRounds = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, saltRounds);
    veterinario.password = passHash;
    await veterinario.save();
    res.json({ msg: "Password Modificado Correctamente" });
    console.log(veterinario);
  } catch (e) {
    console.log(e);
  }
};

export { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword };
