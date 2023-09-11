import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Login = () => {
  const { auth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      return setAlerta({ msg: "Todos los campos son Obligatorios", error: true });
    }
    if (password.length <= 7) {
      return setAlerta({ msg: "Password minimo 8 caracteres", error: true });
    }

    setAlerta({});

    try {
      const { data } = await clienteAxios.post("/veterinarios/login", { email, password });
      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/admin");
    } catch (e) {
      console.log(e);
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
          Inicia Secion y Administra tus <span className=" text-black">Pacientes</span>{" "}
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form action="" onSubmit={handleSubmit}>
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
              placeholder="Ingresar Password"
              className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            name=""
            id=""
            value="Iniciar Secion"
            className="bg-indigo-800 w-full py-3 px-8 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-600 md:w-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/registrar" className="block text-center my-5 text-gray-500">
            No tienes una Cuenta? Registrate
          </Link>
          <Link to="/olvide-password" className="block text-center my-5 text-gray-500">
            Olvide mi password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
