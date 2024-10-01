import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import AppSider from '../components/layout/AppSider';
import { useSider } from '../app/context/SiderProvider';
import Achievements from '../components/surface/Achievements';
import CarouselInstructor from '../components/carousel/Carousel.instructor';
import CarouselReview from '../components/carousel/Carousel.review';
import CarouselCourse from '../components/carousel/Carousel.courses';
import ImageSlider from "../components/surface/ImageSlider";
import slider_1 from "../assets/Images/slider1.png";
import slider_2 from "../assets/Images/slider2.png";
import slider_3 from "../assets/Images/slider3.png";


const HomePage: React.FC = () => {

  const slides = [
    {
      url: slider_1,
      title: "slider_1",
    },
    {
      url: slider_2,
      title: "slider_2",
    },
    {
      url: slider_3,
      title: "slider_3",
    },
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
              <section>
                <div className="w-full flex justify-between mb-5">
                  <h1 className="font-bold text-xl">Koi Kohaku</h1>
                  <a href="#" className="hover:text-amber-600 font-light">
                    See all
                  </a>
                </div>
                <CarouselCourse />
              </section>
              <section className="mt-10">
                <div className="w-full flex justify-between mb-5">
                  <h1 className="font-bold text-xl">Koi Karashi</h1>
                  <a href="#" className="hover:text-amber-600 font-light">
                    See all
                  </a>
                </div>
                <CarouselCourse />
              </section>
              <section className="mt-10">
                <div className="w-full flex justify-between mb-5">
                  <h1 className="font-bold text-xl">Koi Sowa</h1>
                  <a href="#" className="hover:text-amber-600 font-light">
                    See all
                  </a>
                </div>
                <CarouselCourse />
              </section>
              <Achievements />
              <section>
                <div className="w-full flex justify-between mb-5">
                  <h1 className="font-bold text-xl">Chủ shop</h1>
                  <a href="#" className="hover:text-amber-600 font-light">
                    See all
                  </a>
                </div>
                <CarouselInstructor />
              </section>
              <section className="my-10">
                <h1 className="font-bold text-xl mb-5">Phản hồi của khách hàng</h1>
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
