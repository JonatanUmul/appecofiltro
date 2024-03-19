 // Función para formatear la fecha
 export const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const dia = date.getDate();
    const mes = date.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
    const año = date.getFullYear();
    // return `${dia < 10 ? '0' + dia : dia}-${mes < 10 ? '0' + mes : mes}-${año}`;
    return `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
};
