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
      return "Unknown materials";
  }
};

const convertSockColor = (sockColorName) => {
  for (const category in SockColors) {
    for (const color in SockColors[category]) {
      if (SockColors[category][color].name === sockColorName) {
        return SockColors[category][color].code;
      }
    }
  }
  return "#FFFFFF";
};

const OrderDetailsModal = ({ setIsOpenedModal, orderItems }) => {
  const { type, weltType, color, heel, toes, welt } = orderItems;
  const heading = "Order Details";

  const renderColorsColumn = [color, heel, toes, welt].map((colorName, i) => {
    const hexCode = convertSockColor(colorName);
    return (
      <li key={i} className="color">
        <div className="circle" style={{ backgroundColor: hexCode }}></div>
        <span className="hex">{hexCode.slice(1)}</span>
      </li>
    );
  });

  return (
    <Modal heading={heading} setIsOpenedModal={setIsOpenedModal}>
      <div className="content">
        <ul className="content__col content__specifications ">
          <h5 className="content__title">Technical specification</h5>
          <li className="content__details">
            <h6 className="content__details--subtitle">Socks Materials</h6>
            <p className="content__details--description">
              {findMaterials(type, weltType)}
            </p>
          </li>
          <li className="content__details">
            <h6 className="content__details--subtitle">Packaging</h6>
            <p className="content__details--description">
              Lorem ipsum dolor sit amet
            </p>
          </li>
          <li className="content__details">
            <h6 className="content__details--subtitle">Label</h6>
            <p className="content__details--description">
              Lorem ipsum dolor sit amet
            </p>
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
          <h5 className="content__title content__title--low-margin">
            Socks colors
          </h5>
          <ul className="content__colors">{renderColorsColumn}</ul>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
