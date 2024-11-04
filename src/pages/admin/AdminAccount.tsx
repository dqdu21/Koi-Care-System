import { Layout, Table, Button, Modal, Form, Input, message, Popconfirm, Select } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useState, useEffect } from "react";
import { useSider } from "../../app/context/SiderProvider";
import AppFooter from "../../components/layout/AppFooter";
import AppHeader from "../../components/layout/AppHeader";
import { axiosInstance } from "../../services/axiosInstance";
import SiderAdmin from "../../components/layout/SiderAdmin";

interface User {
  id: number;
  username: string;
  email: string;
  address: string;
  phone: string;
  gender: "MALE" | "FEMALE";
  role: "ADMIN" | "USER";
  message: string;
}

const AdminAccount: React.FC = () => {
  const { collapsed } = useSider();
  const [accounts, setAccounts] = useState<User[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    // Filter accounts based on search term
    setFilteredAccounts(
      accounts.filter(account => account.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, accounts]);

  const fetchAccounts = async () => {
    try {
      const response = await axiosInstance.get('/account/get-all-account');
      setAccounts(response.data);
      setFilteredAccounts(response.data); // Initialize filtered list
    } catch (error) {
      message.error("Failed to fetch accounts");
    }
  };

  const handleDelete = async (accountID: number) => {
    try {
      await axiosInstance.delete(`/account/delete-account/${accountID}`);
      message.success("Account deleted successfully");
      fetchAccounts(); // Refresh the account list
    } catch (error) {
      message.error("Failed to delete account");
    }
  };

  const handleEdit = (account: User) => {
    setCurrentAccount(account);
    setIsModalVisible(true);
  };

  const handleUpdate = async (values: Omit<User, "id">) => {
    if (!currentAccount) return;

    try {
      await axiosInstance.put('/account/update-profile', {
        id: currentAccount.id,
        ...values,
      });
      message.success("Account updated successfully");
      setIsModalVisible(false);
      fetchAccounts(); // Refresh the account list
    } catch (error) {
      message.error("Failed to update account");
    }
  };

  const columns = [
    {
      title: 'Account ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: User["gender"]) => (gender === 'MALE' ? 'Male' : 'Female'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: User) => (
        <>
          <Button onClick={() => handleEdit(record)} type="link">Edit</Button>
          <Popconfirm
            title="Are you sure to delete this account?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>Delete</Button>
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
          <SiderAdmin className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`} />
        </Sider>
        <Layout className="flex flex-1 flex-col p-4">
          <Content className="flex-1 overflow-y-auto">
            <Input.Search
              placeholder="Search by email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginBottom: 16, width: 300 }}
            />
            <Table dataSource={filteredAccounts} columns={columns} rowKey="id" />
            <Modal
              title="Edit Account"
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              footer={null}
            >
              <Form
                initialValues={currentAccount || {}}
                onFinish={handleUpdate}
                layout="vertical"
              >
                <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input the username!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="address" label="Address">
                  <Input />
                </Form.Item>
                <Form.Item name="phone" label="Phone">
                  <Input />
                </Form.Item>
                <Form.Item name="gender" label="Gender">
                  <Select>
                    <Select.Option value="MALE">Male</Select.Option>
                    <Select.Option value="FEMALE">Female</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="role" label="Role">
                  <Select>
                    <Select.Option value="ADMIN">Admin</Select.Option>
                    <Select.Option value="SHOP">Shop</Select.Option>
                    <Select.Option value="USER">User</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="message" label="Message">
                  <Input.TextArea />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">Update</Button>
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

export default AdminAccount;
