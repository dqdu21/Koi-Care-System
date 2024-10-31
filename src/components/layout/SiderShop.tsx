import {
  AppstoreOutlined,
  BarChartOutlined,
  DollarOutlined,
  ExceptionOutlined,
  ReadOutlined,
  StarOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Divider, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Footer } from "antd/es/layout/layout";

const SiderAdmin: React.FC<{ className?: string }> = () => {
  const navigate = useNavigate();

  const menuItems: MenuProps["items"] = [
    {
      key: "8",
      icon: <AppstoreOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/shop-page"),
    },
    {
      key: "9",
      icon: <ReadOutlined />,
      label: "Products",
      onClick: () => navigate("/shop-item"),
    },
    {
      key: "10",
      icon: <ExceptionOutlined />,
      label: "Ticket",
      onClick: () => navigate("/shop-ticket"),
    },  
    {
      key: "11",
      icon: <WalletOutlined />,
      label: "Profile",
      onClick: () => navigate("/profile"),
      className: "hover:bg-amber-500 hover:text-white",
    },
  ];

  return (
    <div className="flex h-full flex-col">
      <Menu
        mode="inline"
        items={menuItems}
        className="flex-grow bg-slate-200 text-sm"
      />
      <Divider />
      <Footer className="bg-slate-200 px-8 pb-4 pt-0 text-center">
        <span className="text-xs font-normal">
          Copyright by FPT Education @2024
        </span>
      </Footer>
    </div>
  );
};

export default SiderAdmin;
