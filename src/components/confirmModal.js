import "../css/confirmModal.css";
const ConfirmModal = ({ data, onConfirm, onClose }) => {
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
              onConfirm("장바구니 확인");
            } else if (data === "장바구니에 추가하시겠습니까?") {
              onConfirm("장바구니 추가");
            } else if (data === "이 항목을 삭제하겠습니까?") {
              onConfirm("항목 삭제");
            } else if (data === "선택된 항목을 삭제하겠습니까?") {
              onConfirm("선택된 항목 삭제");
            } else if (data === "전체 항목을 삭제하겠습니까?") {
              onConfirm("전체 항목 삭제");
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
