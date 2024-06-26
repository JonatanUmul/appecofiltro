import React, { useEffect, useState } from "react";
import BotonOT from "./botonOT/BotonOT";
import ButtnEst from "./botonOT/EstadoProc";
import axios from "axios";
import { formatFecha } from "../utilidades/FormatearFecta";
import CrearOT from "./botonOT/Crear_OT";
import Detalle from "./botonOT/Detalle";
import '../maquinaria/TablaEstilos.css';
import { useAbility } from '../AbilityContext';
import ReactPaginate from 'react-paginate';
import TablaControlC from './TablaControlC';
import { Divider } from 'antd';
const URL = process.env.REACT_APP_URL;

const TablaOT = () => {
  const ability = useAbility();
  const [estOT, setEstot] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  console.log('Abiliti en tabla OT', ability);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get(`${URL}/TablaOT`);
        setEstot(response.data);
        console.log("ver aca ", response);
      } catch (error) {
        setError("No hay órdenes de trabajo activas en este momento.");
        console.error("Error al obtener los datos:", error);
      }
    };

    obtenerDatos();
  }, []);

  const selectForm = (id) => {
    // Aquí puedes manejar la selección del formulario
  };

  const handleClickButton = (id, encabezado) => {
    console.log("ID:", id);
    console.log("Encabezado:", encabezado);
  };

  const puedeGestionar = ability.can('manage', 'all');
  const puedeCrear = ability.can('create', 'OT');
  const puedeVerEstado = ability.can('view', 'Estado');
  console.log('Puede gestionar:', puedeGestionar);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = estOT.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(estOT.length / itemsPerPage);

  return (
    <div>
      <Divider style={{ color: '#f5222d' }}>Ordenes de Trabajo</Divider>
      <div className="mb-3">
        <BotonOT />
      </div>
      <div style={{ overflowX: "auto" }} className="table-responsive-sm">
        {error && <p>{error}</p>}
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col" style={{ width: "0%" }}></th>
              <th scope="col" style={{ width: "1%" }}>
                <i className="bi bi-calendar"></i>
              </th>
              <th scope="col" style={{ width: "1%" }}>
                Orden
              </th>
              <th scope="col" style={{ width: "1%" }}>
                Area
              </th>
              <th scope="col" style={{ width: "0%" }}>
                Crear OT
              </th>
              <th scope="col" style={{ width: "0%" }}>
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((OTDats, index) => (
              <tr key={index} onClick={() => selectForm(OTDats.encabezado)}>
                <th>
                  <Detalle
                    encabezado={OTDats.encabezado}
                    EncName={OTDats.EncName}
                    fecha_creacion={OTDats.fecha_creacion}
                    id={OTDats.id}
                  />
                </th>
                <td>{formatFecha(OTDats.fecha_creacion)}</td>
                <td>{OTDats.encabezado}-{OTDats.id}</td>
                <td>{OTDats.EncName}</td>
                <td>
                  <CrearOT
                    encabezado={OTDats.encabezado}
                    EncName={OTDats.EncName}
                    fecha_creacion={OTDats.fecha_creacion}
                    id={OTDats.id}
                  />
                </td>
                <td>
                  <ButtnEst
                    handleClickButton={handleClickButton}
                    id={OTDats.id}
                    encabezado={OTDats.encabezado}
                  />
                </td>
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
      <Divider style={{ color: '#f5222d' }}>Horneados</Divider>
      <TablaControlC />
    </div>
  );
};

export default TablaOT;

