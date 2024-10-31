import { Layout, Table, Button, Modal, Form, Input, InputNumber, Select, message } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useState, useEffect } from "react";
import { useSider } from "../../app/context/SiderProvider";
import AppFooter from "../../components/layout/AppFooter";
import SiderInstructor from "../../components/layout/SiderInstructor";
import AppHeader from "../../components/layout/AppHeader";
import { axiosInstance } from "../../services/axiosInstance";
import SiderShop from "../../components/layout/SiderShop";

// Define the type for a Fish
interface Fish {
  id?: number;
  fishName: string;
  imageFish: string;
  age: number;
  species: string;
  size: number;
  weigh: number;
  gender: string;
  origin: string;
  healthyStatus: string;
  note?: string; // Made optional for clarity
  pondID: number; // Use pondID to match your desired format
}

interface Pond {
  id: number;
  name: string;
}

const FishManagement: React.FC = () => {
  const { collapsed } = useSider();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fishList, setFishList] = useState<Fish[]>([]);
  const [ponds, setPonds] = useState<Pond[]>([]);
  const [editingFish, setEditingFish] = useState<Fish | null>(null);

  useEffect(() => {
    fetchFish();
    fetchUserPonds();
  }, []);

  const handleDeleteFish = (fishId: number) => {
    const url = `https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/koifish/delete-fish/${fishId}`;
    axiosInstance.delete(url)
      .then(() => {
        message.success("Fish deleted successfully!");
        setFishList((prev) => prev.filter(fish => fish.id !== fishId));
      })
      .catch(() => {
        message.error("Failed to delete fish. Please try again.");
      });
  };

  const fetchFish = () => {
    axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/koifish/get-fish-by-account')
      .then((response) => {
        setFishList(response.data);
      })
      .catch(() => {
        message.error("Failed to fetch fish data. Please try again later.");
      });
  };

  const fetchUserPonds = () => {
    axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/view-pond-by-account')
      .then((response) => {
        setPonds(response.data);
      })
      
  };

  const handleCreateFish = (values: Fish & { pondId: number }) => {
    setLoading(true);
  
    // Construct the URL using the pond ID
    const { pondId, fishName, imageFish, age, species, size, weigh, gender, origin, healthyStatus, note } = values;
  
    const fishData: Fish = {
      id: 0, // Temporary ID
      fishName: fishName,
      imageFish: imageFish,
      age: age,
      species: species,
      size: size,
      weigh: weigh,
      gender: gender,
      origin: origin,
      healthyStatus: healthyStatus,
      note: note || "", // Ensure note is an empty string if not provided
      pondID: pondId,
    };
  
    // Constructing the URL for the POST request
    const url = `https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/koifish/create-fish/${pondId}?species=${species}&gender=${gender}&origin=${origin}&healthyStatus=${healthyStatus}`;
  
    axiosInstance.post(url, fishData)
      .then((response) => {
        message.success("Fish created successfully!");
        setFishList((prev) => [...prev, response.data]);
        setIsModalVisible(false); // Close modal on success
      })
      .catch(() => {
        message.error("Failed to create fish. Please check your input and try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

  const columns = [
    {
      title: 'Fish Name',
      dataIndex: 'fishName',
      key: 'fishName',
    },
    {
      title: 'Image',
      dataIndex: 'imageFish',
      key: 'imageFish',
      render: (text: string) => <img src={text} alt="Fish" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Species',
      dataIndex: 'species',
      key: 'species',
    },
    {
      title: 'Size (cm)',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Weight (kg)',
      dataIndex: 'weigh',
      key: 'weigh',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Origin',
      dataIndex: 'origin',
      key: 'origin',
    },
    {
      title: 'Health Status',
      dataIndex: 'healthyStatus',
      key: 'healthyStatus',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Fish) => (
        <>
          <Button type="link" onClick={() => { setEditingFish(record); setIsModalVisible(true); }}>
            Update
          </Button>
          <Button type="link" danger onClick={() => handleDeleteFish(record.id!)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

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
          <SiderInstructor
            className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`}
          />
        </Sider>
        <Layout className="flex flex-1 flex-col p-4">
          <Content className="flex-1 overflow-y-auto">
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Create Fish
            </Button>
            
            <Table<Fish> dataSource={fishList} columns={columns} rowKey="id" className="mt-4" />

            <Modal
              title={editingFish ? "Update Fish" : "Create Fish"}
              visible={isModalVisible}
              onCancel={() => { setIsModalVisible(false); setEditingFish(null); }}
              footer={null}
            >
              <Form layout="vertical" onFinish={handleCreateFish}>
                 <Form.Item
                  label="Select Pond"
                  name="pondId"
                  rules={[{ required: true, message: "Please select a pond!" }]}
                >
                  <Select placeholder="Select a pond">
                    {ponds.map((pond) => (
                      <Select.Option key={pond.id} value={pond.id}>
                        {pond.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Fish Name"
                  name="fishName"
                  rules={[{ required: true, message: "Please input the fish name!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Image URL"
                  name="imageFish"
                  rules={[{ required: true, message: "Please input the image URL!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Age"
                  name="age"
                  rules={[{ required: true, message: "Please input the age!" }]}
                >
                  <InputNumber min={0} className="w-full" />
                </Form.Item>
                <Form.Item
                  label="Species"
                  name="species"
                  rules={[{ required: true, message: "Please select the species!" }]}
                >
                  <Select>
                    <Select.Option value="KUMONRYU">KUMONRYU</Select.Option>
                    <Select.Option value="GOROMO">GOROMO</Select.Option>
                    <Select.Option value="TANCHO">TANCHO</Select.Option>
                    <Select.Option value="SHUSUI">SHUSUI</Select.Option>
                    <Select.Option value="ASAGI">ASAGI</Select.Option>
                    <Select.Option value="BEKKO">BEKKO</Select.Option>
                    <Select.Option value="KOHAKU">KOHAKU</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Size (cm)"
                  name="size"
                  rules={[{ required: true, message: "Please input the size!" }]}
                >
                  <InputNumber min={0} className="w-full" />
                </Form.Item>
                <Form.Item
                  label="Weight (kg)"
                  name="weigh"
                  rules={[{ required: true, message: "Please input the weight!" }]}
                >
                  <InputNumber min={0} className="w-full" />
                </Form.Item>
                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[{ required: true, message: "Please select the gender!" }]}
                >
                  <Select>
                    <Select.Option value="MALE">Male</Select.Option>
                    <Select.Option value="FEMALE">Female</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Origin"
                  name="origin"
                  rules={[{ required: true, message: "Please select the origin!" }]}
                >
                  <Select>
                    <Select.Option value="JAPAN">Japan</Select.Option>
                    <Select.Option value="CHINA">China</Select.Option>
                    <Select.Option value="INDONESIA">Indonesia</Select.Option>
                    <Select.Option value="VIETNAM">Vietnam</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Health Status"
                  name="healthyStatus"
                  rules={[{ required: true, message: "Please select the health status!" }]}
                >
                  <Select>
                    <Select.Option value="HEALTHY">Healthy</Select.Option>
                    <Select.Option value="SICK">Unhealthy</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Note"
                  name="note"
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    {editingFish ? "Update Fish" : "Create Fish"}
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          
          <Footer className="bg-black">
            <AppFooter />
          </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default FishManagement;
