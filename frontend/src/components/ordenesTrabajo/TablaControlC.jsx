import React, { useEffect, useState } from "react";
import ButtnEst from "./botonOT/EstadoProc";
import axios from "axios";
import { formatFecha } from "../utilidades/FormatearFecta";
import CrearOT from "./botonOT/Crear_OT";
import Detalle from "./botonOT/Detalle";
// import '../maquinaria/TablaEstilos.css'
import { useAbility } from '../AbilityContext';
import ReactPaginate from 'react-paginate';
const URL = process.env.REACT_APP_URL


// const ability = useAbility();
// const [canManageAll, setCanManageAll] = useState(false);


const TablaOT = () => {
  const ability = useAbility();

  const [estOT, setEstot] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
console.log('Datos para el CC',estOT)
  const id_est=2;
console.log('Abiliti en tabla OT', ability)
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        
        const response = await axios.get(`${URL}/DTHH/${'null'}/${'null'}/${'null'}/${'null'}/${'null'}/${id_est ? id_est : 'null'}`)
        setEstot(response.data.data);
      } catch (error) {
        setError("No hay órdenes de trabajo activas en este momento.");
        console.error("Error al obtener los datos:", error);
      }
    };

    obtenerDatos();
  }, []); 

  const selectForm = (id) => {
    
  };


  const puedeGestionar = ability.can('manage', 'all');
  // const puedeGestionar = ability.can('manage', 'all');
  const puedeCrear = ability.can('create', 'OT');
  const puedeVerEstado = ability.can('view', 'Estado');
  console.log('Puede gestionar:', puedeGestionar);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  
  const handleClickButton = (id, encabezado) => {
    console.log("ID:", id);
    console.log("Encabezado:", encabezado);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = estOT.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(estOT.length / itemsPerPage);

  return (
    <div>
   
    <div class="table-responsive-sm" style={{ overflowX: "auto", justifyContent:'center', alignItems:'center' }}>
      {error && <p>{error}</p>}
      <table className=" text-center table" style={{justifyContent:'space-between', textAlign:'center'}}>
        <thead >
          <tr>
           <th scope="col" style={{ width: "1%" }}></th>
            <th scope="col" style={{ width: "1%" }}>
              <i className="bi bi-calendar"></i>
            </th>
            <th scope="col" style={{ width: "1%" }}>
            id
          </th>
            <th scope="col" style={{ width: "1%" }}>
              Codigo Inicio
            </th>
            <th scope="col" style={{ width: "1%" }}>
              Codigo Fin
            </th>
            <th scope="col" style={{ width: "1%" }}>
              Horneado
            </th>
            <th scope="col" style={{ width: "1%" }}>
            Horno
          </th>
            <th scope="col" style={{ width: "1%" }}>
              Hornero
            </th>
            <th scope="col" style={{ width: "1%" }}>
              Turno Horneado
            </th>
            <th scope="col" style={{ width: "1%" }}>
            Crear OT
          </th>
            <th scope="col" style={{ width: "1%" }}>
              Estado
            </th>
            {/* 
            <th scope="col" style={{ width: "0%" }}>
              Eliminar
            </th> 
            */}
          </tr>
        </thead>
        <tbody>
        { currentPageData.map((OTDats, index) => (
            <tr key={index} onClick={() => selectForm(OTDats.encabezado)}>
             <th>
                <Detalle
                  encabezado={OTDats.encabezado}
                  id={OTDats.id}
                />
              </th> 
              <td>{formatFecha(OTDats.fechaHorneado)}</td>
              <td>{OTDats.id}</td>
              <td>{OTDats.codigoInicio}</td>
              <td>{OTDats.codigoInicio}</td>
              <td>{OTDats.horneado}</td>
              <td>{OTDats.enc_maq}</td>
              <td>{OTDats.operarios}</td>
              <td>{OTDats.turno}</td>
             
                <td>
                <CrearOT
                  encabezado={OTDats.tabla}
                  id={OTDats.id}
                  codInicio={OTDats.codigoInicio}
                  codFin={OTDats.CodigoFin}
                  fecha_creacion={OTDats.fecha_creacion}
                />
              </td>
              <td>
                <ButtnEst
                handleClickButton={handleClickButton}
                  id={OTDats.id}
                  encabezado={OTDats.tabla}
                />
              </td>
           
              {/* 
              <td>
                <Eliminar
                  encabezado={OTDats.encabezado}
                  id={OTDats.id}
                />
              </td>
              */}
            </tr>
          ))}
        </tbody>
      </table>
     <ReactPaginate
      previousLabel={'Anterior'}
      nextLabel={'Siguiente'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    /> 
    </div>
  </div>
  );
};

export default TablaOT;
