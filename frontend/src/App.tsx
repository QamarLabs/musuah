// import { useState } from "react";
import "./App.css";
import "./layout.css";
import './i18n';
import { observer } from 'mobx-react-lite';
import { useStore } from './store/index';
import { Outlet } from 'react-router-dom';
import Layout from "./common/Layout";
import { Provider } from "./components/ui/provider";


export default observer(function App() {
  const { searchStore } = useStore();
  const { } = searchStore;
  // console.log('VITE_API_URL_NESTJS', import.meta.env.VITE_API_URL_NESTJS)
  return (
    <Provider>
      <Layout>
        <Outlet />
      </Layout>
    </Provider>
  );
})
