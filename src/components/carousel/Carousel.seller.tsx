import { Carousel } from 'antd';
import CourseCard from './CourseCard';

const CarouselSeller = () => {
  return (
    <Carousel
      className="custom-carousel"
      dots={false}
      slidesToShow={4}
      slidesToScroll={1}
      arrows
      infinite
      swipeToSlide
    >
      <div className="flex justify-center">
        <CourseCard />
      </div>
      <div className="flex justify-center">
        <CourseCard />
      </div>
      <div className="flex justify-center">
        <CourseCard />
      </div>
      <div className="flex justify-center">
        <CourseCard />
      </div>
      <div className="flex justify-center">
        <CourseCard />
      </div>
    </Carousel>
  );
};

export default CarouselSeller;
