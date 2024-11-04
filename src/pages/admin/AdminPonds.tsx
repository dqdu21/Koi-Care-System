import { Layout, Table, Button, Modal, Form, Input, InputNumber, message, Popconfirm } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useState, useEffect } from "react";
import { useSider } from "../../app/context/SiderProvider";
import AppFooter from "../../components/layout/AppFooter";
import AppHeader from "../../components/layout/AppHeader";
import { axiosInstance } from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import SiderAdmin from "../../components/layout/SiderAdmin";

interface Pond {
  id?: number;
  namePond: string;
  fishname: string;
  image: string;
  size: number;
  height: number;
}

const AdminPonds: React.FC = () => {
  const { collapsed } = useSider();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ponds, setPonds] = useState<Pond[]>([]);
  const [filteredPonds, setFilteredPonds] = useState<Pond[]>([]);
  const [editingPond, setEditingPond] = useState<Pond | null>(null);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPonds = async () => {
      try {
        const response = await axiosInstance.get("https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/get-all-ponds");
        setPonds(response.data);
        setFilteredPonds(response.data);
      } catch (error) {
        console.error("Error fetching ponds:", error);
      }
    };
    fetchPonds();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    // Filter ponds based on search input
    const filteredData = ponds.filter((pond) =>
      pond.namePond.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPonds(filteredData);
  };

  const columns = [
    {
      title: "Pond Name",
      dataIndex: "namePond",
      key: "namePond",
      render: (text: string, record: Pond) => (
        <a
          onClick={() => navigate(`/pond/${record.id}`)}
          style={{ cursor: "pointer", color: "#1890ff" }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Fish Names",
      dataIndex: "fishname",
      key: "fishname",
      render: (fishname: string | undefined) => 
        Array.isArray(fishname) ? fishname.join(", ") : fishname || "No fish",
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
      title: "Height (m)",
      dataIndex: "height",
      key: "height",
      render: (height: number) => `${height} m`,
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
          <Button onClick={() => handleEditPond(record)}>
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
    try {
      const apiUrl = editingPond
        ? `https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/update/${editingPond.id}`
        : "https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/create-pond";
  
      setLoading(true);
      const method = editingPond ? 'put' : 'post';
      const response = await axiosInstance[method](apiUrl, {
        ...values,
        size: Number(values.size),
        height: Number(values.height),
      });
  
      message.success(editingPond ? "Pond updated successfully!" : "Pond created successfully!");
  
      const updatedPond = response.data;
      const updatedPonds = editingPond
        ? ponds.map((pond) => (pond.id === editingPond.id ? updatedPond : pond))
        : [...ponds, updatedPond];
  
      setPonds(updatedPonds);
      setFilteredPonds(updatedPonds);
  
      // Reset modal form and close modal
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
      setFilteredPonds((prevPonds) => prevPonds.filter((pond) => pond.id !== pondId));
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
      size: pond.size,
      height: pond.height,
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
          <SiderAdmin
            className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`}
          />
        </Sider>
        <Layout className="flex flex-1 flex-col p-4">
          <Content className="flex-1 overflow-y-auto">
            <Input
              placeholder="Search by pond name"
              value={searchText}
              onChange={handleSearch}
              style={{ marginBottom: 16, width: 300 }}
            />

            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Create Pond
            </Button>

            <Table<Pond>
              dataSource={filteredPonds}
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
                  name="size"
                  rules={[{ required: true, message: "Please input the pond size!" }]}
                >
                  <InputNumber min={0} className="w-full" />
                </Form.Item>
                <Form.Item
                  label="Height (m)"
                  name="height"
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

export default AdminPonds;