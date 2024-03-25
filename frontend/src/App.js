// App.js

import './App.css'
import Layout from './components/layout/Layout'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from './components/Login'
import User from './components/mantenimientos/users/Usr';
import TablaUser from './components/mantenimientos/users/TablaUsuarios'
import TablaRoles from './components/mantenimientos/roles/TablaRoles'
import Roles from './components/mantenimientos/roles/Roles'
import Dashboard from './components/dashbords/Dashboard'
import TablaTipProv from './components/mantenimientos/proveedores/TablaTipProv'
import CreateTipProv from './components/mantenimientos/proveedores/TipProvedor'
import TablaEstadosMaq from './components/mantenimientos/Estados_Maq/TablaEstaq'
import CrearEstMaq from './components/mantenimientos/Estados_Maq/EstadosMaq'
import TablaEstProc from './components/mantenimientos/Estados_Proc/TablaEstProc'
import CrearEstadoProc from './components/mantenimientos/Estados_Proc/CrearEstadoProc'
import FormCrearProv from './components/mantenimientos/proveedores/Form.CreatProv'
import TabProvedores from './components/mantenimientos/proveedores/TablaProv'
import TablaMatPrima from './components/mantenimientos/materiaPrima/TablaMatPrima'
import CrearMatPrima from './components/mantenimientos/materiaPrima/Form.CrearMatPrima'
import TablaOT from './components/ordenesTrabajo/TablaOT'
import TablaCP from './components/ordenesControlProcesos/TablaCP'
import TableMantenimientoMaq from './components/mantenimientosMaq/TablaMantenimientosMaq'
import TablaMaq from './components/maquinaria/TablaMaq'
import Buttn from './components/ordenesTrabajo/botonOT/BotonOT'
import TablaReportesOT from './components/reporteS/humedadPatios/TablaReportesOT'


 

function App() {
  return (
    <Router>
      <Routes>
        
      <Route  path="/" element={<Login />} />
      <Route path="/Home"   element={<Layout />}>
        

              {/*Mantenimientos*/}
                  
          <Route path="/Home/TablaUser" element={<TablaUser />} />  {/*Tabla de Usuarios*/}
          <Route path="/Home/User" element={<User />} />            {/*Fomrulario para Crear Usuarios*/}

          <Route path="/Home/TablaRoles" element={<TablaRoles />} /> {/*Tabla de Roles*/}
          <Route path="/Home/Roles" element={<Roles />} />           {/*Fomrulario para Crear Roles*/}
          
          <Route path="/Home/TablaTipProv" element={<TablaTipProv />} />      {/*Tabla de Tipo de Proveedor*/}
          <Route path="/Home/CreateTipProv" element={<CreateTipProv />} />    {/*Fomrulario para Crear Ripos de Proveedor*/}

          <Route path="/Home/TablaEstadosMaq" element={<TablaEstadosMaq />} />  {/*Tabla de Tipo Estados de Maquinaria*/}
          <Route path="/Home/CrearEstMaq" element={<CrearEstMaq />} />       {/*Fomrulario para Crear Estados de Maquinaria*/}

          <Route path="/Home/TablaEstProc" element={<TablaEstProc />} />           {/*Tabla Estados de Procesos*/}
          <Route path="/Home/CrearEstadoProc" element={<CrearEstadoProc />} />    {/*Fomrulario para Crear estados de Procesos*/}
        
          <Route path="/Home/Dashboard" element={<Dashboard />} />           {/*Dashboard de inicio*/}

          <Route path="/Home/TabProvedores" element={<TabProvedores />} />     {/*Tabla Proveedores*/}  
          <Route path="/Home/FormCrearProv" element={<FormCrearProv />} />           {/*Dashboard de inicio*/}

          <Route path="/Home/TablaMatPrima" element={<TablaMatPrima />} />
          <Route path="/Home/CrearMatPrima" element={<CrearMatPrima />} />
          <Route path="/Home/TableMantenimientoMaq" element={<TableMantenimientoMaq />} />


          {/*Tabla OT*/}
          <Route path="/Home/TablaOT" element={<TablaOT />} />
          <Route path="/Home/TablaCP" element={<TablaCP />} />
          <Route path="/Home/TablaMaq" element={<TablaMaq />} />
          <Route path="/Home/Buttn" element={<Buttn />} />
          <Route path="/Home/TablaReportesOT" element={<TablaReportesOT />} />


          

</Route>
          
      </Routes>
    </Router>
  );
}

export default App;
