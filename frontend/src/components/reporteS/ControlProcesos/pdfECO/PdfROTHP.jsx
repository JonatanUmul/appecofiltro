import React, { useState } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { formatFecha } from '../../../utilidades/FormatearFecta';
import { Modal, ModalBody, Button } from 'reactstrap';

const styles = StyleSheet.create({
  container: {
    marginVertical: -1,
    flexDirection: 'row',
    textAlign: 'center',
    borderRadius:5
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 30,
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
    textAlign: 'center',
  },
  cardText: {
    fontSize: 12,
    marginBottom: 10,
  },
  titleContainer: {
    marginVertical: -2,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 0,
    marginLeft: 2,
  },
  title: {
    padding: 8,
    marginVertical: -1,
    marginHorizontal: -1,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    borderWidth: 1,
    flex: 1,
  },
  section: {

    padding: 8,
    fontSize: 10,
    borderWidth: 0.1,
  marginBottom:1,
    borderBottom:0.5,
borderTop:0.5,
borderLeft:0.5,
borderRight:0.5,
marginBottom:30
  },
  sectionColumn: {
    flexDirection: 'column',
  },
  sectionHeader: {
    maxHeight: '100%',
borderBottom:0.4,
borderTop:0.4,
borderLeft:0.4,
borderRight:0.4,
    marginBottom:1.7,
    flexDirection: 'column',
    fontWeight: 'bold',
    fontSize: 8,


  },
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  table: {
    width: '100%',
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
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
  },
  tableCell: {
    marginBottom:0,
    fontSize: 8,
    textAlign: 'center',
    borderWidth: 0.3,
    borderBottom:0.3,
    borderTop:0.3,
    borderStyle: 'solid',
    borderColor: 'black',
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
    marginLeft: 20,
  },
  lineas: {
    fontSize: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -5,
    marginRight: 5,
  },
  headd:{
    width: '100%',
    marginTop: 10,
   
  }
});

const MyDocument = ({ datos }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.container}>
        <View style={[styles.titleContainer, { flex: 0.5, justifyContent: 'center' }]}>
          <Image source="/images/LoogoEco.png" style={styles.logo} />
        </View>
        <View style={[styles.titleContainer, { flex: 4 }]}>
          <Text style={[styles.section, styles.title]}>GESTIÓN DE CALIDAD</Text>
          <Text style={[styles.section, styles.title]}>CONTROL DE HUMEDAD DE SECADO EN MATERIAS PRIMAS</Text>
        </View>
        <View style={[styles.titleContainer, { flex: 1 }]}>
          <Text style={[styles.section, styles.title]}>CODIGO:</Text>
          <Text style={[styles.section, styles.title]}>VERSIÓN:</Text>
          <Text style={[styles.section, styles.title]}>EMISION:</Text>
        </View>
        <View style={[styles.titleContainer, { flex: 1 }]}>
          <Text style={[styles.section, styles.title, { textAlign: 'justify' }]}>PRO-FOR-004</Text>
          <Text style={[styles.section, styles.title, { textAlign: 'justify' }]}>3</Text>
          <Text style={[styles.section, styles.title, { textAlign: 'justify' }]}>15/03/24</Text>
        </View>
      </View>

      <View style={ styles.headd}>
        <View style={styles.container}>
          <Text style={[styles.sectionHeader, { flex: 1, padding: 3,     borderTopLeftRadius:5, }]}>MATERIA PRIMA:</Text>
          <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>{datos[0].materiaPrima}</Text>
      
          <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>FECHA:</Text>
          <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>
            {formatFecha(datos[0].fecha_creacion)}
          </Text>
        </View>

        <View style={styles.container}>
          <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>Patio:</Text>
          <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>{datos[0].patio}</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.sectionHeader, { flex: 1, padding: 3 ,     borderBottomLeftRadius:5,}]}>Hora Tendido: {datos[0].hora_creacion}</Text>
          <Text style={[styles.sectionHeader, { flex: 1, padding: 3 }]}>Hora Recolección: {datos[datos.length - 1].hora_creacion}</Text>
          <Text style={[styles.sectionHeader, { flex: 1, padding:0, borderBottomRightRadius:5 }]}>Cantidad Recolectada</Text>
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

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>COMENTARIOS</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardText}></Text>
        </View>
      </View>

      <View style={styles.firmas}>
        <Text style={styles.lineas}> __________________________ </Text>
        <Text style={styles.lineas}> __________________________ </Text>
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
      <Modal isOpen={isOpen} toggle={togglePDFViewer} size="lg">
        <ModalBody>
          <PDFViewer style={{ width: '100%', height: '80vh' }}>
            <MyDocument datos={datos} />
          </PDFViewer>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PdfROTHP;
