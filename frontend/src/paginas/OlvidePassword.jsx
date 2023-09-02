import { Link } from "react-router-dom";

const OlvidePassword = () => {
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu acceso y no pierdas <span className=" text-black">tus Pacientes</span>{" "}
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <form action="">
          <div>
            <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold mt-6">
              Email
            </label>
            <input
              type="email"
              placeholder="Ingresar Email de registro"
              className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
            />
          </div>
          <input
            type="submit"
            name=""
            id=""
            value="Enviar Mail"
            className="bg-indigo-800 w-full py-3 px-8 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-600 md:w-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-center my-5 text-gray-500">
            Ya tienes una Cuenta? Inicia sesion
          </Link>
          <Link to="/registrar" className="block text-center my-5 text-gray-500">
            No tienes una Cuenta? Registrate
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;
