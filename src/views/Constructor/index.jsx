import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import Comments from "../../components/Comments";
import Design from "../../components/Design";
import Icon from "../../components/Icon";
import PixelViewer from "../../components/PixelViewer";
import ProjectPanel from "../../components/ProjectPanel";
import { useEffect, useState } from "react";
import OrderService from "../../services/order.service";

import "./style.scss";
import SocksViewer from "./components/SocksViewer";

const Constructor = () => {
  const { orderId } = useParams();
  const [step, setStep] = useState("pixel");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const request = async () => {
      try {
        const data = await OrderService.getOrder(orderId);
        setOrder(data);
      } catch (error) {
        setOrder(error.message);
      }
    };

    request();
  }, []);

  if (!order) return <div>Loading...</div>;
  if (typeof order === "string") return <div>Error: {order}</div>;

  return (
    <div className="constructor">
      <div className="left-bar">
        <div className="constructor--info">
          <Icon name="info" color="white" size={10} />
          <span>Regular Socks</span>
        </div>

        <div className="left-bar--title">
          <span>Project name and other details</span>
        </div>
        <div className="left-bar--order">
          <span>Order no 000000X</span>
        </div>

        <ProjectPanel onClick={(value) => console.log(value)} />

        <Button onClick={() => setStep("order")}>
          <span>Ready to order</span>
          <Icon
            className="mirror-x"
            name="arrow-left"
            color="white"
            size={26}
          />
        </Button>
      </div>
      {step === "pixel" && (
        <>
          <div className="viewer-container">
            <PixelViewer order={order} />
          </div>
          <div className="right-bar">
            <Design onChange={(data) => console.log(data)} />
            <Comments />
          </div>
        </>
      )}
      {step === "order" && <SocksViewer order={order} />}
    </div>
  );
};

export default Constructor;
