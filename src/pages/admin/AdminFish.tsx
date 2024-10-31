import { Layout, Table, Button, Modal, Form, Input, InputNumber, Select, message } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useState, useEffect } from "react";
import { useSider } from "../../app/context/SiderProvider";
import AppFooter from "../../components/layout/AppFooter";
import AppHeader from "../../components/layout/AppHeader";
import { axiosInstance } from "../../services/axiosInstance";
import SiderAdmin from "../../components/layout/SiderAdmin";
import { formatDate } from "../../utils/formatDate";

// Define the type for a Fish
interface Fish {
  id?: number;
  fishName: string;
  imageFish: string;
  birthDay: string;
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
  const [filteredFishList, setFilteredFishList] = useState<Fish[]>([]); // State cho danh sách cá đã lọc
  const [ponds, setPonds] = useState<Pond[]>([]);
  const [editingFish, setEditingFish] = useState<Fish | null>(null);
  const [, setSearchTerm] = useState(""); // State cho từ khóa tìm kiếm
  const [form] = Form.useForm(); // Tạo form sử dụng antd

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
    axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/koifish/get-all-fish')
      .then((response) => {
        setFishList(response.data);
        setFilteredFishList(response.data); // Cập nhật danh sách cá đã lọc ban đầu
      });
  };

  const fetchUserPonds = () => {
    axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/view-pond-by-account')
      .then((response) => {
        setPonds(response.data);
      });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value) {
      const filteredList = fishList.filter(fish =>
        fish.fishName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFishList(filteredList);
    } else {
      setFilteredFishList(fishList); // Nếu không có từ khóa, hiển thị lại toàn bộ danh sách
    }
  };

  const handleSaveFish = (values: Fish & { pondId: number }) => {
    setLoading(true);
  
    const { pondId, fishName, imageFish, birthDay, species, size, weigh, gender, origin, healthyStatus, note } = values;
  
    const fishData: Fish = {
      fishName,
      imageFish,
      birthDay,
      species,
      size,
      weigh,
      gender,
      origin,
      healthyStatus,
      note: note || "",
      pondID: pondId,
    };

    if (editingFish) {
      // Nếu có `editingFish`, gọi API cập nhật
      const url = `https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/koifish/update-fish/${editingFish.id}?species=${species}&gender=${gender}&origin=${origin}&healthyStatus=${healthyStatus}`;
      axiosInstance.put(url, fishData)
        .then(() => {
          message.success("Fish updated successfully!");
          fetchFish(); // Làm mới danh sách cá
          setIsModalVisible(false);
          setEditingFish(null); // Xóa trạng thái đang chỉnh sửa
        })
        .catch(() => {
          message.error("Failed to update fish. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      const url = `https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/koifish/create-fish/${pondId}?species=${species}&gender=${gender}&origin=${origin}&healthyStatus=${healthyStatus}`;
      axiosInstance.post(url, fishData)
        .then((response) => {
          message.success("Fish created successfully!");
          setFishList((prev) => [...prev, response.data]);
          setFilteredFishList((prev) => [...prev, response.data]); // Cập nhật danh sách đã lọc
          setIsModalVisible(false); // Đóng modal khi tạo thành công
          form.resetFields(); // Reset form để chuẩn bị cho lần tạo tiếp theo
        })
        .catch(() => {
          message.error("Failed to create fish. Please check your input and try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // Mở modal chỉnh sửa cá và đổ dữ liệu vào form
  const openEditFishModal = (fish: Fish) => {
    setEditingFish(fish);
    form.setFieldsValue({ ...fish, pondId: fish.pondID }); // Đổ dữ liệu cá vào form
    setIsModalVisible(true);
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
      title: 'Birth Day',
      dataIndex: 'birthDay',
      key: 'birthDay',
      render: (text: string) => formatDate(text),
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
      render: ( record: Fish) => (
        <>
          <Button type="link" onClick={() => openEditFishModal(record)}>
            Update
          </Button>
          <Button type="link" danger onClick={() => handleDeleteFish(record.id!)} >
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
          <SiderAdmin
            className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`}
          />
        </Sider>
        <Layout className="flex flex-1 flex-col p-4">
          <Content className="flex-1 overflow-y-auto">
          <Input.Search
              placeholder="Search fish by name"
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ marginBottom: 16 }}
            />
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Create Fish
            </Button>
            
            <Table<Fish> dataSource={filteredFishList} columns={columns} rowKey="id" className="mt-4" />

            <Modal
              title={editingFish ? "Update Fish" : "Create Fish"}
              visible={isModalVisible}
              onCancel={() => { setIsModalVisible(false); setEditingFish(null); }}
              footer={null}
            >
              <Form layout="vertical" onFinish={handleSaveFish} form={form}>
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
                  label="Birth Day"
                  name="birthDay"
                  rules={[{ required: true, message: "Please input the birth day!" }]}
                >
                  <Input />
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
