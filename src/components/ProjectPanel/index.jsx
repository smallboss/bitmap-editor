import Icon from "../Icon";
import "./style.scss";

const ProjectPanel = ({ 
  onClick = () => {},
  setIsOpenedOrderDetailsModal,
  setIsOpenedTipsModal
}) => {
  return (
    <div className="project-panel">
      <div className="project-panel__title">Your project</div>

      <div
        className="project-panel__item"
        onClick={() => setIsOpenedTipsModal(true)}
      >
        <Icon name="tips" size={25} color="white" />
        <span>Tips</span>
      </div>

      <div
        className="project-panel__item"
        onClick={() => onClick({ value: "share" })}
      >
        <Icon name="share" size={25} color="white" />
        <span>Share Project</span>
      </div>

      <div
        className="project-panel__item"
        onClick={() => setIsOpenedOrderDetailsModal(true)}
      >
        <Icon name="info" size={25} color="white" />
        <span>Order Details</span>
      </div>

      <div
        className="project-panel__item"
        onClick={() => onClick({ value: "over" })}
      >
        <Icon name="arrow-left" size={29} color="white" />
        <span>Start over</span>
      </div>
    </div>
  );
};

export default ProjectPanel;
