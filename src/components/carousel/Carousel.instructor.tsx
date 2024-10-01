import { Carousel } from 'antd';
import '../../styles/customCarousel.css';
import InstructorCard from './InstructorCard';

const CarouselInstructor: React.FC = () => {
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
        <InstructorCard />
      </div>
      <div className="flex justify-center">
        <InstructorCard />
      </div>
      <div className="flex justify-center">
        <InstructorCard />
      </div>
      <div className="flex justify-center">
        <InstructorCard />
      </div>
      <div className="flex justify-center">
        <InstructorCard />
      </div>
    </Carousel>
  );
};

export default CarouselInstructor;
