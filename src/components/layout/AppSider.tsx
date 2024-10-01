import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, InfoCircleOutlined, AppstoreOutlined, SettingOutlined, QuestionCircleOutlined, PhoneOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const AppSider: React.FC<{ className?: string }> = () => {
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
        >
          Trang chủ
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<InfoCircleOutlined />}
          className="hover:bg-red-100 text-gray-700 hover:text-red-800"
        >
          Thông tin
        </Menu.Item>
        <SubMenu
          key="sub1"
          icon={<AppstoreOutlined />}
          title="Các sản phẩm"
          className="text-gray-700 hover:text-red-800"
        >
          <Menu.Item key="3" className="hover:bg-red-100 text-gray-600 hover:text-red-800">
            Đồ ăn
          </Menu.Item>
          <Menu.Item key="4" className="hover:bg-red-100 text-gray-600 hover:text-red-800">
            Phụ kiện
          </Menu.Item>
          <Menu.Item key="5" className="hover:bg-red-100 text-gray-600 hover:text-red-800">
            Hệ thống lọc
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key="9"
          icon={<SettingOutlined />}
          className="hover:bg-red-100 text-gray-700 hover:text-red-800"
        >
          Hệ thống ký gửi
        </Menu.Item>
        <Menu.Item
          key="10"
          icon={<QuestionCircleOutlined />}
          className="hover:bg-red-100 text-gray-700 hover:text-red-800"
        >
          Hỗ trợ
        </Menu.Item>
        <Menu.Item
          key="11"
          icon={<PhoneOutlined />}
          className="hover:bg-red-100 text-gray-700 hover:text-red-800"
        >
          Liên hệ
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default AppSider;
