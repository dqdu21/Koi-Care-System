import { Layout, Button, message } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSider } from "../../app/context/SiderProvider";
import AppFooter from "../../components/layout/AppFooter";
import SiderInstructor from "../../components/layout/SiderInstructor";
import AppHeader from "../../components/layout/AppHeader";
import { axiosInstance } from "../../services/axiosInstance";

interface Pond {
  id?: number;
  namePond: string;
  fishname: string[];
  pondSize: number;
  volume: number;
  temper: string;
  salt: string;
  no3: string;
  no2: string;
  ph: string;
  o2: string;
}

const PondDetail: React.FC = () => {
  const { collapsed } = useSider();
  const [pond, setPond] = useState<Pond | null>(null);
  const [loading, setLoading] = useState(false);
  const { pondID } = useParams<{ pondID: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPondDetails = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/view-pond-by-id/${pondID}`
        );
        console.log(response.data); // Check the data structure here
        setPond(response.data);
      } catch (error) {
        console.error("Error fetching pond details:", error);
        message.error("Failed to fetch pond details. Please check the console for details.");
      } finally {
        setLoading(false);
      }
    };
  
    if (pondID) {
      fetchPondDetails();
    }
  }, [pondID]);
  
  // Render conditional loading and error states
  if (loading) return <p>Loading...</p>;
  if (!pond) return <p>Error: Unable to load pond details.</p>;
  

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
          <SiderInstructor className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`} />
        </Sider>
        <Layout className="flex flex-1 flex-col p-4">
          <Content className="flex-1 overflow-y-auto">
            <Button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
              Go Back
            </Button>
            <h1>{pond.namePond}</h1>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
              <div>
                <p><strong>Size:</strong> {pond.pondSize} m²</p>
                <p><strong>Volume:</strong> {pond.volume} m³</p>
                <p><strong>Temperature:</strong> {pond.temper} °C</p>
                <p><strong>Salt:</strong> {pond.salt} %</p>
                <p><strong>NO3:</strong> {pond.no3} ppm</p>
                <p><strong>NO2:</strong> {pond.no2} ppm</p>
                <p><strong>pH:</strong> {pond.ph}</p>
                <p><strong>Oxygen (O2):</strong> {pond.o2} mg/L</p>
              </div>
            </div>

            <h2>Fish in this Pond</h2>
            <div>
              {pond.fishname.length ? (
                pond.fishname.map((fish, index) => (
                  <p key={index}>{fish}</p>
                ))
              ) : (
                <p>No fish found in this pond.</p>
              )}
            </div>
          </Content>
          <Footer className="footer">
            <AppFooter />
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PondDetail;
