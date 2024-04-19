import React, { useRef } from 'react';

const TomarFoto = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Función para iniciar la cámara y tomar la foto
  const tomarFoto = async () => {
    try {
      // Acceder a la cámara del dispositivo
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  };

  // Función para capturar la imagen
  const capturarImagen = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Establecer el tamaño del canvas para que coincida con el tamaño del video
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    // Dibujar el video en el canvas
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      {/* Elemento de video para mostrar la vista previa de la cámara */}
      <video ref={videoRef} autoPlay muted style={{ display: 'none' }}></video>

      {/* Botón para iniciar la cámara */}
      <button onClick={tomarFoto}>Iniciar cámara</button>

      {/* Botón para capturar la imagen */}
      <button onClick={capturarImagen}>Tomar foto</button>

      {/* Canvas para mostrar la imagen capturada */}
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default TomarFoto;
