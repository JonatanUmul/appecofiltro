import TablaUser from "../mantenimientos/users/TablaUsuarios";
import TablaRoles from "../mantenimientos/roles/TablaRoles";
import TablaTipProv from "../mantenimientos/proveedores/TablaTipProv";
import TablaEstadosMaq from "../mantenimientos/Estados_Maq/TablaEstaq";
import TablaEstProc from "../mantenimientos/Estados_Proc/TablaEstProc";
import TabProvedores from '../mantenimientos/proveedores/TablaProv';
import TablaMatPrima from '../mantenimientos/materiaPrima/TablaMatPrima';
import TablaOT from '../ordenesTrabajo/TablaOT';
import Buttn from '../ordenesTrabajo/botonOT/BotonOT';
import Dashboard from '../dashbords/Dashboard';
import TablaCP from '../ordenesControlProcesos/TablaCP'
import TablaMaq from '../maquinaria/TablaMaq'
import TableMantenimientoMaq from '../mantenimientosMaq/TablaMantenimientosMaq'
import TablaReportesOT from '../reporteS/humedadPatios/TablaReportesOT'


export const renderContent = (pathname) => {
    switch (pathname) {

      //Ruta para el Dashboard
      case "/Home/Dashboard":
        return <Dashboard/>

      //Ruta tabla de Usuarios
      case "/Home/TablaUser":
        return <TablaUser/>;
  
      //Ruta Tabla Roles
      case "/Home/TablaRoles":
        return <TablaRoles/>;
      //Ruta Tabla Tipo de Provedor
      case "/Home/TablaTipProv":
       return <TablaTipProv/>;
  
      //Ruta Tabla Estados Maquinaria
      case "/Home/TablaEstadosMaq":
       return <TablaEstadosMaq/>;
        //Ruta Tabla Estados Procesos
      case "/Home/TablaEstProc":
        return <TablaEstProc/>
        //Crear Estados de Maquinaria
      case "/Home/TablaMaq":
        return <TablaMaq/>
          //Crear Estados de Maquinaria
      case "/Home/TableMantenimientoMaq":
        return <TableMantenimientoMaq/>
          //Crear Estados de Maquinaria
       
          
  
    
          case "/Home/TabProvedores":
          return <TabProvedores />;
  
          case "/Home/TablaMatPrima":
            return <TablaMatPrima />;
          
              case "/Home/TablaOT":
                return <TablaOT />;
                  
              case "/Home/TablaCP":
                return <TablaCP />;
                case "/Home/Buttn":
                  return <Buttn />

                  case "/Home/TablaReportesOT":
                return <TablaReportesOT />;
                  
     
      default:
        return null;
    }
  };