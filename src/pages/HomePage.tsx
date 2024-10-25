import { Button, Card, Col, Layout, message, Row, Tabs } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import AppSider from '../components/layout/AppSider';
import { useSider } from '../app/context/SiderProvider';
import Achievements from '../components/surface/Achievements';
import CarouselInstructor from '../components/carousel/Carousel.instructor';
import CarouselReview from '../components/carousel/Carousel.review';
import ImageSlider from "../components/surface/ImageSlider";
import slider_1 from "../assets/Images/slider1.png";
import slider_2 from "../assets/Images/slider2.png";
import slider_3 from "../assets/Images/slider3.png";
import { useEffect, useState } from 'react';
import { axiosInstance } from '../services/axiosInstance';

interface Product {
  id: number;
  itemName: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
}

interface Fish {
  id?: number;
  fishName: string;
  imageFish: string;
  age: number;
  species: string;
  size: number;
  weigh: number;
  gender: string;
  origin: string;
  healthyStatus: string;
  note?: string;
  pondID: number;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [koiFish, setKoiFish] = useState<Fish[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const apiUrl = 'https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/item';
  const koiFishUrl = 'https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/koifish/get-all-fish';

  useEffect(() => {
    axiosInstance.get(apiUrl)
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data); // Set initial products as all
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    // Fetch koi fish data
    axiosInstance.get(koiFishUrl)
      .then(response => {
        setKoiFish(response.data);
      })
      .catch(error => {
        console.error('Error fetching koi fish:', error);
      });
  }, []);

  const categories = ['Koi', 'Food', 'Item', 'Pond'];

  const filterByCategory = (category: string) => {
    if (category === 'Food') {
      setFilteredProducts(products);
    } else if (category === 'Koi') {
      setFilteredProducts([]); // Clear product view when showing koi fish
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
    setActiveCategory(category);
  };

  const handleAddToCart = (item: Product | Fish) => {
    message.success(`${'itemName' in item ? item.itemName : item.fishName} added to cart!`);
  };

  const slides = [
    { url: slider_1, title: "slider_1" },
    { url: slider_2, title: "slider_2" },
    { url: slider_3, title: "slider_3" },
  ];

  const containerStyles: React.CSSProperties = {
    width: "100%",
    height: "400px",
    margin: "0 auto",
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
          <Content className="flex-1 overflow-auto">
            <div className="image-slider-container" style={containerStyles}>
              <ImageSlider slides={slides} />
            </div>
            <div className="p-8">
            <div className="max-w-7xl mx-auto px-4 py-12">
            <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-4xl text-gray-900 font-serif">Origin of Koi Fish</h2>
          <a href="#" className="text-amber-600 hover:text-amber-700 text-base font-medium transition-colors duration-300">
            Explore more →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              When it comes to koi fish or koi carp, people will immediately think of Japan. This fish is known as the national fish of the land of the rising sun. According to some scientific documents, koi fish appeared in the 1820s in Ojiya town, Niigata province, Japan.
            </p>
          </div>
          <div className="relative h-[300px] overflow-hidden rounded-xl shadow-lg">
            <img 
              src="https://sanvuonadong.vn/wp-content/uploads/2020/07/ca-koi-nhat-ban-01-san-vuon-a-dong-768x491.jpg" 
              alt="Origin of Koi Fish" 
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Characteristics Section */}
      <section className="mb-16 bg-gray-50 p-8 rounded-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-4xl text-gray-900 font-serif">Characteristics</h2>
          <a href="#" className="text-amber-600 hover:text-amber-700 text-base font-medium transition-colors duration-300">
            Learn more →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Basically, koi fish are closely related to goldfish. Currently, koi fish have been bred with hundreds of different species. However, there are about 24 recorded breeds, each with different identification characteristics and colors.
            </p>
            <ul className="space-y-2">
              {[
                "Average lifespan is 25 – 35 years. In favorable environments, koi fish can live up to several hundred years.",
                "Koi fish develop continuously, with growth rates of 50 – 150mm per year depending on the breed.",
                "Adult koi fish can reach a maximum length of 1 meter.",
                "Sex is distinguishable by body shape: males have long bodies, while females have plumper bodies, especially when pregnant.",
                "Female koi fish can lay from 150,000 to 200,000 eggs per litter, starting after about 1 year of raising."
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-xl shadow-lg">
            <img 
              src="https://sanvuonadong.vn/wp-content/uploads/2020/07/ca-koi-dep-co-than-hinh-can-doi-04-san-vuon-a-dong.jpg" 
              alt="Koi Fish Characteristics" 
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Techniques Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-4xl text-gray-900 font-serif">Techniques</h2>
          <a href="#" className="text-amber-600 hover:text-amber-700 text-base font-medium transition-colors duration-300">
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 relative h-[350px] overflow-hidden rounded-xl shadow-lg">
            <img 
              src="https://sanvuonadong.vn/wp-content/uploads/2020/07/khong-nen-nuoi-ca-koi-voi-mat-do-qua-day-06-san-vuon-a-dong.jpg" 
              alt="Koi Fish Techniques" 
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Choosing koi breeds: A healthy koi breed will determine 50% of the survival rate and stable development later. You should buy fish from reputable establishments with clear species and origin certificates.
            </p>
            <h3 className="font-semibold text-xl mb-3 text-gray-800">The Japanese koi breed you choose should have:</h3>
            <ul className="space-y-2 mb-4">
              {[
                "A balanced, smooth, elongated body.",
                "A thick mouth, long and hard beard, and harmonious fins.",
                "Bright colors with clear separation between patterns.",
                "Straight, strong swimming with quick reactions."
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-relaxed text-lg italic">
              Avoid buying koi with deformities, dull colors, or slow movement, as these indicate poor health or disease.
            </p>
          </div>
        </div>
      </section>
      </div>
      </div>

            <div className="p-8">
              <Tabs className="flex-1 overflow-auto p-4" activeKey={activeCategory} onChange={filterByCategory}>
                {categories.map((category) => (
                  <Tabs.TabPane tab={category} key={category} />
                ))}
              </Tabs>

              {/* Show products if category is not 'Koi' */}
              {activeCategory !== 'Koi' && (
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
              )}

              {/* Show koi fish if category is 'Koi' */}
              {activeCategory === 'Koi' && (
                <Row gutter={[16, 16]} className="mt-4 p-4">
                  {koiFish.map((fish) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={fish.id}>
                      <Card
                        hoverable
                        cover={<img alt={fish.fishName} src={fish.imageFish} style={{ height: 200, objectFit: 'cover' }} />}
                        actions={[
                          <Button type="primary" onClick={() => handleAddToCart(fish)}>
                            Add to Cart
                          </Button>,
                        ]}
                      >
                        <Card.Meta
                          title={fish.fishName}
                          description={
                            <>
                              <p>Size: {fish.size} cm</p>
                              <p>Species: {fish.species}</p>
                              <p>Origin: {fish.origin}</p>
                            </>
                          }
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}

              <Achievements />
              <section className="mt-10">
                <div className="w-full flex justify-between mb-5">
                  <h1 className="font-bold text-xl">Staff</h1>
                  <a href="#" className="hover:text-amber-600 font-light">See all</a>
                </div>
                <CarouselInstructor />
              </section>
              <section className="my-10">
                <h1 className="font-bold text-xl mb-5">Customer Feedback</h1>
                <CarouselReview />
              </section>
            </div>
            <Footer className="footer mt-auto">
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default HomePage;
