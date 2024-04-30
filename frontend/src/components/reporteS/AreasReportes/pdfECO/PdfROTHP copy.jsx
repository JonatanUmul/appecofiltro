import React, { useState } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { formatFecha } from '../../../utilidades/FormatearFecta';
import { Modal, ModalBody, Button } from 'reactstrap';

// Estilos para el PDF
const styles = StyleSheet.create({
  container: {
    marginVertical:-1,
    flexDirection: 'row',
    // borderBottomColor: 'black',
    // borderBottomWidth: 0.5,
    // borderWidth: 0.2,
    textAlign:'center'
  },
  titleContainer: {
    marginVertical:-2,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 0,
    // borderColor: 'black',
    marginLeft: 2,
  },
  title: {
    padding: 8, 
    marginVertical:-1,
    marginHorizontal: -1,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    // borderBottomWidth: 0.5,
    borderWidth: 1,
    flex: 1
  },
  section: {
   
    marginVertical: 0,
    marginHorizontal: 0,
    padding: 8,
    // borderRightColor: 'black',
    // borderRightWidth: 1,
    fontSize: 10,
    borderWidth: 0.2,
  },
  sectionColumn: {
    flexDirection: 'column',
  },
  sectionHeader: {
    maxHeight: '100%',
    marginHorizontal: 0,
    borderWidth: 0.2,
    flexDirection: 'column',
    fontWeight: 'bold',
    // borderBottomColor: 'black',
    // borderBottomWidth: 0.5,
    fontSize: 8,
  },
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  table: {
    width: '100%',
    marginTop: 10,
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
  },
  logo: {
    marginHorizontal: -1,
  },
  firmas: {
    fontSize: 8,
    flexDirection: 'row',
    justifyContent: 'start',
    marginTop: 5,
    marginLeft: 20
  },
  lineas: {
    fontSize: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -5,
    marginRight: 5 // Ajuste para evitar que las líneas se superpongan
  }
});

const MyDocument = ({ datos }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.container}>
        <View style={[styles.titleContainer, { flex: 0.5, justifyContent: 'center'}]}>
          <Image source="/images/LoogoEco.png" style={styles.logo} />
        </View>
        <View style={[styles.titleContainer, { flex: 4,   }]}>
          <Text style={[styles.section, styles.title]}>GESTIÓN DE CALIDAD</Text>
          <Text style={[styles.section, styles.title]}>CONTROL DE HUMEDAD DE SECADO EN MATERIAS PRIMAS</Text>
        </View>
        <View style={[styles.titleContainer, { flex: 1 }]}>
          <Text style={[styles.section, styles.title]}>CODIGO:</Text>
          <Text style={[styles.section, styles.title]}>VERSIÓN:</Text>
          <Text style={[styles.section, styles.title]}>EMISION:</Text>
        </View>
        <View style={[styles.titleContainer, { flex: 1 }]}>
          <Text style={[styles.section, styles.title, {textAlign:'justify'}]}>PRO-FOR-004</Text>
          <Text style={[styles.section, styles.title, {textAlign:'justify'}]}>3</Text>
          <Text style={[styles.section, styles.title, {textAlign:'justify'}]}>15/03/24</Text>
        </View>
      </View>
      <View >
        <View style={[styles.container, { marginTop: 8 }]}>
          <Text style={[styles.sectionHeader, { flex: 2, padding:3 }]}>MATERIAS PRIMAS:</Text>
          <Text style={[styles.sectionHeader, { flex: 2, padding:3 }]}>BARRO</Text>
          <Text style={[styles.sectionHeader, { flex: 2, padding:3 }]}>ASERRIN</Text>
        </View>
        <View style={[styles.container, { border:0.5 }]}>
          <Text style={[styles.sectionHeader, { flex: 2, padding:3 }]}>FECHA:</Text>
          <Text style={[styles.sectionHeader, { flex: 2, padding:3 }]}> {formatFecha(new Date())}</Text>
        </View>
        <View style={[styles.container, {  }]}>
          <Text style={[styles.sectionHeader, { flex: 2, padding:3 }]}>patio:</Text>
          <Text style={[styles.sectionHeader, { flex: 2,padding:3 }]}> </Text>
        </View>
        <View style={[styles.container, {  }]}>
          <Text style={[styles.sectionHeader, { flex: 2 ,padding:3 }]}>Hora Tendido</Text>
          <Text style={[styles.sectionHeader, { flex: 2,padding:3 }]}>Hora Recoleccion</Text>
          <Text style={[styles.sectionHeader, { flex: 2 ,padding:3}]}>Cantidad Recolectada</Text>
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
      <View style={styles.firmas}>
        <Text style={styles.lineas}> __________________________ </Text>
        <Text style={styles.lineas}> __________________________  </Text>
      </View>
      <View style={styles.firmas}>
        <Text style={styles.firmas}>Encargado de Secado</Text>
        <Text style={styles.firmas}>Jefe de Producción</Text>
      </View>
    </Page>
  </Document>
);

const PdfROTHP = ({ datos }) => {
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
          <PDFViewer width="100%" height="900">
            <MyDocument datos={datos} />
          </PDFViewer>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PdfROTHP;
