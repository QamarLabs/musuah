// import { useState } from "react";
import "./App.css";
import "./layout.css";
import './i18n';
import { observer } from 'mobx-react-lite';
import { useStore } from './store/index';
import { Outlet } from 'react-router-dom';
import Layout from "./common/Layout";
import { Provider } from "./components/ui/provider";
import axios from "axios";
import { useEffect } from "react";


export default observer(function App() {
  const { commonStore } = useStore();
  const { setIpAddress, ipAddress } = commonStore;
  // console.log('VITE_API_URL_NESTJS', import.meta.env.VITE_API_URL_NESTJS)
  async function getIpAddress() {
    try {
      const { data } = await axios.get('https://api.ipify.org?format=json');

      setIpAddress(data.ip);
    } catch (error) {
      console.error('Error fetching IP:', error);
    }
  }


  useEffect(() => {
    if(!ipAddress)
      getIpAddress();
  }, [])
  
  return (
    <Provider>
      <Layout>
        <Outlet />
      </Layout>
    </Provider>
  );
})
