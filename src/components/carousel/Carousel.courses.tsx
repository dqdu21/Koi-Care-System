// interface Product {
//   name: string;
//   description: string;
//   price: number;
//   origin: string;
//   age: number;
//   length: number;
//   species: string;
//   color: string;
//   feedingVolumn: string;
//   filterRate: number;
//   gender: number;
//   inventory: number;
//   categoryId: string;
// }

// const CarouselCourse: React.FC<{ products: Product[] }> = ({ products }) => {
//   console.log('Products received by CarouselCourse:', products);

//   return (
//     <div className="carousel-course">
//       {products.length > 0 ? (
//         products.map((product) => (
//           <div key={product.name} className="course-card">
//             <h3>{product.name}</h3>
//             <p>{product.description}</p>
//             <p>Price: ${product.price}</p>
//             <p>Species: {product.species}</p>
//           </div>
//         ))
//       ) : (
//         <p>No products available</p>
//       )}
//     </div>
//   );
// };


// export default CarouselCourse;
import { Carousel } from 'antd';
import CourseCard from './CourseCard';

const CarouselCourse = () => {
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

export default CarouselCourse;
