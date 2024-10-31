import { Card, Col, Row, Typography, Grid, Spin } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axiosInstance";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const cardStyle = {
  width: "100%",
  height: "150px",
};

const InstructorOverview: React.FC = () => {
  const screens = useBreakpoint();
  const [data, setData] = useState({
    numberPond: 0,
    numberFish: 0,
    numberUser: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/account/dash-board');
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-4">
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Title level={screens.xs ? 5 : 4}>Total Ponds</Title>
                <div>
                  <Title
                    level={screens.xs ? 3 : 2}
                    className="my-4 text-xl font-semibold"
                  >
                    {data.numberPond}
                  </Title>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Title level={screens.xs ? 5 : 4}>Total Fish</Title>
                <div>
                  <Title level={screens.xs ? 3 : 2}>{data.numberFish}</Title>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default InstructorOverview;
