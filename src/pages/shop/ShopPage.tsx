
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useSider } from "../../app/context/SiderProvider";
import AppFooter from "../../components/layout/AppFooter";
import SiderShop from "../../components/layout/SiderShop";
import AppHeader from "../../components/layout/AppHeader";
import InstructorOverview from "./../InstructorOverview";
import InstructorPie from "./../InstructorPie";
import InstructorChart from "./../InstructorChart";

const ShopPage = () => {
  const { collapsed } = useSider();

  return (
    <Layout className="flex h-screen w-screen flex-col">
      <Header className="header">
        <AppHeader />
      </Header>
      <Layout className="flex flex-1 overflow-y-auto">
        <Sider
          className="sider"
          collapsed={collapsed}
          collapsedWidth={0}
          trigger={null}
          width={230}
        >
          <SiderShop
            className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`}
          />
        </Sider>
        <Layout className="flex flex-1 flex-col p-4">
          <Content className="flex-1 overflow-y-auto">
          <section>
        <h1 className="text-xl font-bold">Instructor Dashboard</h1>
        <InstructorOverview />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="text-center w-full h-96 md:h-400 lg:h-500">
            <InstructorChart />
          </div>
          <div className="text-center w-full h-96 md:h-400 lg:h-500">
            <InstructorPie />
          </div>
        </div>
      </section>
            <Footer className="footer">
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ShopPage;