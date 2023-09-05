import { Link } from "react-router-dom";
import { useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta.jsx";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validacion de formulario
    if ([nombre, email, password, repetirPassword].includes("")) {
      return setAlerta({ msg: "Hay campos Vacios", error: true });
    }
    if (password !== repetirPassword) {
      return setAlerta({ msg: "Los Password no son iguales", error: true });
    }
    if (password.length <= 7) {
      return setAlerta({ msg: "Pasword muy corto, minimo 8 caracteres", error: true });
    }

    setAlerta({});

    //crear usuario en la api
    try {
      await clienteAxios.post("/veterinarios", { nombre, email, password });
      setAlerta({
        msg: "Creado Correctamente, Revisa tu Email",
        error: false,
      });
    } catch (e) {
      setAlerta({
        msg: e.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu cuenta y administra <span className=" text-black">tus Pacientes</span>{" "}
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}

        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold mt-6">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Ingresar Nombre"
              className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold mt-6">
              Email
            </label>
            <input
              type="email"
              placeholder="Ingresar Email"
              className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold mt-6">
              Password
            </label>
            <input
              type="password"
              placeholder="Ingresar tu Password"
              className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold mt-6">
              Confirmar Password
            </label>
            <input
              type="password"
              placeholder="Repite tu Password"
              className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            name=""
            id=""
            value="Crear Cuenta"
            className="bg-indigo-800 w-full py-3 px-8 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-600 md:w-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-center my-5 text-gray-500">
            Ya tienes una Cuenta? Inicia sesion
          </Link>
          <Link to="/olvide-password" className="block text-center my-5 text-gray-500">
            Olvide mi password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
