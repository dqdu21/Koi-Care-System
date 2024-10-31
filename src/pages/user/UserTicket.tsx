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
  pondID: number;
  fishID: number;
  title: string; // Tiêu đề của vé
  message: string; // Nội dung tin nhắn
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
  const [fishs, setFishs] = useState<Fish[]>([]); // Danh sách cá
  const [filteredFish, setFilteredFish] = useState<Fish[]>([]); // Danh sách cá đã lọc

  useEffect(() => {
    fetchUserPonds();
    fetchFish();
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ticket/get-ticket-by-account')
      .then((response) => {
        console.log("Tickets Response:", response.data);
        setTicketList(response.data.ticket || []);
      });
  };

  const fetchUserPonds = () => {
    axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/view-pond-by-account')
      .then((response) => {
        setPonds(response.data);
      });
  };

  const fetchFish = () => {
    axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/koifish/get-koi-fish-by-account')
      .then((response) => {
        setFishs(response.data);
        setFilteredFish(response.data); // Gán cá ban đầu vào danh sách cá đã lọc
      });
  };

  const handlePondChange = (pondID: number) => {
    // Lọc cá dựa trên hồ đã chọn
    const availableFish = fishs.filter(fish => fish.pondID === pondID);
    setFilteredFish(availableFish);
    form.setFieldsValue({ fishID: undefined }); // Reset cá khi hồ thay đổi
  };

  const handleCreateTicket = (values: Ticket) => {
    setLoading(true);
    axiosInstance
      .post(`https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ticket/create-ticket/${values.pondID}/${values.fishID}`, {
        title: values.title,
        message: values.message,
      })
      .then(() => {
        message.success("Ticket created successfully!");
        fetchTickets(); // Cập nhật danh sách vé sau khi tạo mới
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch(() => {
        message.error("Failed to create ticket. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteTicket = (ticketID: number) => {
    axiosInstance
      .delete(`https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ticket/delete-ticket/${ticketID}`)
      .then(() => {
        message.success("Ticket deleted successfully!");
        fetchTickets(); // Cập nhật danh sách vé sau khi xóa
      })
      .catch(() => {
        message.error("Failed to delete ticket. Please try again.");
      });
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
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
                  label="Title"
                  name="title"
                  rules={[{ required: true, message: "Please input the ticket title!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Message"
                  name="message"
                  rules={[{ required: true, message: "Please input the message!" }]}
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
