import Icon from "../Icon";
import "./style.scss";

const Modal = ({ children, heading, setIsOpenedModal }) => {
    return (
        <div className="modal"  onClick={() => setIsOpenedModal(false)}>
            <div className="modal__window" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <h4 className="modal__title">{heading}</h4>
                    <button className="modal__btn modal__btn--close"  onClick={() => setIsOpenedModal(false)}>
                        <Icon
                            name="modal-close"
                            color="white"
                            size={21}
                        />
                    </button>
                </div>
                <div className="modal__body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;