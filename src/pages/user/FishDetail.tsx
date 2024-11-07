import React, { useEffect, useState } from 'react';
import { Layout, Spin, Card, Row, Col, Typography, Tag, Divider, Descriptions, message, List, Modal, Select, Button, Table, Input, Statistic } from 'antd';
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
  WarningOutlined,
  EditOutlined
} from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { formatDate } from '../../utils/formatDate';
import SiderAdmin from '../../components/layout/SiderAdmin';
import SiderShop from '../../components/layout/SiderShop';

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
  const [userProfile, setUserProfile] = useState<any>(null);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [newPondID, setNewPondID] = useState<number | null>(null);

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

  const handleEditPondID = async () => {
    if (!newPondID || !fishData) {
      message.warning("Please enter a valid Pond ID.");
      return;
    }

    try {
      await axiosInstance.put(`/koifish/update-fish/${fishData.pondID}/${fishid}`, 
        {
          pondID: newPondID
        }, 
        {
          params: {
            fishName: fishData.fishName,
            imageFish: fishData.imageFish,
            birthDay: fishData.birthDay,
            species: fishData.species,
            size: fishData.size,
            weigh: fishData.weigh,
            gender: fishData.gender,
            origin: fishData.origin,
            healthyStatus: fishData.healthyStatus,
            note: fishData.note
          }
        }
      );
  
      setFishData({ ...fishData, pondID: newPondID });
      message.success("Pond ID updated successfully.");
    } catch (error) {
      message.error("Failed to update Pond ID.");
    } finally {
      setEditModalVisible(false);
    }
  };

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

  const renderSider = () => {
    if (userProfile?.email === 'ADMIN1@gmail.com') {
      return <SiderAdmin />;
    } else if (userProfile?.email === 'shop@gmail.com') {
      return <SiderShop />;
    }
    return <SiderInstructor />;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ position: 'fixed', width: '100%', zIndex: 1, padding: 0 }}>
        <AppHeader />
      </Header>
      
      <Layout style={{ marginTop: 64 }}>
        <Sider
          className='sider'
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
          {renderSider()}
        </Sider>

        <Layout style={{ marginLeft: collapsed ? 0 : 230, transition: 'all 0.2s' }}>
          <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
            {loading ? (
              <div style={{ textAlign: 'center', marginTop: 100 }}>
                <Spin size="large" />
              </div>
            ) : fishData ? (
              <div style={{ maxWidth: 1200, margin: '0 auto' }}>
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

                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={16}>
                    <Card title="Detailed Information" bordered={false}>
                      <Descriptions column={1} bordered>
                        <Descriptions.Item label="Birth Date">
                          <CalendarOutlined /> {fishData.birthDay}
                        </Descriptions.Item>
                        <Descriptions.Item label="Gender">{fishData.gender}</Descriptions.Item>
                        <Descriptions.Item label="Pond ID">
                          #{fishData.pondID}
                          {/* <Button
                            icon={<EditOutlined />}
                            type="link"
                            onClick={() => {
                              setEditModalVisible(true);
                              setNewPondID(fishData.pondID); // set initial value to current pondID
                            }}
                          >
                            Edit
                          </Button> */}
                        </Descriptions.Item>
                        <Descriptions.Item label="Notes">{fishData.note || 'No additional notes'}</Descriptions.Item>
                      </Descriptions>
                    </Card>

                    <Card title="Feeding Information" bordered={false} style={{ marginTop: 24 }}>
                      <Button type="primary" onClick={() => setFeedingModalVisible(true)}>Add Feeding Info</Button>
                      <Table columns={feedingColumns} dataSource={feedingData} pagination={false} style={{ marginTop: 16 }} />
                    </Card>
                  </Col>

                  <Col xs={24} lg={8}>
                    <Card title="Fish History" bordered={false}>
                      {loadingHistory ? (
                        <Spin />
                      ) : (
                        <List
                          itemLayout="horizontal"
                          dataSource={fishHistory}
                          renderItem={(item) => (
                            <List.Item>
                              <List.Item.Meta
                                title={`${item.name} - ${item.message}`}
                                description={`${formatDate(item.addDate)} / ${item.endDate ? formatDate(item.endDate) : 'Ongoing'}`}
                              />
                            </List.Item>
                          )}
                        />
                      )}
                    </Card>
                  </Col>
                </Row>

                {/* Feeding Modal */}
                <Modal
                  title="Add Feeding Info"
                  visible={feedingModalVisible}
                  onOk={handleFeedFish}
                  onCancel={() => setFeedingModalVisible(false)}
                >
                  <Select
                    placeholder="Select Food Type"
                    value={selectedFoodType}
                    onChange={(value) => setSelectedFoodType(value)}
                    style={{ width: '100%' }}
                  >
                    <Option value="AQUAMASTER">AQUAMASTER</Option>
                    <Option value="SAKURA">SAKURA</Option>
                    <Option value="RIO">RIO</Option>
                  </Select>
                </Modal>

                {/* Edit Pond ID Modal */}
                <Modal
                  title="Edit Pond ID"
                  visible={editModalVisible}
                  onOk={handleEditPondID}
                  onCancel={() => setEditModalVisible(false)}
                >
                  <Input
                    placeholder="Enter new Pond ID"
                    value={newPondID ?? ''}
                    onChange={(e) => setNewPondID(Number(e.target.value))}
                    type="number"
                  />
                </Modal>
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

export default FishDetail;
