import React from 'react';
import { Layout } from 'antd';

import SideMenu from './SideMenu';
import HeaderMenu from './HeaderMenu';
import ContentMenu from './ContenteMenu';
import FooterMenu from './FooterMenu';

const { Content } = Layout;

const MainLayout = () => {
  return (
   
    <Layout className="min-vh-100">
      <SideMenu />
      <Layout>
        <HeaderMenu />
        <Content className="p-3">
          <ContentMenu />
        </Content>
        <FooterMenu />
      </Layout>
    </Layout>
 
  );
};

export default MainLayout;
