import { useState, useEffect } from "react";

import Alerta from "../components/Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});

  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if (paciente?.nombre) {
      console.log(paciente);
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fechaAlta);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validar formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setAlerta({
        msg: "Todos los campos son Obligatorios",
        error: true,
      });
      return;
    }

    guardarPaciente({
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
      id,
    });
    setAlerta({
      msg: "Guardado Correctamente",
    });
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
    setId("");
  };
  const { msg } = alerta;
  return (
    <>
      <h2 className=" font-black text-xl text-center">Administrador de Pacientes</h2>
      <p className=" text-xl mt-5 mb-5 text-center">
        Añade tus Pacientes y<span className=" text-indigo-600 font-bold"> Administralos</span>
      </p>

      <form onSubmit={handleSubmit} className=" bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md">
        <div className="mb-5">
          <label htmlFor="nombre" className=" text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            type="text"
            name=""
            id="nombre"
            placeholder="nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="propetario" className=" text-gray-700 uppercase font-bold">
            Nombre Propietario
          </label>
          <input
            type="text"
            name=""
            id="propetario"
            placeholder="nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className=" text-gray-700 uppercase font-bold">
            Email
          </label>
          <input
            type="email"
            name=""
            id="email"
            placeholder="ingresar Email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="fecha" className=" text-gray-700 uppercase font-bold">
            Fecha Alta
          </label>
          <input
            type="date"
            name=""
            id="fecha"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className=" text-gray-700 uppercase font-bold">
            Sintomas
          </label>
          <textarea
            name=""
            id="sintomas"
            placeholder="Describe los sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        {msg && <Alerta alerta={alerta} />}
        <input
          type="submit"
          value={id ? "Guardar Cambios" : "Agregar Paciente"}
          className=" bg-indigo-600 w-full p-3 text-white uppercase rounded-md font-bold hover:bg-indigo-800 cursor-pointer transition-colors"
        />
      </form>
    </>
  );
};

export default Formulario;
