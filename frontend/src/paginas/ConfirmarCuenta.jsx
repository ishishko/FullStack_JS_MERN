import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios.jsx";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);

        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
        });
      } catch (e) {
        setAlerta({
          msg: e.response.data.msg,
          error: true,
        });
      }
      setCargando(false);
    };
    confirmarCuenta();
  });

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu cuenta y administra <span className=" text-black">tus Pacientes</span>{" "}
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!cargando && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link to="/" className="block text-center my-5 text-gray-500">
            Iniciar Sesion
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
