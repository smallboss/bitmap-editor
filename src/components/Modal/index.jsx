import { useEffect, useRef } from "react";
import Icon from "../Icon";
import "./style.scss";

const Modal = ({ children, heading, setIsOpenedModal }) => {
  const modalWindowRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setTimeout(
      () => modalWindowRef.current.classList.add("modal__window--open"),
      1,
    );
    return () => {
      document.body.style.overflow = "unset";
    };
  });

  const close = () => {
    modalWindowRef.current.classList.remove("modal__window--open");
    setTimeout(() => setIsOpenedModal(false), 300);
  };

  return (
    <div className="modal" onClick={close}>
      <div
        className="modal__window"
        ref={modalWindowRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h4 className="modal__title">{heading}</h4>
          <button className="modal__btn modal__btn--close" onClick={close}>
            <Icon name="modal-close" color="white" size={21} />
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
