import { Layout, Table, Button, Modal, Form, Input, message, Popconfirm, Select} from "antd"; // Add Switch here
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useState, useEffect } from "react";
import { useSider } from "../../app/context/SiderProvider";
import AppFooter from "../../components/layout/AppFooter";
import AppHeader from "../../components/layout/AppHeader";
import { axiosInstance } from "../../services/axiosInstance";
import SiderShop from "../../components/layout/SiderShop";

const { Option } = Select;

interface Ticket {
  id?: number;
  title: string; // Tên vé
  text: string; // Nội dung tin nhắn
  pondName: string; // Tên hồ
  fishName: string; // Tên cá
  pondID: number;
  fishID: number;
  isProcessed?: boolean;
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

const ShopTicket: React.FC = () => {
  const { collapsed } = useSider();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Để xác định chế độ chỉnh sửa
  const [ticketList, setTicketList] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [ponds, setPonds] = useState<Pond[]>([]);
  const [fishs, setFishs] = useState<Fish[]>([]);
  const [filteredFish, setFilteredFish] = useState<Fish[]>([]);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null); // Ticket đang chỉnh sửa
  const [isProcessed, ] = useState<boolean>(false); // State for processed tickets

  useEffect(() => {
    fetchUserPonds();
    fetchFish();
    fetchTickets();
  }, [isProcessed]); // Fetch tickets based on processed state

  const fetchTickets = () => {
    const url = `https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ticket/get-all-ticket?processed=${isProcessed}`;
    axiosInstance.get(url)
      .then((response) => {
        console.log("Tickets Response:", response.data);
        setTicketList(response.data || []);
      });
  };

  const fetchUserPonds = () => {
    axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/get-all-ponds')
      .then((response) => {
        setPonds(response.data);
      });
  };

  const fetchFish = () => {
    axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/koifish/get-all-fish')
      .then((response) => {
        setFishs(response.data);
        setFilteredFish(response.data);
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
        title: values.title,
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
  };

  const handleEditTicket = (values: Ticket) => {
    if (editingTicket) {
      setLoading(true);
      axiosInstance
        .post(`https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ticket/create-ticket/${editingTicket.id}/${values.pondID}/${values.fishID}`, {
          title: values.title,
          text: values.text,
        })
        .then(() => {
          message.success("Ticket updated successfully!");
          fetchTickets(); 
          setIsModalVisible(false);
          form.resetFields();
        })
        .catch((error) => {
          console.error("Failed to edit ticket:", error.response ? error.response.data : error.message);
          message.error("Failed to edit ticket. Please check your data and try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleEditButtonClick = (ticket: Ticket) => {
    setIsEditMode(true);
    setEditingTicket(ticket);
    form.setFieldsValue({
      title: ticket.title,
      text: ticket.text,
      pondID: ticket.pondID,
      fishID: ticket.fishID,
    });
    setIsModalVisible(true);
  };

  const handleToggleProcessed = (ticketID: number) => {
    setTicketList(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === ticketID ? { ...ticket, isProcessed: !ticket.isProcessed } : ticket
      )
    );
  };


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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
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
      title: 'Processed',
      key: 'processed',
      render: ( record: Ticket) => (
        <Button 
          type={record.isProcessed ? 'primary' : 'default'} 
          onClick={() => handleToggleProcessed(record.id!)} 
          style={{ backgroundColor: record.isProcessed ? '#52c41a' : '#f5222d', color: 'white' }}
        >
          {record.isProcessed ? 'Processed' : 'Unprocessed'}
        </Button>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: ( record: Ticket) => (
        <>
          <Button type="link" onClick={() => handleEditButtonClick(record)}>
            Edit
          </Button>
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
          <SiderShop
            className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`}
          />
        </Sider>
        <Layout className="flex flex-1 flex-col p-4">
          <Content className="flex-1 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <Button type="primary" onClick={() => {
                setIsEditMode(false); // Reset chế độ chỉnh sửa
                setIsModalVisible(true);
              }}>
                Create Ticket
              </Button>
              
              {/* <div>
                <span className="mr-2">Show Processed:</span>
                <Switch checked={isProcessed} onChange={setIsProcessed} />
              </div> */}
            </div>
            <Table<Ticket> dataSource={ticketList} columns={columns} rowKey="id" className="mt-4" loading={loading} />

            <Modal
              title={isEditMode ? "Edit Ticket" : "Create Ticket"}
              visible={isModalVisible}
              onCancel={() => {
                setIsModalVisible(false);
                setIsEditMode(false);
                setEditingTicket(null);
                form.resetFields();
              }}
              footer={null}
            >
              <Form layout="vertical" onFinish={isEditMode ? handleEditTicket : handleCreateTicket} form={form}>
                <Form.Item
                  label="Title"
                  name="title"
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
                    {isEditMode ? "Update Ticket" : "Create Ticket"}
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

export default ShopTicket;
