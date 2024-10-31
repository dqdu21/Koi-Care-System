import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Card, 
  Avatar, 
  Row, 
  Col, 
  Spin, 
  message, 
  Button, 
  Form, 
  Input, 
  Modal, 
  Typography, 
  Divider 
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  HomeOutlined, 
  PhoneOutlined, 
  EditOutlined 
} from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import AppSider from '../components/layout/AppSider';
import { useSider } from '../app/context/SiderProvider';
import { axiosInstance } from '../services/axiosInstance';

const { Title, Text } = Typography;

const Profile: React.FC = () => {
  const { collapsed } = useSider();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net//account/get-profile');
      setUserProfile(response.data);
    } catch (error) {
      message.error("Failed to fetch user profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = async (values: any) => {
    try {
      await axiosInstance.put('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net//account/update-profile', values);
      message.success("Profile updated successfully!");
      fetchUserProfile();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update profile. Please try again.");
    }
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <Layout className="h-screen w-screen flex flex-col">
      <Header className="header">
        <AppHeader />
      </Header>
      <Layout className="flex flex-1">
        <Sider className="sider" collapsed={collapsed} collapsedWidth={0} trigger={null} width={220}>
          <AppSider className={`transition-all duration-75 ${collapsed ? 'w-0' : 'w-64'}`} />
        </Sider>
        <Layout className="flex flex-col flex-1">
          <Content className="flex-1 overflow-auto p-6 bg-gray-50">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Spin size="large" tip="Loading profile..." />
              </div>
            ) : (
              <div>
                {/* Câu chào username */}
                <Title level={2} className="mb-6">
                  {getTimeOfDay()}, {userProfile?.username}! 👋
                </Title>

                <Card 
                  hoverable 
                  className="w-full shadow-lg"
                  cover={
                    <div className="bg-blue-50 p-6 flex justify-center">
                      <Avatar 
                        size={164} 
                        src={userProfile?.imageUrl} 
                        icon={<UserOutlined />} 
                        className="border-4 border-white shadow-md"
                      />
                    </div>
                  }
                >
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Divider orientation="left">
                        <Title level={4}>Personal Information</Title>
                      </Divider>
                    </Col>
                    <Col span={12}>
                      <Text strong><UserOutlined /> Username:</Text>
                      <Text className="block">{userProfile?.username}</Text>
                    </Col>
                    <Col span={12}>
                      <Text strong><MailOutlined /> Email:</Text>
                      <Text className="block">{userProfile?.email}</Text>
                    </Col>
                    <Col span={12}>
                      <Text strong><HomeOutlined /> Address:</Text>
                      <Text className="block">{userProfile?.address}</Text>
                    </Col>
                    <Col span={12}>
                      <Text strong><PhoneOutlined /> Phone:</Text>
                      <Text className="block">{userProfile?.phone}</Text>
                    </Col>
                    <Col span={24}>
                      <Divider />
                      <Button 
                        type="primary" 
                        icon={<EditOutlined />} 
                        block 
                        onClick={() => { 
                          form.setFieldsValue(userProfile);
                          setIsModalVisible(true);
                        }}
                      >
                        Edit Profile
                      </Button>
                    </Col>
                  </Row>
                </Card>

                <Modal
                  title="Edit Profile"
                  visible={isModalVisible}
                  onCancel={() => setIsModalVisible(false)}
                  footer={null}
                >
                  <Form layout="vertical" form={form} onFinish={handleEditProfile}>
                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[{ required: true, message: "Please input your username!" }]}
                    >
                      <Input prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Please input your email!" },
                        { type: 'email', message: 'Please enter a valid email!' }
                      ]}
                    >
                      <Input prefix={<MailOutlined />} />
                    </Form.Item>
                    <Form.Item
                      label="Address"
                      name="address"
                      rules={[{ required: true, message: "Please input your address!" }]}
                    >
                      <Input prefix={<HomeOutlined />} />
                    </Form.Item>
                    <Form.Item
                      label="Phone"
                      name="phone"
                      rules={[{ required: true, message: "Please input your phone number!" }]}
                    >
                      <Input prefix={<PhoneOutlined />} />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" block>
                        Update Profile
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            )}
          
          <Footer className="footer mt-auto">
            <AppFooter />
          </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Profile;