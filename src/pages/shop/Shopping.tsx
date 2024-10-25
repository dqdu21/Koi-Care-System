import { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Button, Card, Col, Row, message, Tabs } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import AppHeader from '../../components/layout/AppHeader';
import AppFooter from '../../components/layout/AppFooter';
import AppSider from '../../components/layout/AppSider';
import { useSider } from '../../app/context/SiderProvider';

interface Product {
  id: number;
  itemName: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
}

const Shopping: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All'); // Default to all categories
  const apiUrl = 'https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/item'; 

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setProducts(response.data); 
        setFilteredProducts(response.data); // Set initial products as all
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Categories for filtering
  const categories = ['All', 'Food', 'Item', 'XYZ'];

  // Filter products by category
  const filterByCategory = (category: string) => {
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
    setActiveCategory(category);
  };

  const handleAddToCart = (product: Product) => {
    // Simulate adding to cart
    message.success(`${product.itemName} added to cart!`);
  };

  const { collapsed } = useSider();

  return (
    <Layout className="h-screen w-screen flex flex-col">
      <Header className="header">
        <AppHeader />
      </Header>
      <Layout className="flex flex-1">
        <Sider className="sider" collapsed={collapsed} collapsedWidth={0} trigger={null} width={220}>
          <AppSider className={`transition-all duration-75 ${collapsed ? 'w-0' : 'w-64'}`} />
        </Sider>
        <Layout className="flex flex-col flex-1">
          <Content className="flex-1 overflow-auto ">
            
            {/* Categories Section */}
            <Tabs className="flex-1 overflow-auto p-4" activeKey={activeCategory} onChange={filterByCategory}>
              {categories.map((category) => (
                <Tabs.TabPane tab={category} key={category} />
              ))}
            </Tabs>

            {/* Products Grid */}
            <Row gutter={[16, 16]} className="mt-4 p-4">
              {filteredProducts.map((product) => (
                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                  <Card
                    hoverable
                    cover={<img alt={product.itemName} src="https://saigonfish.com/upload/images/Beige%20Green%20Natural%20Skincare%20Product%20Promotion%20Instagram%20Post.jpg" style={{ height: 200, objectFit: 'cover' }} />}
                    actions={[
                      <Button type="primary" onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </Button>,
                    ]}
                  >
                    <Card.Meta
                      title={product.itemName}
                      description={
                        <>
                          <p>Price: ${product.price}</p>
                          <p>Quantity: {product.quantity}</p>
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>

            
          <Footer className="footer mt-auto">
            <AppFooter />
          </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Shopping;
