import React, { useEffect, useState } from "react";
import {
  Layout,
  Spin,
  Card,
  Row,
  Col,
  Typography,
  Descriptions,
  message,
  Button,
  Modal,
  Form,
  InputNumber,
  Statistic,
  List,
} from "antd";
import { Header, Content } from "antd/es/layout/layout";
import { useNavigate, useParams } from "react-router-dom";
import { useSider } from "../../app/context/SiderProvider";
import AppHeader from "../../components/layout/AppHeader";
import SiderInstructor from "../../components/layout/SiderInstructor";
import { axiosInstance } from "../../services/axiosInstance";
import Sider from "antd/es/layout/Sider";
import SiderAdmin from "../../components/layout/SiderAdmin";
import SiderShop from "../../components/layout/SiderShop";


const { Title, Text } = Typography;

interface PondData {
  namePond: string;
  image: string;
  pondSize: number;
  volume: number;
  temperature: string;
  percentSalt: string;
  no2: string;
  no3: string;
  ph: string;
  o2: string;
}


interface KoiFish {
  id: string;
  name: string;
  image: string;
}


const PondDetail: React.FC = () => {
  const { collapsed } = useSider();
  const [loading, setLoading] = useState(true);
  const [pondData, setPondData] = useState<PondData | null>(null);
  const [waterChangeHistory, setWaterChangeHistory] = useState<string[]>([]);
  const { pondID } = useParams<{ pondID: string }>();
  const [dayChangeWater, setDayChangeWater] = useState<string>("");
  const [autoFilterMessage, setAutoFilterMessage] = useState<string>("");
  const [koiFishList, setKoiFishList] = useState<KoiFish[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/account/get-profile');
      setUserProfile(response.data);
    } catch (error) {
      message.error("Failed to fetch user profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!pondID) {
      message.error("Pond ID is missing. Redirecting...");
      navigate("/pond");
      return;
    }

    const fetchPondDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/ponds/view-pond-by-id/${pondID}`
        );
        setPondData(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    const fetchWaterChangeHistory = async () => {
      try {
        const response = await axiosInstance.get(
          `/ponds/history-change-water/${pondID}`
        );
        setWaterChangeHistory(response.data.historyChangeWater || []);
      } catch (error) {
      }
    };

    const fetchDayChangeWater = async () => {
      try {
        const response = await axiosInstance.get(
          `/ponds/change-water/${pondID}`
        );
        setDayChangeWater(response.data.dayChangeWater);
      } catch (error) {
      }
    };

    const fetchAutoFilterMessage = async () => {
      try {
        const response = await axiosInstance.get(
          `/water-parameter/number-day-auto-filter-water/${pondID}`
        );
        setAutoFilterMessage(response.data.message);
      } catch (error) {
      }
    };

    const fetchKoiFishList = async () => {
      try {
        const response = await axiosInstance.get(`/koifish/get-koi-fish-by-account`);
        setKoiFishList(response.data.koiFish || []);
      } catch (error) {
      }
    };

    fetchKoiFishList();
    fetchPondDetails();
    fetchWaterChangeHistory();
    fetchDayChangeWater();
    fetchAutoFilterMessage();
  }, [pondID, navigate]);

  const handleUpdate = async (values: Partial<PondData>) => {
    setIsUpdating(true);
    try {
      await axiosInstance.put(
        `/water-parameter/update-parameter/${pondID}`,
        values
      );

      setPondData((prevData) => (prevData ? { ...prevData, ...values } : null));

      message.success("Water parameters updated successfully.");
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update water parameters.");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatus = (value: number, min: number, max: number) =>
    value >= min && value <= max ? "  -  Stable" : "  -  Unstable";

  const renderSider = () => {
    if (userProfile?.email === 'ADMIN1@gmail.com') {
      return <SiderAdmin />;
    } else if (userProfile?.email === 'shop@gmail.com') {
      return <SiderShop />;
    }
    return <SiderInstructor />;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{ position: "fixed", width: "100%", zIndex: 1, padding: 0 }}
      >
        <AppHeader />
      </Header>

      <Layout style={{ marginTop: 64 }}>
        <Sider
          collapsed={collapsed}
          collapsedWidth={0}
          trigger={null}
          width={230}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          {renderSider()}
        </Sider>

        <Layout
          style={{ marginLeft: collapsed ? 0 : 230, transition: "all 0.2s" }}
        >
          <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}>
            {loading ? (
              <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <Spin size="large" />
              </div>
            ) : pondData ? (
              <div className="max-w-7xl mx-auto">
                <Card className="mb-6">
                  <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                      <img
                        src={pondData.image}
                        alt={pondData.namePond}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <div className="space-y-4">
                        <Title level={2}>{pondData.namePond}</Title>
                        <Row gutter={[16, 16]}>
                          <Col span={12}>
                            <Card size="small">
                              <Statistic
                                title="Size"
                                value={`${pondData.pondSize} m²`}
                              />
                            </Card>
                          </Col>
                          <Col span={12}>
                            <Card size="small">
                              <Statistic
                                title="Volume"
                                value={`${pondData.volume} m³`}
                              />
                            </Card>
                          </Col>
                          <Col span={12}>
                            <Card size="small">
                              <Statistic
                                title="Next Water Change"
                                value={dayChangeWater || "Loading..."}
                              />
                            </Card>
                          </Col>
                          <Col span={12}>
                            <Card size="small">
                              <Statistic
                                title="Auto Filter Schedule"
                                value={autoFilterMessage || "Loading..."}
                              />
                            </Card>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </Card>

                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={16}>
                    <Card title="Pond Details" bordered={false}>
                      <Descriptions column={1} bordered>
                        <Descriptions.Item label="Salt Percentage">
                          {pondData.temperature} %{" "}
                          {getStatus(Number(pondData.temperature), 0.2, 0.35)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Temperature">
                          {pondData.percentSalt} °C{" "}
                          {getStatus(Number(pondData.percentSalt), 18, 25)}
                        </Descriptions.Item>
                        <Descriptions.Item label="NO₂">
                          {pondData.no2} mg/L{" "}
                          {getStatus(Number(pondData.no2), 0.08, 0.12)}
                        </Descriptions.Item>
                        <Descriptions.Item label="NO₃">
                          {pondData.no3} mg/L{" "}
                          {getStatus(Number(pondData.no3), 13, 16)}
                        </Descriptions.Item>
                        <Descriptions.Item label="pH">
                          {pondData.ph} {getStatus(Number(pondData.ph), 7.5, 8)}
                        </Descriptions.Item>
                        <Descriptions.Item label="O₂">
                          {pondData.o2} mg/L{" "}
                          {getStatus(Number(pondData.o2), 6.6, 7.5)}
                        </Descriptions.Item>
                      </Descriptions>
                      <Button
                        type="primary"
                        onClick={() => setIsModalVisible(true)}
                        style={{ marginTop: 16 }}
                      >
                        Update Water Parameters
                      </Button>
                    </Card>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Card title="Water Change History" bordered={false}>
                      <List
                        dataSource={waterChangeHistory}
                        renderItem={(item) => (
                          <List.Item>
                            <Text>{(item)}</Text>
                          </List.Item>
                        )}
                        locale={{
                          emptyText: "No water change history available.",
                        }}
                      />
                    </Card>
                  </Col>
                </Row>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <Text type="secondary">No pond data found.</Text>
              </div>
            )}
            {/* Koi Fish List Section */}
            <Row gutter={[24, 24]} className="mt-6">
                  <Col span={24}>
                    <Card title="Koi Fish in Pond" bordered={false}>
                      <Row gutter={[16, 16]}>
                        {koiFishList.map((fish) => (
                          <Col xs={24} sm={12} md={8} lg={6} key={fish.id}>
                            <Card
                              hoverable
                              cover={<img alt={fish.name} src={fish.image} />}
                              onClick={() => navigate(`/fish/${fish.id}`)}
                            >
                              <Card.Meta title={fish.name} />
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Card>
                  </Col>
                </Row>
          </Content>
        </Layout>
      </Layout>

      <Modal
        title="Update Water Parameters"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            name="temperature"
            label="Temperature"
            initialValue={pondData?.temperature}
            rules={[
              {
                required: true,
                message: "Please input Temperature from 15°C to 30°C",
              },
            ]}
          >
            <InputNumber
              min={15}
              max={30}
              placeholder="Temperature in °C"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            name="percentSalt"
            label="Salt Percentage"
            initialValue={pondData?.percentSalt}
            rules={[
              {
                required: true,
                message: "Please input Salt Percentage from 0.1% to 0.5%",
              },
            ]}
          >
            <InputNumber
              min={0}
              max={0.5}
              placeholder="Salt Percentage in %"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            name="no2"
            label="NO₂"
            initialValue={pondData?.no2}
            rules={[
              {
                required: true,
                message: "Please input NO₂ ≤ 0.20 mg/L",
              },
            ]}
          >
            <InputNumber
              min={0}
              max={0.2}
              placeholder="NO₂ level"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            name="no3"
            label="NO₃"
            initialValue={pondData?.no3}
            rules={[
              {
                required: true,
                message: "Please input NO₃ between 10 - 20 mg/L",
              },
            ]}
          >
            <InputNumber
              min={0}
              max={20}
              placeholder="NO₃ level"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            name="ph"
            label="pH"
            initialValue={pondData?.ph}
            rules={[
              {
                required: true,
                message: "Please input pH between 7 and 8.5",
              },
            ]}
          >
            <InputNumber
              min={7}
              max={8.5}
              placeholder="pH level"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            name="o2"
            label="O₂"
            initialValue={pondData?.o2}
            rules={[
              {
                required: true,
                message: "Please input O₂ between 6.0 - 8.0 mg/L",
              },
            ]}
          >
            <InputNumber
              min={6}
              max={8}
              placeholder="O₂ level"
              className="w-full"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdating}
              className="w-full"
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default PondDetail;
