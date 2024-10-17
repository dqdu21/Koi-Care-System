import { Layout, Table, Button, Modal, Form, Input, InputNumber, message, Popconfirm } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useState, useEffect } from "react";
import { useSider } from "../../app/context/SiderProvider";
import AppFooter from "../../components/layout/AppFooter";
import SiderInstructor from "../../components/layout/SiderInstructor";
import AppHeader from "../../components/layout/AppHeader";
import { axiosInstance } from "../../services/axiosInstance";

interface Item {
  id?: number;
  itemName: string;
  price: number;
  category: string; // Assuming category is a string; adjust if needed
  quantity: number;
  quantityOrdered: number;
}

const ShopItems: React.FC = () => {
  const { collapsed } = useSider();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [form] = Form.useForm();

  // Fetch items data from API when component mounts
  useEffect(() => {
    const fetchItems = () => {
      axiosInstance
        .get("/item") // Adjusted API endpoint
        .then((response) => {
          setItems(response.data);
        })
        .catch(() => {
          message.error("Failed to fetch items!");
        });
    };

    fetchItems();
  }, []);

  const columns = [
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`, // Format price
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Quantity Ordered",
      dataIndex: "quantityOrdered",
      key: "quantityOrdered",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Item) => (
        <>
          <Button onClick={() => handleEditItem(record)} style={{ marginRight: 8 }}>
            Update
          </Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteItem(record.id)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleCreateItem = (values: Item) => {
    setLoading(true);
    const apiUrl = editingItem
      ? `/item/update/${editingItem.id}` // Adjusted API endpoint for update
      : "/item/create"; // Adjusted API endpoint for create

    axiosInstance
      .post(apiUrl, values)
      .then((response) => {
        message.success(editingItem ? "Item updated successfully!" : "Item created successfully!");

        if (editingItem) {
          setItems((prevItems) =>
            prevItems.map((item) => (item.id === editingItem.id ? response.data : item))
          );
        } else {
          setItems([...items, response.data]);
        }

        setIsModalVisible(false);
        setEditingItem(null);
        form.resetFields();
      })
      .catch(() => {
        message.error(editingItem ? "Failed to update item!" : "Failed to create item!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteItem = (itemId?: number) => {
    if (!itemId) return;
    // Placeholder for delete functionality, you can implement the API call later
    message.success("Item deleted successfully (API not implemented)!");
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    form.setFieldsValue({
      itemName: item.itemName,
      price: item.price,
      category: item.category,
      quantity: item.quantity,
      quantityOrdered: item.quantityOrdered,
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
              Create Item
            </Button>

            <Table<Item>
              dataSource={items}
              columns={columns}
              rowKey="id"
              className="mt-4"
            />

            <Modal
              title={editingItem ? "Update Item" : "Create Item"}
              visible={isModalVisible}
              onCancel={() => {
                setIsModalVisible(false);
                setEditingItem(null);
                form.resetFields();
              }}
              footer={null}
            >
              <Form layout="vertical" onFinish={handleCreateItem} form={form}>
                <Form.Item
                  label="Item Name"
                  name="itemName"
                  rules={[{ required: true, message: "Please input the item name!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[{ required: true, message: "Please input the item price!" }]}
                >
                  <InputNumber min={0} className="w-full" />
                </Form.Item>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[{ required: true, message: "Please input the item category!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Quantity"
                  name="quantity"
                  rules={[{ required: true, message: "Please input the item quantity!" }]}
                >
                  <InputNumber min={0} className="w-full" />
                </Form.Item>
                <Form.Item
                  label="Quantity Ordered"
                  name="quantityOrdered"
                  rules={[{ required: true, message: "Please input the quantity ordered!" }]}
                >
                  <InputNumber min={0} className="w-full" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    {editingItem ? "Update" : "Submit"}
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

export default ShopItems;
