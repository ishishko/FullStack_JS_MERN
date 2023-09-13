import PacientesContext from "../context/PacienteProvider";
import usePacientes from "../hooks/usePacientes";
import Pacientes from "./pacientes";

function ListadoPacientes() {
  const { pacientes } = usePacientes();

  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className=" font-black text-xl text-center">Listado de Pacientes</h2>

          <p className=" text-xl mt-5 mb-5 text-center">
            Administra tus <span className=" text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>
          {pacientes.map((paciente) => (
            <Pacientes key={paciente._id} paciente={paciente} />
          ))}
        </>
      ) : (
        <>
          <h2 className=" font-black text-xl text-center">No hay pacientes</h2>

          <p className=" text-xl mt-5 mb-5 text-center">
            Comienza Agregando pacientes <span className=" text-indigo-600 font-bold">y Apareceran Aqui</span>
          </p>
        </>
      )}
    </>
  );
}

export default ListadoPacientes;
