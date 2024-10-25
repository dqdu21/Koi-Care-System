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
import SiderShop from "../../components/layout/SiderShop";

interface Pond {
  id?: number;
  namePond: string;
  fishname: string;
  image: string;
  size: string;
}

const UserPonds: React.FC = () => {
  const { collapsed } = useSider();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ponds, setPonds] = useState<Pond[]>([]);
  const [editingPond, setEditingPond] = useState<Pond | null>(null); // For editing
  const [form] = Form.useForm();


  // Fetch ponds data from API when component mounts
  useEffect(() => {
    const fetchPonds = () => {
      axiosInstance
        .get("https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/view-pond-by-account")
        .then((response) => {
          setPonds(response.data);// Set ponds state with API data
        })
        .catch(() => {
          message.error("Failed to fetch ponds!");
        });
    }
    

    fetchPonds(); // Call the function to fetch ponds
  }, []); // Empty dependency array to ensure this runs once on mount

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
      render: (fishname: string[]) => fishname.join(", "), // Join fish names into a string
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
      key: "pondSize", // Use pondSize instead of size
      render: (size: number) => `${size} m²`, // Display with the unit
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
  

  const handleCreatePond = (values: Pond) => {
    setLoading(true);
    const apiUrl = editingPond
      ? `https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/update/${editingPond.id}`
      : "https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/create-pond";

    axiosInstance
      .post(apiUrl, values)
      .then((response) => {
        message.success(editingPond ? "Pond updated successfully!" : "Pond created successfully!");

        if (editingPond) {
          setPonds((prevPonds) =>
            prevPonds.map((pond) => (pond.id === editingPond.id ? response.data : pond))
          );
        } else {
          setPonds([...ponds, response.data]);
        }

        setIsModalVisible(false);
        setEditingPond(null);
        form.resetFields();
      })
      .catch(() => {
        message.error(editingPond ? "Failed to update pond!" : "Failed to create pond!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeletePond = (pondId?: number) => {
    if (!pondId) return;
    axiosInstance
      .delete(`https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/delete-pond/${pondId}`)
      .then(() => {
        message.success("Pond deleted successfully!");
        setPonds((prevPonds) => prevPonds.filter((pond) => pond.id !== pondId));
      })
      .catch(() => {
        message.error("Failed to delete pond!");
      });
  };

  const handleEditPond = (pond: Pond) => {
    setEditingPond(pond);
  
    // Set the form values (only for editable fields)
    form.setFieldsValue({
      namePond: pond.namePond,
      image: pond.image,
      pondSize: pond.size,
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
