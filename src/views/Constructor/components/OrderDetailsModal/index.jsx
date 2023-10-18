
import Modal from "../../../../components/Modal";
import "./styles.scss";

const OrderDetailsModal = ({ setIsOpenedModal }) => {
    const heading = "Order Details";

    return (
        <Modal heading={heading} setIsOpenedModal={setIsOpenedModal}>
            <div className="content">
                <ul className="content__col content__specifications ">
                    <h5 className="content__title">Technical specification</h5>
                    <li className="content__details">
                        <h6 className="content__details--subtitle">Socks Materials</h6>
                        <p className="content__details--description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    </li>
                    <li className="content__details">
                        <h6 className="content__details--subtitle">Packaging</h6>
                        <p className="content__details--description">Lorem ipsum dolor sit amet</p>
                    </li>
                    <li className="content__details">
                        <h6 className="content__details--subtitle">Label</h6>
                        <p className="content__details--description">Lorem ipsum dolor sit amet</p>
                    </li>
                </ul>

                <ul className="content__col content__sizes">
                    <h5 className="content__title">Size & Quantity</h5>
                    <li className="content__details">
                        <p className="content__details--description">
                            000 Pairs <span>40 - 50 Size</span>
                        </p>
                    </li>
                    <li className="content__details">
                        <p className="content__details--description">
                            000 Pairs <span>40 - 50 Size</span>
                        </p>
                    </li>
                    <li className="content__details">
                        <p className="content__details--description">
                            000 Pairs <span>40 - 50 Size</span>
                        </p>
                    </li>
                    <li className="content__details">
                        <p className="content__details--description">
                            000 Pairs <span>40 - 50 Size</span>
                        </p>
                    </li>
                    <li className="content__details">
                        <p className="content__details--description">
                            000 Pairs <span>40 - 50 Size</span>
                        </p>
                    </li>
                    <li className="content__details">
                        <p className="content__details--description">
                            000 Pairs <span>40 - 50 Size</span>
                        </p>
                    </li>
                </ul>

                <div className="content__col">
                    <h5 className="content__title content__title--low-margin">Socks colors</h5>
                    <ul className="content__colors"> 
                        <li className="color">
                            <div className="circle" style={{ backgroundColor: '#00F0FF' }}></div>
                            <span className="hex">000000</span>
                        </li>

                        <li className="color">
                            <div className="circle" style={{ backgroundColor: '#00FF18' }}></div>
                            <span className="hex">000000</span>
                        </li>

                        <li className="color">
                            <div className="circle" style={{ backgroundColor: '#2400FF' }}></div>
                            <span className="hex">000000</span>
                        </li>

                        <li className="color">
                            <div className="circle" style={{ backgroundColor: '#FFF' }}></div>
                            <span className="hex">000000</span>
                        </li>

                        <li className="color">
                            <div className="circle" style={{ backgroundColor: '#F00' }}></div>
                            <span className="hex">000000</span>
                        </li>

                        <li className="color">
                            <div className="circle" style={{ backgroundColor: '#FF00F6' }}></div>
                            <span className="hex">000000</span>
                        </li>
                    </ul>
                </div>
            </div>
        </Modal>
    )
}

export default OrderDetailsModal;