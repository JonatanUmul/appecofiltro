import React, { useState } from 'react';
import { Button, Dropdown, Flex } from 'antd';
import { redirect } from 'react-router-dom';
import PlanificacionDiario from './PlanificacionDiario'
const App = () => {
  const [item, setItem]=useState('')  
const items = [
    {
      key: '1',
      label: 'Mensual',
    },
    {
      key: '2',
      label: 'Diario',
    },
    
  ];
  
    const onMenuClick = (e) => {
  
        console.log(item)
      console.log('click', e);
      setItem(e.key)
      
    };
    console.log('Item capturado', item)
switch(item){
    case "1":
        return ''
    case "2": 
        return <PlanificacionDiario/>
    
}

    return(
  <Flex align="flex-start" gap="small" vertical>
       <Dropdown.Button
      menu={{
        items,
        onClick: onMenuClick,
      }}
    >
      Plan
    </Dropdown.Button>
  </Flex>



)};
export default App;