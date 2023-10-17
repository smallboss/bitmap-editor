import "./style.scss";

const Button = ({ children, onClick = () => {}, className, style = {} }) => {
  return (
    <button
      className={`button ${className || ""}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
