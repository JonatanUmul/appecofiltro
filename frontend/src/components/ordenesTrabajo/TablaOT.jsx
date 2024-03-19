import React, { useEffect, useState } from "react";
import BotonOT from "./botonOT/BotonOT";
import ButtnEst from "./botonOT/EstadoProc";
import axios from "axios";
import { formatFecha } from "../utilidades/FormatearFecta";
import CrearOT from "./botonOT/Crear_OT";
import Detalle from "./botonOT/Detalle";
import '../maquinaria/TablaEstilos.css'


const TablaOT = ({OTDats}) => {
  const [estOT, setEstot] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/TablaOT");
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
    
  };

  const handleClickButton = (id, encabezado) => {
    // Aquí puedes trabajar con el id y el encabezado recibidos
    console.log("ID:", id);
    console.log("Encabezado:", encabezado);
    // Luego puedes realizar la operación que necesites con estos datos
  };


  return (
    <div>
      <div className="mb-3">
        <BotonOT />
      </div>
      <div style={{ overflowX: "auto" }}>
        {error && <p>{error}</p>}
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col" style={{ width: "0%" }}></th>
              <th scope="col" style={{ width: "1%" }}>
              <i class="bi bi-calendar"></i>
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
              {/* <th scope="col" style={{ width: "0%" }}>
                Eliminar
              </th> */}
            </tr>
          </thead>
          <tbody>
            {estOT.map((OTDats, index) => (
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
                </td>{" "}
                {/* Pasando el ID como propiedad */}
                <td>
                  <ButtnEst
                    handleClickButton={handleClickButton} // Pasar la función handleClickButton como prop
                    id={OTDats.id}
                    encabezado={OTDats.encabezado}
                  />
                </td>
                {/* <td>
                <Eliminar
                encabezado={OTDats.encabezado}
                 id={OTDats.id}/>



                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaOT;
