import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'antd/dist/reset.css';
import './styles/index.css';
import { ConfigProvider } from 'antd';
import { SiderProvider } from './app/context/SiderProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider>
      <SiderProvider>
        <App />
      </SiderProvider>
    </ConfigProvider>
  </React.StrictMode>
);
