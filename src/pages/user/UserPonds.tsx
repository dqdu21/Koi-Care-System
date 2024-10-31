import { Layout, Table, Button, Modal, Form, Input, InputNumber, message, Popconfirm } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useState, useEffect } from "react";
import { useSider } from "../../app/context/SiderProvider";
import AppFooter from "../../components/layout/AppFooter";
import SiderInstructor from "../../components/layout/SiderInstructor";
import AppHeader from "../../components/layout/AppHeader";
import { axiosInstance } from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";

interface Pond {
  id?: number;
  namePond: string;
  fishname: string;
  image: string;
  pondSize: number;
  volume: number;
}

const UserPonds: React.FC = () => {
  const { collapsed } = useSider();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ponds, setPonds] = useState<Pond[]>([]);
  const [editingPond, setEditingPond] = useState<Pond | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPonds = async () => {
      try {
        const response = await axiosInstance.get("https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/view-pond-by-account");
        setPonds(response.data);
      } catch (error) {
        console.error("Error fetching ponds:", error);
      }
    };
    fetchPonds();
  }, []);

  const columns = [
    {
      title: "Pond Name",
      dataIndex: "namePond",
      key: "namePond",
    },
    {
      title: "Fish Names",
      dataIndex: "fishname",
      key: "fishname",
      render: (fishname: string[]) => fishname.join(", "),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => <img src={image} alt="Pond" width={100} />,
    },
    {
      title: "Size (m²)",
      dataIndex: "pondSize",
      key: "pondSize",
      render: (pondSize: number) => `${pondSize} m²`,
    },
    {
      title: "Volume (m³)",
      dataIndex: "volume",
      key: "volume",
      render: (volume: number) => `${volume} m³`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Pond) => (
        <>
          <Button onClick={() => handleEditPond(record)} style={{ marginRight: 8 }}>
            Update
          </Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDeletePond(record.id)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleCreatePond = async (values: Pond) => {
    setLoading(true);
    try {
      const apiUrl = editingPond
        ? `https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/update/${editingPond.id}`
        : "https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/create-pond";
  
      // Log the values to confirm they contain pondSize and volume
      console.log("Submitted values:", values);
  
      // Make API call with form values
      const response = await axiosInstance.post(apiUrl, {
        ...values,
        pondSize: Number(values.pondSize), // Ensure pondSize is sent as a number
        volume: Number(values.volume)       // Ensure volume is sent as a number
      });
  
      message.success(editingPond ? "Pond updated successfully!" : "Pond created successfully!");
  
      // Update ponds in the state
      setPonds((prevPonds) =>
        editingPond
          ? prevPonds.map((pond) => (pond.id === editingPond.id ? response.data : pond))
          : [...prevPonds, response.data]
      );
  
      // Reset form and close modal
      form.resetFields();
      setIsModalVisible(false);
      setEditingPond(null);
    } catch (error) {
      console.error("Error creating/updating pond:", error);
      message.error(editingPond ? "Failed to update pond!" : "Failed to create pond!");
    } finally {
      setLoading(false);
    }
  };
  

  const handleDeletePond = async (pondId?: number) => {
    if (!pondId) return;
    try {
      await axiosInstance.delete(`https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/delete-pond/${pondId}`);
      message.success("Pond deleted successfully!");
      setPonds((prevPonds) => prevPonds.filter((pond) => pond.id !== pondId));
    } catch (error) {
      console.error("Error deleting pond:", error);
      message.error("Failed to delete pond!");
    }
  };

  const handleEditPond = (pond: Pond) => {
    setEditingPond(pond);
    form.setFieldsValue({
      namePond: pond.namePond,
      image: pond.image,
      pondSize: pond.pondSize,
      volume: pond.volume,
    });
    setIsModalVisible(true);
  };

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
              Create Pond
            </Button>

            <Table<Pond>
              dataSource={ponds}
              columns={columns}
              rowKey="id"
              className="mt-4"
            />

            <Modal
              title={editingPond ? "Update Pond" : "Create Pond"}
              visible={isModalVisible}
              onCancel={() => {
                setIsModalVisible(false);
                setEditingPond(null);
                form.resetFields();
              }}
              footer={null}
            >
              <Form layout="vertical" onFinish={handleCreatePond} form={form}>
                <Form.Item
                  label="Pond Name"
                  name="namePond"
                  rules={[{ required: true, message: "Please input the pond name!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Image URL"
                  name="image"
                  rules={[{ required: true, message: "Please input the image URL!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Size (m²)"
                  name="pondSize"
                  rules={[{ required: true, message: "Please input the pond size!" }]}
                >
                  <InputNumber min={0} className="w-full" />
                </Form.Item>
                <Form.Item
                  label="Volume (m³)"
                  name="volume"
                  rules={[{ required: true, message: "Please input the pond volume!" }]}
                >
                  <InputNumber min={0} className="w-full" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    {editingPond ? "Update" : "Submit"}
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          
          <Footer className="footer">
            <AppFooter />
          </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default UserPonds;
