import React, { useEffect, useState } from 'react';
import { Layout, Spin, Card, Row, Col, Typography, Tag, Divider, Descriptions, message, List, Modal, Select, Button, Table } from 'antd';
import { Header, Content } from 'antd/es/layout/layout';
import { useParams } from 'react-router-dom';
import { useSider } from '../../app/context/SiderProvider';
import AppHeader from '../../components/layout/AppHeader';
import SiderInstructor from '../../components/layout/SiderInstructor';
import { axiosInstance } from '../../services/axiosInstance';
import {
  EnvironmentOutlined,
  HeartOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { formatDate } from '../../utils/formatDate';

const { Title, Text } = Typography;
const { Option } = Select;

interface FishData {
  fishName: string;
  imageFish: string;
  birthDay: string;
  species: string;
  size: number;
  weigh: number;
  gender: string;
  origin: string;
  healthyStatus: string;
  note: string;
  pondID: number;
}

interface FishHistory {
    fishID: number;
    name: string;
    addDate: string;
    endDate: string;
    message: string;
  }

  interface FeedingData {
    id: number;
    foodType: string;
    amount: number;
    feedingTime: string;
  }

const FishDetail: React.FC = () => {
  const { collapsed } = useSider();
  const { fishid } = useParams<{ fishid: string }>();
  const [fishData, setFishData] = useState<FishData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(true);
  const [fishHistory, setFishHistory] = useState<FishHistory[]>([]);
  const [feedingData, setFeedingData] = useState<FeedingData[]>([]);
  const [feedingModalVisible, setFeedingModalVisible] = useState<boolean>(false);
  const [selectedFoodType, setSelectedFoodType] = useState<string | null>(null);

  useEffect(() => {
    const fetchFishData = async () => {
      try {
        const response = await axiosInstance.get(`/koifish/get-fish-by-id/${fishid}`);
        setFishData(response.data);
      } catch (error) {
        message.error('Failed to load fish details.');
      } finally {
        setLoading(false);
      }
    };

    const fetchFishHistory = async () => {
      try {
        const response = await axiosInstance.get(`/koifish/get-history/${fishid}`);
        setFishHistory(response.data);
      } catch (error) {
        message.error('Failed to load fish history.');
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchFishData();
    fetchFishHistory();
  }, [fishid]);

  const handleFeedFish = async () => {
    if (!selectedFoodType) {
      message.warning("Please select a food type.");
      return;
    }

    try {
      const response = await axiosInstance.post(`/koifish/calculate-food?idPond=${fishData?.pondID}&foodType=${selectedFoodType}`);
      setFeedingData([...feedingData, response.data]);
      message.success("Feeding information updated successfully.");
    } catch (error) {
      message.error("Failed to fetch feeding information.");
    } finally {
      setFeedingModalVisible(false);
      setSelectedFoodType(null);
    }
  };

  const feedingColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Food Type', dataIndex: 'foodType', key: 'foodType' },
    { title: 'Amount (kg)', dataIndex: 'amount', key: 'amount' },
    { title: 'Feeding Time', dataIndex: 'feedingTime', key: 'feedingTime' ,render: (text: string) => formatDate(text)},
  ];

  const getHealthStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'healthy':
        return 'success';
      case 'sick':
        return 'error';
      case 'recovering':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ position: 'fixed', width: '100%', zIndex: 1, padding: 0 }}>
        <AppHeader />
      </Header>
      
      <Layout style={{ marginTop: 64 }}>
        <Sider
          collapsed={collapsed}
          collapsedWidth={0}
          trigger={null}
          width={230}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <SiderInstructor />
        </Sider>

        <Layout style={{ marginLeft: collapsed ? 0 : 230, transition: 'all 0.2s' }}>
          <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
            {loading ? (
              <div style={{ textAlign: 'center', marginTop: 100 }}>
                <Spin size="large" />
              </div>
            ) : fishData ? (
              <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                {/* Header Card */}
                <Card style={{ marginBottom: 24 }}>
                  <Row gutter={[24, 24]}>
                    <Col xs={24} md={10}>
                      <img
                        src={fishData.imageFish}
                        alt={fishData.fishName}
                        style={{
                          width: '100%',
                          height: 300,
                          objectFit: 'cover',
                          borderRadius: 8,
                        }}
                      />
                    </Col>
                    <Col xs={24} md={14}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <Title level={2} style={{ marginBottom: 0 }}>{fishData.fishName}</Title>
                        <Tag color={getHealthStatusColor(fishData.healthyStatus)}>
                          {fishData.healthyStatus}
                        </Tag>
                      </div>
                      
                      <Text type="secondary" style={{ fontSize: 16, marginBottom: 16, display: 'block' }}>
                        {fishData.species}
                      </Text>

                      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
                        <Col span={8}>
                          <Card size="small">
                            <Statistic 
                              title="Size"
                              value={`${fishData.size} cm`}
                              prefix={<InfoCircleOutlined />}
                            />
                          </Card>
                        </Col>
                        <Col span={8}>
                          <Card size="small">
                            <Statistic 
                              title="Weight"
                              value={`${fishData.weigh} kg`}
                              prefix={<InfoCircleOutlined />}
                            />
                          </Card>
                        </Col>
                        <Col span={8}>
                          <Card size="small">
                            <Statistic 
                              title="Origin"
                              value={fishData.origin}
                              prefix={<EnvironmentOutlined />}
                            />
                          </Card>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>

                {/* Details Section */}
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={16}>
                    <Card title="Detailed Information" bordered={false}>
                      <Descriptions column={1} bordered>
                        <Descriptions.Item label="Birth Date">
                          <CalendarOutlined /> {fishData.birthDay}
                        </Descriptions.Item>
                        <Descriptions.Item label="Gender">
                          {fishData.gender}
                        </Descriptions.Item>
                        <Descriptions.Item label="Pond ID">
                          #{fishData.pondID}
                        </Descriptions.Item>
                        <Descriptions.Item label="Notes">
                          {fishData.note || 'No additional notes'}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                    {/* Feeding Information Section */}
                <Card title="Feeding Information" style={{ marginTop: 24 }}>
                  <Button    type="primary" onClick={() => setFeedingModalVisible(true)}>
                    Feed Fish
                  </Button>
                  <Table
                    columns={feedingColumns}
                    dataSource={feedingData}
                    rowKey="id"
                    style={{ marginTop: 16 }}
                  />
                </Card>

                {/* Feed Fish Modal */}
                <Modal
                  title="Select Food Type"
                  visible={feedingModalVisible}
                  onOk={handleFeedFish}
                  onCancel={() => setFeedingModalVisible(false)}
                >
                  <Select
                    placeholder="Choose food type"
                    onChange={(value) => setSelectedFoodType(value)}
                    style={{ width: '100%' }}
                  >
                    <Option value="AQUAMASTER">AQUAMASTER</Option>
                    <Option value="SAKURA">SAKURA</Option>
                    <Option value="RIO">RIO</Option>
                  </Select>
                </Modal>
             
                  </Col>
                  <Col xs={24} lg={8}>
                    <Card 
                      title={
                        <span>
                          <HeartOutlined style={{ marginRight: 8 }} />
                          Health Status
                        </span>
                      }
                      bordered={false}
                    >
                      <div style={{ padding: '20px 0' }}>
                        <Tag 
                          color={getHealthStatusColor(fishData.healthyStatus)}
                          style={{ padding: '8px 16px', fontSize: 16 }}
                        >
                          {fishData.healthyStatus}
                        </Tag>
                      </div>
                      <Divider />
                      <div>
                        <Text type="secondary">Last Check: Today</Text>
                      </div>
                    </Card>

                  
                  
                  

                    {/* Fish History Section */}
                <Card title="Fish History" style={{ marginTop: 24 }}>
                  {loadingHistory ? (
                    <Spin size="large" />
                  ) : (
                    <List
                      itemLayout="horizontal"
                      dataSource={fishHistory}
                      renderItem={(history) => (
                        <List.Item>
                          <List.Item.Meta
                            title={<Text strong>{history.name}</Text>}
                            description={
                              <>
                                <Text>Start Date: {new Date(history.addDate).toLocaleString()}</Text><br />
                                <Text>Change Date: {new Date(history.endDate).toLocaleString()}</Text><br />
                                <Text>Message: {history.message}</Text>
                              </>
                            }
                          />
                        </List.Item>
                      )}
                      
                    />
                  )}
                </Card>
                  </Col>
                </Row>
              </div>
            ) : (
              <Card style={{ textAlign: 'center', marginTop: 100 }}>
                <WarningOutlined style={{ fontSize: 48, color: '#999' }} />
                <Title level={4}>No fish details available</Title>
              </Card>
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

// Helper Component for Statistics
const Statistic: React.FC<{
  title: string;
  value: string;
  prefix?: React.ReactNode;
}> = ({ title, value, prefix }) => (
  <div>
    <Text type="secondary" style={{ fontSize: 12 }}>{title}</Text>
    <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
      {prefix && <span style={{ marginRight: 8 }}>{prefix}</span>}
      <Text strong style={{ fontSize: 16 }}>{value}</Text>
    </div>
  </div>
);

export default FishDetail;