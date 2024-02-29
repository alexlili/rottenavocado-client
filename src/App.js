import React, { useState, useEffect } from "react";

import {
  HomeOutlined, LogoutOutlined, TwitterOutlined, MenuOutlined,HeartOutlined,TikTokOutlined ,InstagramOutlined, YoutubeOutlined, FacebookOutlined,createFromIconfontCN
} from '@ant-design/icons';
import { Flex,ConfigProvider, Layout, Menu, theme, Breadcrumb, Button,Input } from 'antd';

import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator
} from "@aws-amplify/ui-react";
import {useNavigate } from "react-router-dom";
import { NavLink, Outlet, useLocation } from "react-router-dom";
const { Header, Content, Footer } = Layout;
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
const App = () => {
const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // 定义selectedKeys，来控制菜单选中状态和切换页面
  const [selectedKeys, setSelectedKeys] = useState([]);
  // useLocation react-router自带hook，能获取到当前路由信息
  const location = useLocation();
  // 每次切换路由，获取当前最新的pathname,并赋给menu组件
  useEffect(() => {
    // location.pathname对应路由数据中的path属性
    setSelectedKeys([location.pathname]);
  }, [location]);
  const onSearch = ()=>{}
  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: '#fff',
          // Seed Token
          colorPrimary: '#f5c518',
          borderRadius: 4,

          // Alias Token
          colorBgContainer: '#f5c518',
        },
        components: {
          Button: {
            colorText: '#000',
            fontWeight: 'bold',
            defaultBg: '#f5c518',
            defaultBorderColor: '#f5c518',
            defaultHoverBg: 'rgba(245,197,24,0.9)',
            defaultHoverBorderColor: 'rgba(245,197,24,0.9)',
            defaultHoverColor: 'rgb(0,0,0)',
            defaultActiveBorderColor: '#f5c518',
            defaultActiveColor: '#f5c518',

          },
          Input: {
            colorPrimary: '#f5c518',
            algorithm: true, // Enable algorithm
          }
        },
      }}
    >
      <Layout style={{  backgroundColor: 'rgb(18,18,18)' }}>
        <Header
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            paddingRight: 20,
            background: colorBgContainer,
            backgroundColor:'#000',
            color:'#fff',
            fontWeight:'bold'
          }}
        >
          <Flex align='center'justify='center' style={{width:'90%'}}>
            <Button style={{}} onClick={()=>{navigate('/home')}}>Rottenavocado</Button>
            <div style={{padding:'0 20px',cursor:'pointer'}}><MenuOutlined /> <span>Menu</span></div>
            <Input.Search placeholder="input search text" onSearch={onSearch} enterButton style={{width:'50%'}}/>
            <div style={{padding:'0 20px',cursor:'pointer'}}><HeartOutlined style={{paddingRight:5}}/>Watchlist</div>
            <div style={{padding:'0 20px',cursor:'pointer'}}>Sign In</div>
        </Flex>
        </Header>
        <Content
          style={{
            margin:'0 auto',
            width:'100%',
            color:'#fff'
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            backgroundColor: 'rgb(18,18,18)'
          }}
        >
          <div>
            <Button>Sign in for more access</Button>
            <div style={{ padding: '25px 0' }}>
            <TikTokOutlined style={{ fontSize: 28, padding: '0 20px' }}/>
              <TwitterOutlined style={{ fontSize: 28, padding: '0 20px' }} /><InstagramOutlined style={{ fontSize: 28, padding: '0 20px' }} /><YoutubeOutlined style={{ fontSize: 28, padding: '0 20px' }} /><FacebookOutlined style={{ fontSize: 28, padding: '0 20px' }} />
            </div>
            <Flex wrap="wrap" gap="small" align="center" justify="center" style={{padding:'20px 0'}}>
              <div style={{ fontSize: 16, padding: '0 20px',minWidth:120,cursor:'pointer', fontWeight:'bold' }} ><span>Get the IMDb App</span><IconFont type="icon-tuichu" /></div>
              <div style={{ fontSize: 16, padding: '0 20px' ,minWidth:120,cursor:'pointer', fontWeight:'bold'}} ><span>Help</span><IconFont type="icon-tuichu" /></div>
              <div style={{ fontSize: 16, padding: '0 20px',minWidth:120,cursor:'pointer', fontWeight:'bold' }} ><span>Site Index</span><IconFont type="icon-tuichu" /></div>
              <div style={{ fontSize: 16, padding: '0 20px' ,minWidth:120,cursor:'pointer', fontWeight:'bold'}} ><span>Office</span><IconFont type="icon-tuichu" /></div>
              <div style={{ fontSize: 16, padding: '0 20px' ,minWidth:120,cursor:'pointer', fontWeight:'bold'}} ><span>Developer</span><IconFont type="icon-tuichu" /></div>
              <div style={{ fontSize: 16, padding: '0 20px' ,minWidth:120,cursor:'pointer', fontWeight:'bold'}} ><span>ProBox</span><IconFont type="icon-tuichu" /></div>
            </Flex>
            <Flex wrap="wrap" gap="small" align="center" justify="center">
              <div style={{ fontSize: 16, padding: '0 20px',minWidth:120,cursor:'pointer', fontWeight:'bold' }} ><span>Press Room</span><IconFont type="icon-tuichu" /></div>
              <div style={{ fontSize: 16, padding: '0 20px' ,minWidth:120,cursor:'pointer', fontWeight:'bold'}} ><span>Advertising</span><IconFont type="icon-tuichu" /></div>
              <div style={{ fontSize: 16, padding: '0 20px',minWidth:120,cursor:'pointer', fontWeight:'bold' }} ><span>Jobs</span><IconFont type="icon-tuichu" /></div>
              <div style={{ fontSize: 16, padding: '0 20px' ,minWidth:120,cursor:'pointer', fontWeight:'bold'}} ><span>Conditions of Use</span></div>
              <div style={{ fontSize: 16, padding: '0 20px' ,minWidth:120,cursor:'pointer', fontWeight:'bold'}} ><span>Privacy Policy</span></div>
              <div style={{ fontSize: 16, padding: '0 20px' ,minWidth:120,cursor:'pointer', fontWeight:'bold'}} ><span>Your Ads Privacy Choices</span></div>
            </Flex>
            <div style={{color:'rgba(255,255,255,0.7)',padding:'30px 0'}}>© 1990-2024 by rottenavocado.com, Inc.</div>

          </div>
          
        </Footer>

      </Layout>
    </ConfigProvider>


  );
};

export default App;