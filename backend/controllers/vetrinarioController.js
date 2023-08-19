import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res) => {
  const { nombre, email, password } = req.body;

  //revisar usuarios duplicados
  const existeUsuario = await Veterinario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    //guardar Nuevo veterinario
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();
    res.json(veterinarioGuardado);
  } catch (e) {
    console.log(e);
  }
};

const perfil = (req, res) => {
  res.json({ msg: "Mostrando Perfil" });
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Veterinario.findOne({ token });
  if (!usuarioConfirmar) {
    const error = new Error("Token Invalido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();
    res.json({ msh: "Usuario Confirmado Correctamente" });
  } catch (e) {
    console.log(e);
  }

  console.log(usuarioConfirmar);
};

export { registrar, perfil, confirmar };
