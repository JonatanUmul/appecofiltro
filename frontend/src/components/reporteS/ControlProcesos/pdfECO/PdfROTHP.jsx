import React, { useState } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { formatFecha } from '../../../utilidades/FormatearFecta';
import { Modal, ModalBody, Button } from 'reactstrap';

// Estilos para el PDF
const styles = StyleSheet.create({
  container: {
    marginVertical:0,
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    borderWidth: 0,
    marginBottom:0,
    marginLeft:0,
    marginTop:0,
    textAlign:'center'
  },

  title: {
    padding: 8, 
    // marginVertical:0,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    borderWidth: 0.5,
    flex: 1,
    padding: 8,
    fontSize: 10,
    marginBottom:0,
    marginTop:-0.5,
    marginLeft:-0.5,
    marginRight:1

  },

  sectionColumn: {
    flexDirection: 'column',
  },
  sectionHeader: {
    flex:2,
    padding:3,
    maxHeight: '100%',
    // marginHorizontal: 0,
    borderWidth: 0.5,
    // flexDirection: 'column',
    fontWeight: 'bold',
    // borderBottomColor: 'black',
    // borderBottomWidth: 0.5,
    fontSize: 8,
    marginBottom:0,
    marginTop:-0.2,
    marginLeft:-0.2,
    marginRight:0
  },
  page: {
    marginTop:20,
    flexDirection: 'column',
    padding: 40,
  },
  table: {
    width: '100%',
    marginTop: 10,
    marginBottom:20,
  },
  tableHeader: {
   
    textAlign: 'center',
    fontSize: 8,
    flexDirection: 'row',
    backgroundColor: '#ccc',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    borderWidth: 0.2,
  },
  tableCell: {
    fontSize: 8,
    borderColor: 'black',
    borderWidth: 0.2,
    textAlign: 'center',
    borderStyle: 'solid',
    padding: 3,
    flex: 1,
  },
  text: {
    marginLeft: 2,
    textAlign:'center'
  },
  logo: {
    marginHorizontal: 0
  },
  firmas: {
marginLeft:15,
textAlign:'center',
    fontSize: 8,
textAlign:'center',
    marginTop: 8,

  },
  datodFirmas:{
    marginTop:'30%',
    flexDirection:'row'
  
  },
  lineas: {
    fontSize: 8,
    textAlign:'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -5,
    marginRight: 50 // Ajuste para evitar que las líneas se superpongan
  }
});

