
import Modal from "../../../../components/Modal";
import SockColors from "../../../../../ColorsConfig.json";
import "./styles.scss";

const findMaterials = (sockType, weltType) => {
    switch (sockType.toLowerCase()) {
        case "sport":
            return `Composition 80% cotton, 15% polyamide, 5% elastane. Knitted product with a ${weltType} welt`;
        case "regular":
            return "Composition 80% cotton, 17% polyamide, 3% elastane. Knitted product";
        default:
            return "Unknown materials"
    }
}

const convertSockColor = (sockColorName) => {
    for (const category in SockColors) {
        for (const color in SockColors[category]) {
            if (SockColors[category][color].name === sockColorName) {
                return SockColors[category][color].code;
            }
        }
    }
    return "#FFFFFF";
}

const formatQuantityNum = (num) => {
    return num.toString().padStart(3, '0');
}

const OrderDetailsModal = ({ setIsOpenedModal, orderItems }) => {
    const {
        type, 
        weltType,
        color,
        heel,
        toes,
        welt,
        quantity2125,
        quantity2629,
        quantity3034,
        quantity3540,
        quantity4146
    } = orderItems;
    const heading = "Order Details";

    const renderColorsColumn = [color, heel, toes, welt].map((colorName, i) => {
        const hexCode = convertSockColor(colorName);
        return (
            <li key={i} className="color">
                <div className="circle" style={{ backgroundColor: hexCode }}></div>
                <span className="hex">{hexCode.slice(1)}</span>
            </li>
        )
    })

    const sizesAndQuantities = [
        { size: '21 - 25', quantity: quantity2125 },
        { size: '26 - 29', quantity: quantity2629 },
        { size: '30 - 34', quantity: quantity3034 },
        { size: '35 - 40', quantity: quantity3540 },
        { size: '41 - 46', quantity: quantity4146 },
    ];
    const renderSizesColumn = sizesAndQuantities.map(({ size, quantity }) => {
        const formattedQuantity = formatQuantityNum(quantity);
        return (
            <li key={size} className="order-modal-content__details">
                <p className="order-modal-content__details--description">
                    {formattedQuantity} Pairs <span>{size} Size</span>
                </p>
            </li>
        )
    })
    
    return (
        <Modal heading={heading} setIsOpenedModal={setIsOpenedModal}>
            <div className="order-modal-content">
                <ul className="order-modal-content__col order-modal-content__specifications ">
                    <h5 className="order-modal-content__title">Technical specification</h5>
                    <li className="order-modal-content__details">
                        <h6 className="order-modal-content__details--subtitle">Socks Materials</h6>
                        <p className="order-modal-content__details--description">{findMaterials(type, weltType)}</p>
                    </li>
                    <li className="order-modal-content__details">
                        <h6 className="order-modal-content__details--subtitle">Packaging</h6>
                        <p className="order-modal-content__details--description">Lorem ipsum dolor sit amet</p>
                    </li>
                    <li className="order-modal-content__details">
                        <h6 className="order-modal-content__details--subtitle">Label</h6>
                        <p className="order-modal-content__details--description">Lorem ipsum dolor sit amet</p>
                    </li>
                </ul>

                <ul className="order-modal-content__col order-modal-content__sizes">
                    <h5 className="order-modal-content__title">Size & Quantity</h5>
                    {renderSizesColumn}
                </ul>

                <div className="order-modal-content__col">
                    <h5 className="order-modal-content__title order-modal-content__title--low-margin">Socks colors</h5>
                    <ul className="order-modal-content__colors"> 
                        {renderColorsColumn}
                    </ul>
                </div>
            </div>
        </Modal>
    )
}

export default OrderDetailsModal;