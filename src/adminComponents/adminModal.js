import "../css/admin/adminModal.css";
const AdminModal = ({ data, onConfirm, onClose }) => {
  return (
    <div className="adminModal">
      <img src="/images/btn_delete.png" alt="" onClick={onClose} />
      <p>{data}</p>
      <div className="btn_box">
        <div className="btn" onClick={onClose}>
          취소
        </div>
        <div
          className="btn"
          onClick={() => {
            if (data === "정말로 삭제하시겠습니까?") {
              onConfirm("항목 삭제");
            }
          }}
        >
          확인
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
