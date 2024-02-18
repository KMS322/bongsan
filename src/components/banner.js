import "../css/banner.css";
import React, { useState } from "react";
const Banner = () => {
  // const [currentImg, setCurrentImg] = useState(0);
  const img_srcs = [
    "/images/banner_img1.jpg",
    // "/images/banner_img2.jpg",
    // "/images/banner_img3.jpg",
  ];
  return (
    <div className="banner">
      <div className="img_box">
        <img src={img_srcs[0]} alt="" />;
      </div>
    </div>
  );
};

export default Banner;
