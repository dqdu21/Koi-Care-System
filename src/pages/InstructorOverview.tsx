import { Card, Col, Row, Typography, Grid } from "antd";


const { Title } = Typography;
const { useBreakpoint } = Grid;

const cardStyle = {
  width: "100%",
  height: "150px",
};

const InstructorOverview: React.FC = () => {
  const screens = useBreakpoint();

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
                    10
                  </Title>
                  <div style={{ marginTop: "8px" }}></div>
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
                  <Title level={screens.xs ? 3 : 2}>4</Title>
                  <div style={{ marginTop: "8px" }}></div>
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
                <Title level={screens.xs ? 5 : 4}>Total Purchased</Title>
                <div>
                  <Title level={screens.xs ? 3 : 2}>$999</Title>
                  <div style={{ marginTop: "8px" }}></div>
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
                <Title level={screens.xs ? 5 : 4}>Total Followers</Title>
                <div>
                  <Title level={screens.xs ? 3 : 2}>10</Title>
                  <div style={{ marginTop: "8px" }}></div>
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
