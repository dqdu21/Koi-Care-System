import { Layout, Table, Button, Modal, Form, Input, Select, message, Popconfirm } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useState, useEffect } from "react";
import { useSider } from "../../app/context/SiderProvider";
import AppFooter from "../../components/layout/AppFooter";
import SiderInstructor from "../../components/layout/SiderInstructor";
import AppHeader from "../../components/layout/AppHeader";
import { axiosInstance } from "../../services/axiosInstance";

const { Option } = Select;

interface Ticket {
  id?: number;
  name: string; // Tên vé
  text: string; // Nội dung tin nhắn
  pondName: string; // Tên hồ
  fishName: string; // Tên cá
  pondID: number;
  fishID: number;
}

interface Pond {
  id: number;
  name: string;
}

interface Fish {
  id: number;
  name: string;
  pondID: number; // Giả sử có thuộc tính này để liên kết cá với hồ
}

const UserTicket: React.FC = () => {
  const { collapsed } = useSider();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ticketList, setTicketList] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [ponds, setPonds] = useState<Pond[]>([]);
  const [fishs, setFishs] = useState<Fish[]>([]);
  const [filteredFish, setFilteredFish] = useState<Fish[]>([]);

  useEffect(() => {
    fetchUserPonds();
    fetchFish();
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ticket/get-ticket-by-account')
      .then((response) => {
        console.log("Tickets Response:", response.data);
        setTicketList(response.data || []);
      })
      .catch((error) => {
        console.error("Failed to fetch tickets:", error);
        message.error("Failed to load tickets. Please try again.");
      });
  };

  const fetchUserPonds = () => {
    axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/view-pond-by-account')
      .then((response) => {
        setPonds(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch ponds:", error);
        message.error("Failed to load ponds. Please try again.");
      });
  };

  const fetchFish = () => {
    axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/koifish/get-koi-fish-by-account')
      .then((response) => {
        setFishs(response.data);
        setFilteredFish(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch fish:", error);
        message.error("Failed to load fish. Please try again.");
      });
  };

  const handlePondChange = (pondID: number) => {
    const availableFish = fishs.filter(fish => fish.pondID === pondID);
    setFilteredFish(availableFish);
    form.setFieldsValue({ fishID: undefined });
  };

  const handleCreateTicket = (values: Ticket) => {
    setLoading(true);
    axiosInstance
      .post(`https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ticket/create-ticket/${values.pondID}/${values.fishID}`, {
        name: values.name,
        text: values.text,
      })
      .then(() => {
        message.success("Ticket created successfully!");
        fetchTickets(); 
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error("Failed to create ticket:", error.response ? error.response.data : error.message);
        message.error("Failed to create ticket. Please check your data and try again.");
      })
      .finally(() => {
        setLoading(false);
      });
}


  const handleDeleteTicket = (ticketID: number) => {
    axiosInstance
      .delete(`https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ticket/delete-ticket/${ticketID}`)
      .then(() => {
        message.success("Ticket deleted successfully!");
        fetchTickets();
      })
      .catch(() => {
        message.error("Failed to delete ticket. Please try again.");
      });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Text',
      dataIndex: 'text',
      key: 'text',
    },
    {
      title: 'Pond',
      dataIndex: 'pondName',
      key: 'pondName',
    },
    {
      title: 'Fish',
      dataIndex: 'fishName',
      key: 'fishName',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Ticket) => (
        <Popconfirm
          title="Are you sure to delete this ticket?"
          onConfirm={() => handleDeleteTicket(record.id!)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
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
              Create Ticket
            </Button>
            <Table<Ticket> dataSource={ticketList} columns={columns} rowKey="id" className="mt-4" loading={loading} />

            <Modal
              title="Create Ticket"
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              footer={null}
            >
              <Form layout="vertical" onFinish={handleCreateTicket} form={form}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please input the ticket name!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Text"
                  name="text"
                  rules={[{ required: true, message: "Please input the text!" }]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  label="Pond"
                  name="pondID"
                  rules={[{ required: true, message: "Please select a pond!" }]}
                >
                  <Select placeholder="Select a pond" onChange={handlePondChange}>
                    {ponds.map((pond) => (
                      <Option key={pond.id} value={pond.id}>
                        {pond.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Fish"
                  name="fishID"
                  rules={[{ required: true, message: "Please select a fish!" }]}
                >
                  <Select placeholder="Select a fish">
                    {filteredFish.map((fish) => (
                      <Option key={fish.id} value={fish.id}>
                        {fish.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Create Ticket
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </Content>
          <Footer className="footer">
            <AppFooter />
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default UserTicket;
