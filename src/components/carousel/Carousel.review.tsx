import { Carousel } from 'antd';
import '../../styles/customCarousel.css';
import StudentReview from '../surface/StudentReview';

const CarouselReview: React.FC = () => {
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
        <StudentReview />
      </div>
      <div className="flex justify-center">
        <StudentReview />
      </div>
      <div className="flex justify-center">
        <StudentReview />
      </div>
      <div className="flex justify-center">
        <StudentReview />
      </div>
      <div className="flex justify-center">
        <StudentReview />
      </div>
    </Carousel>
  );
};

export default CarouselReview;
