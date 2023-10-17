import "./style.scss";

const Icon = ({ name, color = "white", size = 14, className }) => {
  return (
    <i
      className={`icon-${name} ${className || ""}`}
      style={{
        height: `${size}px`,
        width: `${size}px`,
        minWidth: `${size}px`,
        backgroundColor: color,
      }}
    />
  );
};
export default Icon;
