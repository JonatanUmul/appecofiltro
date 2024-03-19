import React from 'react';
import DasTempHornos from './DasTempHornos';

const App = () => {
  const temperatureData = [
    { time: '8:00 AM', temperatura: 20 },
    { time: '9:00 AM', temperatura: 160},
    { time: '10:00 AM', temperatura: 200 },
    { time: '12:00 PM', temperatura: 350 },
    { time: '13:00 PM', temperatura: 550 },
    { time: '14:00 PM', temperatura: 650 },
    { time: '15:00 PM', temperatura: 700 },
    // ...
  ];

  return (
    <div>
      <p>Horno 1</p>
      <DasTempHornos data={temperatureData} />
    </div>
  );
};

export default App;
