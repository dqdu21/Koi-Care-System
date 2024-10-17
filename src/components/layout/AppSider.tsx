import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

import { HomeOutlined, InfoCircleOutlined, AppstoreOutlined, SettingOutlined, QuestionCircleOutlined, PhoneOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const AppSider: React.FC<{ className?: string }> = () => {
  const navigate = useNavigate();
  return (
    <div className={`h-[calc(100vh-4rem)] bg-white `}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        className="border-r-0 h-full"
      >
        <Menu.Item
          key="1"
          icon={<HomeOutlined />}
          className="hover:bg-red-100 text-gray-700 hover:text-red-800"
          onClick={() => navigate('/')}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<InfoCircleOutlined />}
          className="hover:bg-red-100 text-gray-700 hover:text-red-800"
        >
          Information
        </Menu.Item>
        <SubMenu
          key="sub1"
          icon={<AppstoreOutlined />}
          title="Products"
          className="text-gray-700 hover:text-red-800"
        >
          <Menu.Item key="3" className="hover:bg-red-100 text-gray-600 hover:text-red-800">
            Food
          </Menu.Item>
          <Menu.Item key="4" className="hover:bg-red-100 text-gray-600 hover:text-red-800">
            Item
          </Menu.Item>
          <Menu.Item key="5" className="hover:bg-red-100 text-gray-600 hover:text-red-800">
            Others
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key="9"
          icon={<SettingOutlined />}
          className="hover:bg-red-100 text-gray-700 hover:text-red-800"
        >
          Consignment system
        </Menu.Item>
        <Menu.Item
          key="10"
          icon={<QuestionCircleOutlined />}
          className="hover:bg-red-100 text-gray-700 hover:text-red-800"
        >
          Help
        </Menu.Item>
        <Menu.Item
          key="11"
          icon={<PhoneOutlined />}
          className="hover:bg-red-100 text-gray-700 hover:text-red-800"
        >
          Contact
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default AppSider;
