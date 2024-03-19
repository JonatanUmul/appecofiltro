import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css';

const Login = () => {
  // Definimos los estados para el nombre de usuario y la contraseña
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorlogin, setErrorlogin]= useState('');
  const navigate = useNavigate();
console.log(username, password)
  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizamos una solicitud POST al endpoint de login
      const response = await Axios.post('http://localhost:3001/Loginroutes', {
        username: username,
        password: password
      });

      // Si la solicitud es exitosa, imprimimos la respuesta y redirigimos al usuario a la página principal
      console.log('Respuesta del servidor:', response.data);
      console.log('Inicio de sesión exitoso');
      navigate('/Home/Dashboard')
    } catch (error) {
      // Si hay algún error, lo manejamos aquí
      setErrorlogin('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
      setUsername('')
      setPassword('')
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login">
          <form onSubmit={handleSubmit} className="login-form">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={'/images/E.eco.png'} 
                alt="Logo"
                style={{ width: '150px', padding: '15px', marginRight: '10px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username"><UserOutlined /> Usuario</label>
              <input type="text" className="form-control" name="username" id="username" value={username}  onChange={(e)=>setUsername(e.target.value)} required/>
            </div>
            <div className="form-group">
              <label htmlFor="password"><LockOutlined /> Contraseña</label>
              <input type="password" className="form-control" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            {errorlogin && <p>{errorlogin}</p>}

            <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default Login;
