import {
  AppstoreOutlined,
  BarChartOutlined,
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
      key: "1",
      icon: <AppstoreOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin-page"),
    },
    {
      key: "2",
      icon: <ReadOutlined />,
      label: "Ponds",
      onClick: () => navigate("/admin-pond"),
    },
    {
      key: "3",
      icon: <ExceptionOutlined />,
      label: "Fish",
      onClick: () => navigate("/admin-fish"),
    },
    {
      key: "4",
      icon: <BarChartOutlined />,
      label: "Account",
      onClick: () => navigate("/admin-account"),
    },
    {
      key: "5",
      icon: <StarOutlined />,
      label: "Ticket",
      onClick: () => navigate("/admin-ticket"),
    },
    {
      key: "7",
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
