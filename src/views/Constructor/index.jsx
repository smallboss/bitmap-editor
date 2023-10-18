import Button from "../../components/Button";
import Comments from "../../components/Comments";
import Design from "../../components/Design";
import Icon from "../../components/Icon";
import PixelViewer from "../../components/PixelViewer";
import ProjectPanel from "../../components/ProjectPanel";
import "./style.scss";

const Constructor = () => {
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

        <Button>
          <span>Ready to order</span>
          <Icon
            className="mirror-x"
            name="arrow-left"
            color="white"
            size={26}
          />
        </Button>
      </div>
      <div className="viewer-container">
        <PixelViewer />
      </div>
      <div className="right-bar">
        <Design onChange={(data) => console.log(data)} />
        <Comments />
      </div>
    </div>
  );
};

export default Constructor;
