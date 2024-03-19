import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// import './user.css'

const Usr = () => {
  const { handleSubmit, register } = useForm();
  const [roles, setRoles] = useState([]);
  const [estados, setEstados] = useState([]);
  const [datos, setDatos] = useState({
    username: "",
    name: "",
    mail: "",
    phoneNumber: "",
    contraseña: "",
    phone: "",
    rol: "",
    estado: "",
  });
  
  
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/EstadosProc"),
      axios.get("http://localhost:3001/Rolrouter"),
    ])
      .then(([estadosResponse, rolesResponse]) => {
        setEstados(estadosResponse.data);
        setRoles(rolesResponse.data);
        console.log("Datos de Estadosroutes:", estadosResponse.data);
        console.log("Datos de Rolrouter:", rolesResponse.data);
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const onSubmit = async (formData) => {
    // formData.preventDefault();
    try {
      // Actualizar el estado 'datos' con los valores del formulario
      setDatos("username", formData.username);
      setDatos("name", formData.name);
      setDatos("mail", formData.mail);
      setDatos("phone", formData.phone);
      setDatos("password", formData.password);
      setDatos("rol", formData.rol);
      setDatos("estado", formData.estado);

      // Realizar la solicitud POST al servidor con los datos del formulario
      const response = await axios.post(
        "http://localhost:3001/UsuariosR",
        formData
      );
      console.log("Respuesta del servidor:", response.data);
      // Aquí podrías agregar lógica adicional, como mostrar un mensaje de éxito al usuario, por ejemplo
      window.location.href = "/Home/TablaUser";
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Aquí podrías manejar el error, mostrar un mensaje al usuario, etc.
    }
  };


  // console.log(estados);
  return (
    <div className="mt-1">
      <div className="">
        {/* <h2 className="titulo card-title text-center mb-4">
          Crear nuevo usuario
        </h2> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              {...register("username")}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              {...register("name")}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mail" className="form-label">
              Correo
            </label>
            <input
              type="text"
              className="form-control"
              id="mail"
              {...register("mail")}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Teléfono
            </label>
            <input
              type="number"
              className="form-control"
              id="phone"
              {...register("phone")}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="text"
              className="form-control"
              id="password"
              {...register("password")}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="estados" className="form-label">
              Estado
            </label>
            <select
  className="select form-select"
  id="estados"
  {...register("estado")} // Cambiado de "rol" a "estado"
>
{Array.isArray(estados.rows) &&
                estados.rows.length > 0 &&
                estados.rows.map((estado) => (
                  <option key={estado.id_est} value={estado.id_est}>
                    {estado.estado}
                  </option>
                ))}
</select>
          </div>
          <div className="mb-3">
            <label htmlFor="rol" className="form-label">
              Rol
            </label>
        
            <select
              className="select form-select"
              id="rol"
              {...register("rol")}
            >
              {Array.isArray(roles.rows) &&
                roles.rows.length > 0 &&
                roles.rows.map((rol) => (
                  <option key={rol.id_rol} value={rol.id_rol}>
                    {rol.rol}
                  </option>
                ))}
            </select>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default Usr;
