import mongoose, { mongo } from "mongoose";
//import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";

const veterinarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  telefono: {
    type: String,
    default: null,
    trim: true,
  },
  web: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: generarId(),
  },
  confirmado: {
    type: Boolean,
    default: false,
  },
});

/*veterinarioSchema.pre("save", async function (next) {
  //evita doble hasheo de password
  if (this.isModified("password")) {
    next();
  }

  //hasheo de password

  const pass = this.password;
  const saltRounds = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(pass, saltRounds);
  this.password = passHash;
  //console.log(this);
  console.log("Antes de almacenar");
});*/

const Veterinario = mongoose.model("Veterinario", veterinarioSchema);

export default Veterinario;
