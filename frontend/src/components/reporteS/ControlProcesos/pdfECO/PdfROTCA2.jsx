import React, { useState } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { formatFecha } from '../../../utilidades/FormatearFecta';
import { Modal, ModalBody, Button } from 'reactstrap';

// Estilos para el PDF
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
  },
  cardHeader: {
    backgroundColor: '#ccc',
    
    color: 'black',
    padding: 8,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    fontSize: 13,
    fontWeight: 'bold',
  },
  cardBody: {
    padding: 50,
  },
  cardTitle: {
    fontSize: 8,
    textAlign:'center'

  },
  cardText: {
    fontSize: 12,
    marginBottom: 10,
  },
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
    marginTop:'5%',
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
    <View style={[styles.container, { textAlign: 'center' }]}>
      <View style={[styles.titleContainer, { flex: 0.7 }]}>
        <Image source="/images/LoogoEco.png" style={[styles.logo, styles.section, styles.title]} />
      </View>

      <View style={[styles.titleContainer, { flex: 4 }]}>
        <Text style={[styles.title]}>GESTIÓN DE CALIDAD</Text>
        <Text style={[styles.title]}>CONTROL CERNIDO DE ASERRIN 2</Text>
      </View>

      <View style={[styles.titleContainer, { flex: 1 }]}>
        <Text style={[styles.title,{justifyContent:'ce'}]}>CODIGO:</Text>
        <Text style={[styles.title]}>VERSIÓN:</Text>
        <Text style={[styles.title]}>EMISION:</Text>
      </View>

      <View style={[styles.titleContainer, { flex: 1 }]}>
        <Text style={[styles.title]}>PRO-FOR</Text>
        <Text style={[styles.title]}>3</Text>
        <Text style={[styles.title]}>15/03/24</Text>
      </View>
    </View>

   

    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableCell}>Fecha</Text>
        <Text style={styles.tableCell}>Aserradero</Text>
        <Text style={styles.tableCell}>Cantidad Inicial</Text>
        <Text style={styles.tableCell}>Cernido Fino</Text>
        <Text style={styles.tableCell}>Cernido Grueso</Text>
        <Text style={styles.tableCell}>Merma</Text>
  
      </View>
      {datos.map((fila, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.tableCell}>{formatFecha(fila.fecha_creacion)}</Text>
          <Text style={styles.tableCell}>{fila.aserradero}</Text>
          <Text style={styles.tableCell}>{fila.cantidad_inicial}</Text>
          <Text style={styles.tableCell}>{fila.cernido_fino}</Text>
          <Text style={styles.tableCell}>{fila.cernido_grueso}</Text>
          <Text style={styles.tableCell}>{fila.merma}</Text>
                  
        </View>
      ))}
    </View>

    <View style={styles.card}>
    <View style={[styles.cardHeader]}>
    <Text style={styles.cardTitle}>COMENTARIOS</Text>
    </View>
    <View style={styles.cardBody}>
      
      <Text style={styles.cardText}></Text>
    </View>
  </View>
    

    <View style={[styles.datodFirmas, { justifyContent: 'center' }]}>
      <View style={[styles.firmas, { textAlign: 'center', justifyContent: 'center', flexDirection: 'column' }]}>
        <Text style={[styles.lineas, { textAlign: 'center', justifyContent: 'center' }]}>___________________________</Text>
        <Text style={styles.firmas}>F. Encargado de Secado</Text>
      </View>
      <View style={[styles.firmas, { textAlign: 'center', justifyContent: 'start', flexDirection: 'column' }]}>
        <Text style={[styles.lineas, { textAlign: 'center', justifyContent: 'center' }]}> ___________________________</Text>
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
