import Modal from "../../../../components/Modal";
import "./styles.scss";

const TipsModal = ({ setIsOpenedModal }) => {
  const heading = "Tips";

  return (
    <Modal heading={heading} setIsOpenedModal={setIsOpenedModal}>
      <div className="tips-modal-content">
        <h3>Step 1</h3>
      </div>
    </Modal>
  );
};

export default TipsModal;
