import mongoose from "mongoose";

const pacientesSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
  },
  propietario: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  fechaAlta: {
    type: Date,
    require: true,
  },
  sintomas: {
    type: String,
    require: true,
  },
  veterinario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Veterinario",
  },
});
