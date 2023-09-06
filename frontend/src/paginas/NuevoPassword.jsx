import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

function NuevoPassword() {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/reset-password/${token}`);
        setAlerta({
          msg: "Coloca tu nuevo Password",
        });
        setTokenValido(true);
      } catch (e) {
        setAlerta({
          msg: "Hubo un error en Verificacion",
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length <= 7) {
      setAlerta({
        msg: "El password debe tener 8 o mas Caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/veterinarios/reset-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });

      setAlerta({
        msg: data.msg,
      });
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.respnse.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu password y no pierdas acceso a <span className=" text-black">tus Pacientes</span>{" "}
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        {tokenValido && (
          <>
            <form action="" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold mt-6">
                  Nuevo Password
                </label>
                <input
                  type="password"
                  placeholder="Ingresar tu nuevo Password"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                name=""
                id=""
                value="Reestablecer Password"
                className="bg-indigo-800 w-full py-3 px-8 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-600 md:w-auto"
              />
            </form>
          </>
        )}
        {passwordModificado && (
          <Link to="/" className="block text-center my-5 text-gray-500">
            Iniciar Sesion
          </Link>
        )}
      </div>
    </>
  );
}

export default NuevoPassword;
