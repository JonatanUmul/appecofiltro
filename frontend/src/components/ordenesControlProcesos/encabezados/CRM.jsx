import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";



const FormEHP = () => {
  const { handleSubmit, register } = useForm();
  const [datos, setDatos] = useState({
    id_creador: "",
  });
  
  


  const onSubmit = async (formData) => {
    // formData.preventDefault();
    try {
      // Actualizar el estado 'datos' con los valores del formulario
      setDatos("id_creador", formData.id_creador);
    
      // Realizar la solicitud POST al servidor con los datos del formulario
      const response = await axios.post(
        'http://localhost:3001/CRM',
        formData
      );
      window.location.href = "/Home/TablaCP";
      console.log("Respuesta del servidor:", response.data);
      // Aquí podrías agregar lógica adicional, como mostrar un mensaje de éxito al usuario, por ejemplo
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Aquí podrías manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  const currentDate = new Date();
const dayMonthYear = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

 


  // console.log(estados);
  return (
    <div className="mt-4 text-center">
  {/* <h5 className="text-muted">Orden de Trabajo - Secado de Materia Prima</h5> */}
  <div className="container">
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="mb-3">
        <h1>Reporte de Mermas</h1>
        <h5 className="mt-3">Con fecha:</h5>
        <p>{dayMonthYear}</p>
      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary mt-5">
          Crear
        </button>
      </div>
    </form>
  </div>
</div>

  );
};


    export default FormEHP;
