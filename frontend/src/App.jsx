import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import RutaProtejida from "./layout/RutaProtegida";
import AdministrarPacientes from "./paginas/AdministrarPacientes";

import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import OlvidePassword from "./paginas/OlvidePassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import NuevoPassword from "./paginas/NuevoPassword";
import { AuthProvider } from "./context/authProvider";
import { PacientesProvider } from "./context/PacienteProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>
            <Route path="/admin" element={<RutaProtejida />}>
              <Route index element={<AdministrarPacientes />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
