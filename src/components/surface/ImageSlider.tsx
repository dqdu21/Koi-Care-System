import React, { useState, useEffect, FC } from "react";

const sliderContainerStyles: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

const slidesContainerStyles: React.CSSProperties = {
  display: "flex",
  transition: "transform 1s ease-in-out", // Điều chỉnh thời gian chuyển đổi thành 1 giây
  width: "100%",
  height: "100%",
};

const slideStyles: React.CSSProperties = {
  minWidth: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "10px",
};

const arrowStyles: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "25px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
  userSelect: "none",
};

const rightArrowStyles: React.CSSProperties = {
  ...arrowStyles,
  right: "16px",
};

const leftArrowStyles: React.CSSProperties = {
  ...arrowStyles,
  left: "16px",
};

const dotsContainerStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
  position: "absolute", // Đặt vị trí tuyệt đối
  bottom: "10px", // Đặt ở phía dưới slider
  width: "100%", // Đảm bảo các dấu chấm nằm ở giữa
};

const dotStyle: React.CSSProperties = {
  margin: "0 5px",
  cursor: "pointer",
  fontSize: "20px",
  userSelect: "none",
};

interface Slide {
  url: string;
}

interface ImageSliderProps {
  slides: Slide[];
}

const ImageSlider: FC<ImageSliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const transformValue = -currentIndex * 100;

  return (
    <div style={sliderContainerStyles}>
      <div onClick={goToPrevious} style={leftArrowStyles}>
        ❰
      </div>
      <div onClick={goToNext} style={rightArrowStyles}>
        ❱
      </div>
      <div
        style={{
          ...slidesContainerStyles,
          transform: `translateX(${transformValue}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{ ...slideStyles, backgroundImage: `url(${slide.url})` }}
          ></div>
        ))}
      </div>
      <div style={dotsContainerStyles}>
        {slides.map((_, slideIndex) => (
          <div
            style={{
              ...dotStyle,
              color: slideIndex === currentIndex ? "black" : "gray",
            }}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