const MyDocument = ({ datos, patio, fechaSecado, cantidad_final }) => (
  
  <Document>
    <Page style={styles.page}>
      <View style={[styles.container,{textAlign:'center'}]}>
      <View style={[styles.titleContainer,  { flex: 0.7  }]}>
          <Image source="/images/LoogoEco.png" style={[styles.logo, styles.section, styles.title]} />
        </View>
   
        
        <View style={[styles.titleContainer, { flex: 4}]}>
          <Text style={[ styles.title]}>GESTIÓN DE CALIDAD</Text>
          <Text style={[ styles.title]}>CONTROL DE HUMEDAD DE SECADO EN MATERIAS PRIMAS</Text>
        </View>
        <View style={[styles.titleContainer, { flex: 1 }]}>
          <Text style={[ styles.title]}>CODIGO:</Text>
          <Text style={[ styles.title]}>VERSIÓN:</Text>
          <Text style={[ styles.title]}>EMISION:</Text>
        </View>
        <View style={[styles.titleContainer, { flex: 1 }]}>
          <Text style={[ styles.title]}>PRO-FOR-004</Text>
          <Text style={[ styles.title]}>3</Text>
          <Text style={[ styles.title]}>15/03/24</Text>
        </View>
      </View>
    
      <View >
      {/* {datos.map((filas, index) => ( */}
      <View style={[styles.container, { marginTop: 8 }]}>
  <Text style={[styles.sectionHeader, ]}>MATERIA PRIMA:</Text>
  {datos.length > 0 && datos[0] && (
    <Text style={[styles.sectionHeader, ]}>
      {datos[0].materiaPrima}
    </Text>
  )}
  
</View>
     
       
<View style={[styles.container]}>
    <Text style={[styles.sectionHeader]}>Fecha:</Text>
    <Text style={[styles.sectionHeader]}>{fechaSecado}</Text>
  </View>


        <View style={[styles.container]}>
          <Text style={[styles.sectionHeader]}>Patio:</Text>
          <Text style={[styles.sectionHeader]}>{patio}</Text>
        </View>
        <View style={[styles.container, {  }]}>
        
         
          {datos.length > 0 && datos[0] && (
            <Text style={[styles.sectionHeader]}>
            Hora Tendido:   {datos[0].hora_creacion}
            </Text>
          )}

          {datos.length > 0 && datos[0] && (
            <Text style={[styles.sectionHeader]}>
            Hora Recoleccion:   {datos[datos.length - 1].hora_creacion}
            </Text>
          )}
          <Text style={[styles.sectionHeader]}>Cantidad Recolectada: {cantidad_final}</Text>
         
        </View>
       
      </View>
    
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCell}>Hora</Text>
          <Text style={styles.tableCell}>Aserradero</Text>
          <Text style={styles.tableCell}>Centro</Text>
          <Text style={styles.tableCell}>Esquina Inferior Derecha</Text>
          <Text style={styles.tableCell}>Esquina Inferior Izquierda</Text>
          <Text style={styles.tableCell}>Esquina Superior Derecha</Text>
          <Text style={styles.tableCell}>Esquina Superior Izquierda</Text>
          
        </View>
        {datos.map((fila, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{fila.hora_creacion}</Text>
            <Text style={styles.tableCell}>{fila.aserradero}</Text>
            <Text style={styles.tableCell}>{fila.esquinaCentro}</Text>
            <Text style={styles.tableCell}>{fila.esquinaInfDR}</Text>
            <Text style={styles.tableCell}>{fila.esquinaInfIZ}</Text>
            <Text style={styles.tableCell}>{fila.esquinaSupDA}</Text>
            <Text style={styles.tableCell}>{fila.esquinaSupIZ}</Text>
      
          </View>
        ))}
      </View>
      <View style={[styles.datodFirmas,{justifyContent:'center'}]}>
      <View style={[styles.firmas, {textAlign:'center', justifyContent: 'center', flexDirection: 'column' }]}>
      <Text style={[styles.lineas, {textAlign:'center', justifyContent: 'center'}]}>___________________________</Text>
      <Text style={styles.firmas}>F. Encargado de Secado</Text>
        
      </View>
      <View style={[styles.firmas, { textAlign:'center',justifyContent: 'start', flexDirection: 'column' }]}>
      <Text style={[styles.lineas, {textAlign:'center', justifyContent: 'center',}]}> ___________________________</Text> 
      <Text style={styles.firmas}>F. Jefe de Producción</Text>
       
      </View>
    </View>
    
    </Page>
  </Document>
  
);

const PdfROTHP = ({ datos,  patio, fechaSecado, cantidad_final}) => {


  console.log('datos123', patio, fechaSecado, cantidad_final)
  const [isOpen, setIsOpen] = useState(false);

  const togglePDFViewer = () => {
    setIsOpen(!isOpen);
  };

  return (
    
    <div>
      <button className="btn" onClick={togglePDFViewer}><i className="bi bi-file-earmark-pdf"></i></button>
      <Modal isOpen={isOpen} toggle={togglePDFViewer} size="xl">
        <div style={{ position: 'absolute', top: '10px', right: '20px', zIndex: 1 }}>
          <Button close className="btn-close" onClick={togglePDFViewer} style={{ color: 'black', fontSize: '24px' }} />
        </div>
        <ModalBody style={{ margin: 0, padding: 0 }}>
          <PDFViewer width="100%" height="700">
            <MyDocument datos={datos} patio={patio} fechaSecado={fechaSecado} cantidad_final={cantidad_final}  />
          </PDFViewer>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PdfROTHP;
