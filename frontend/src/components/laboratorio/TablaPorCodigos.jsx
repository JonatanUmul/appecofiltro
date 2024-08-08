import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { formatFecha } from "../utilidades/FormatearFecta.js";
// import PdfROTCA1 from './pdfECO/PdfROTCA1.jsx'
import ExcelROTCA1 from './Excel/ExcelPorCodigoscopy.jsx'
import ExcelROTCA2 from './Excel/ExcelPorCodigos.jsx'
// import { Divider } from 'antd';
import ReactPaginate from 'react-paginate';
const URL = process.env.REACT_APP_URL

const ROTHP = () => {
  const [datos, setDatos] = useState([]);
  const [aserradero, setAserradero] = useState([]);
  const [materiaPrim, setMatPrim] = useState([]);
  const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
  const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
  const [id_aserradero, setIdAserradero] = useState('');

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  const limpiarInputs = () => {
    setFecha(formatFecha(new Date()));
    setFecha2(formatFecha(new Date()));
    setIdAserradero('');

  };
  console.log(fecha_creacion_inicio, fecha_creacion_fin)
  // Solicitud GET desde React
  useEffect(() => {
    // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
    const url = `${URL}/TablaPorCodigos/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}`;

    axios.get(url)
      .then((response) => {
        setDatos(response.data);
        console.log('datos consulta', response.data.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, [fecha_creacion_inicio,fecha_creacion_fin, id_aserradero]);
console.log('datos', datos)
  // Realizar las solicitudes para obtener datos
  useEffect(() => {
    axios.all([
      axios.get(`${URL}/Aserradero`),
      axios.get(`${URL}/MateriaPrima`),
   
    ])
    .then(axios.spread((aserraderoResponse, materiaPrimResponse, ) => {
      setAserradero(aserraderoResponse.data);
      setMatPrim(materiaPrimResponse.data);
    
    }))
    .catch((error) => {
      console.error('Error al obtener los datos:', error);
    });
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = datos.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(datos.length / itemsPerPage);
  const[produccion, setProduccion]=useState(0) 
  const [aprobados, setAprobados]=useState(0)
  const[altos, setAltos]=useState(0)
  const[Bajos, setBajos]=useState(0)
  const[rajado, SetRajado]=useState(0)
  const[ahumado,setAhumado]=useState(0)
  const[porcentageAprobado, setPorcentageAprobados]=useState(0)
  const[rajadoCrudo, SetRajadoCrudo]=useState(0)
  useEffect(()=>{
    setProduccion(datos.filter(dato=> dato.estadouf).length);    
    setAprobados(datos.filter(dato=> dato.estadouf === 'OK').length);
    setBajos(datos.filter(dato=> dato.estadouf === 'Bajo').length);
    setAltos(datos.filter(dato=> dato.estadouf === 'Alto').length);
    SetRajado(datos.filter(dato=> dato.estadouf === 'Rajado').length);    
    setAhumado(datos.filter(dato=> dato.estadouf === 'Ahumado').length);
    SetRajadoCrudo(datos.filter(dato=> dato.estadoCrudo === 'Rajado').length);
    setPorcentageAprobados((aprobados/produccion)*100)
  })
console.log(aprobados)


  return (
    <div className="row mb-3">
{/*    <Divider style={{ color: '#1d39c4'}}>Cernido 1</Divider> */}

    <div className="row mb-3">
  <div className="col-md-3">
    <label htmlFor="fecha" className="form-label">Fecha 1 </label>
    <input className="form-control" type="date" value={fecha_creacion_inicio} onChange={(e) => setFecha(e.target.value)} />
  </div>
  <div className="col-md-3">
    <label htmlFor="fecha" className="form-label">Fecha 2</label>
    <input className="form-control" type="date" value={fecha_creacion_fin} onChange={(e) => setFecha2(e.target.value)} />
  </div>
  <div className="col-md-3">
    <label htmlFor="aserradero" className="form-label">Aserradero:</label>
    <select className="form-select" name="id_aserradero" value={id_aserradero} onChange={(e) => setIdAserradero(e.target.value)}>
    <option value="" disabled selected>Seleccione...</option>
      {Array.isArray(aserradero.rows) && aserradero.rows.map((item) => (
        <option key={item.id} value={item.id}>{item.nombre_aserradero}</option>
      ))}
    </select>
  </div>

  <div className="col-md-3 d-flex align-items-end">
    <button className="btn btn-primary ms-2" onClick={limpiarInputs}>Limpiar</button>
  </div>
{datos.length>=0?(
  <div class="container text-center mt-3">
  <div class="row">
    <div class="col">
    Producido: {produccion}
    </div>
    <div class="col">
    Rajado Crudo: {rajadoCrudo}
    </div>
    <div class="col">
    Aprobados: {aprobados}
    </div>
    <div class="col">
    Bajos: {Bajos}
    </div>
    <div class="col">
    Altos: {altos}
    </div>
    <div class="col">
    Rajado C.c: {rajado}
    </div>
    <div class="col">
    Ahumado: {ahumado}
    </div>
  </div>
</div>
):''}
  
  <div className="col-md-3 d-flex align-items-end">

 {/*<p>{(porcentageAprobado.toFixed(2))}</p> */}
  <ExcelROTCA1 datos={datos}/>
  <ExcelROTCA2 datos={datos}/>
{/*<PdfROTCA1 datos={datos}/> */}
  </div>
 


</div>

      <table className="table text-center">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Producción</th>
            <th scope="col">Código</th>
            <th scope="col">Tipo de Filtro</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Cantidad de aserrín</th>
          
            <th scope="col">Horno</th>
            <th scope="col">Estado</th>
            <th scope="col">Tasa</th>
            <th scope="col">Temperatura</th>
          </tr>
        </thead>
        <tbody>

          {Array.isArray(currentPageData) && currentPageData.map((fila, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{formatFecha(fila.fecha_produccion) }</td>
              <td>{fila.codigos}</td>
              <td>{fila.ufmodelo}</td>
              <td>{fila.Aserraderos}</td>
     
              <td>{fila.formulaC}</td>
      
              <td>{fila.horno}</td>
              <td>{fila.estadouf}</td>
              <td>{fila.tasa}</td>
              <td>{fila.promedio}</td>
            </tr>
          ))}
          <tr>
</tr>
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
  );
}

export default ROTHP;
