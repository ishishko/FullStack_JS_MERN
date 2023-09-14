/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect } from "react";

import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

// eslint-disable-next-line react/prop-types
const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios("/pacientes", config);
        setPacientes(data);
      } catch (e) {
        console.log(e);
      }
    };
    obtenerPacientes();
  }, [auth]);

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (paciente.id) {
      try {
        const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
        const pacientesActualizado = pacientes.map((pacienteState) =>
          pacienteState._id === data._id ? data : pacienteState
        );
        setPacientes(pacientesActualizado);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const { data } = await clienteAxios.post("/pacientes", paciente, config);
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
        setPacientes([pacienteAlmacenado, pacientes]);
      } catch (e) {
        console.log(e.response.data.msg);
      }
    }
  };

  const setEdicion = (paciente) => {
    setPaciente(paciente);
  };

  const eliminarPaciente = async (id) => {
    const confirmar = confirm("Desea Eliminar el Registro");
    if (confirmar) {
      try {
        console.log(confirmar);
        console.log(`/pacientes/${id}`);
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);
        const pacientesActualizado = pacientes.filter((pacientesState) => pacientesState._id !== id);

        setPacientes(pacientesActualizado);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        paciente,
        guardarPaciente,
        setEdicion,
        eliminarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export { PacientesProvider };

export default PacientesContext;
