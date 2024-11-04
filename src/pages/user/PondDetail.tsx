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

interface Fish {
  name: string;
  species: string;
  age: number;
  weight: number; // in kg
  image: string;
}

interface Pond {
  id?: number;
  namePond: string;
  fishname: Fish[];
  image: string;
  size: number;
  height: number;
  volume: number; // calculated as size * height
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
        const response = await axiosInstance.get(`https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/pond/view-pond-by-id/${pondID}`);
        setPond(response.data);
      } catch (error) {
        console.error("Error fetching pond details:", error);
        message.error("Failed to fetch pond details.");
      } finally {
        setLoading(false);
      }
    };

    if (pondID) {
      fetchPondDetails();
    }
  }, [pondID]);

  if (!pond) return <p>Loading...</p>;

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
              <img src={pond.image} alt="Pond" style={{ width: 300, height: "auto", marginRight: 24 }} />
              <div>
                <p><strong>Size:</strong> {pond.size} m²</p>
                <p><strong>Height:</strong> {pond.height} m</p>
                <p><strong>Volume:</strong> {pond.volume} m³</p>
              </div>
            </div>

            <h2>Fish in this Pond</h2>
            <div>
              {pond.fishname.length ? (
                pond.fishname.map((fish, index) => (
                  <div key={index} style={{ marginBottom: 16, borderBottom: "1px solid #ddd", paddingBottom: 16 }}>
                    <h3>{fish.name}</h3>
                    <img src={fish.image} alt={fish.name} style={{ width: 200, height: "auto", marginBottom: 8 }} />
                    <p><strong>Species:</strong> {fish.species}</p>
                    <p><strong>Age:</strong> {fish.age} years</p>
                    <p><strong>Weight:</strong> {fish.weight} kg</p>
                  </div>
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
