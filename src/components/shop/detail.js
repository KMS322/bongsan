import "../../css/detail.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const Detail = () => {
  const { products } = useSelector((state) => state.product);
  const { id } = useParams();
  const product =
    products && products.find((product) => product.id === Number(id));
  return (
    <div className="detail">
      <div className="detail_container">
        <img src={product.product_mainImgSrc} alt="" />
        {[...Array(8)].map((_, index) => (
          <img key={index} src={`/details/detail_img${index + 1}.png`} alt="" />
        ))}
      </div>
      <div className="content_container">
        <div className="tag_box">
          <p>#결혼식</p>
          <p>#축하화환</p>
          <p>#화환전문관</p>
        </div>
        <p className="name">{product.product_name}</p>
        <div className="price_box">
          <p>{Number(product.product_truePrice).toLocaleString()}원</p>
          <p> {Number(product.product_falsePrice).toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
