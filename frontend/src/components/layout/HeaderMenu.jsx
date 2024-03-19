import React from 'react'
import {Layout, theme } from 'antd';
import LogoEco from '../utilidades/LogoEco';


const { Header } = Layout;
const HeaderMenu = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
  return (
   
    <Header
    style={{
      padding: 0,
      background: colorBgContainer,
    }}
  >

          <LogoEco/>
    
  </Header>
  
  )
}

export default HeaderMenu