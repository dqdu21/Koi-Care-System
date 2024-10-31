import { Card, Col, Row, Typography, Grid, Spin } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
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
        // Gọi API để lấy tổng số hồ
        const pondsResponse = await axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/get-all-ponds');
        const totalPonds = pondsResponse.data.length; // Số lượng hồ

        // Gọi API để lấy tổng số cá
        const fishResponse = await axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/koifish/get-all-fish');
        const totalFish = fishResponse.data.length; // Số lượng cá

        // Gọi API để lấy tổng số người dùng
        const userResponse = await axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/account/dash-board');
        const totalUser = userResponse.data.numberUser; // Số lượng người dùng

        // Cập nhật dữ liệu
        setData({
          numberPond: totalPonds,
          numberFish: totalFish,
          numberUser: totalUser,
        });
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
                <Title level={screens.xs ? 5 : 4}>Total Users</Title>
                <div>
                  <Title level={screens.xs ? 3 : 2}>{data.numberUser}</Title>
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
