import React from 'react';

const DasTempHornos = () => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <iframe
        title="reporteProduccion"
        width="800"
        height="480"
        src="https://app.powerbi.com/view?r=eyJrIjoiMjIwYzFjZjEtYzcwMi00MzczLTk4ODMtOTFkYjYxOTMzNGViIiwidCI6ImNmMjViNGI0LTQzOWYtNGEwYy1iOTg0LWI1NGU0OGMzMmNlNCJ9"
        frameBorder="0"
        allowFullScreen="true"
        style={{ border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
      ></iframe>
    </div>
  );
};

export default DasTempHornos;
