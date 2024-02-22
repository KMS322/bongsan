import "../css/confirmModal.css";
import { useNavigate } from "react-router-dom";
const ConfirmModal = ({ data, onConfirm, onClose }) => {
  const navigate = useNavigate();
  return (
    <div className="confirmModal">
      <img src="/images/btn_delete.png" alt="" onClick={onClose} />
      <p>{data}</p>
      <div className="btn_box">
        <div className="btn" onClick={onClose}>
          취소
        </div>
        <div
          className="btn"
          onClick={() => {
            if (data === "장바구니 확인하러 가기") {
              navigate("/cart");
              onClose();
            } else if (data === "장바구니에 추가하시겠습니까?") {
              onConfirm();
            }
          }}
        >
          확인
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
