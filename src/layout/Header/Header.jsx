import { Link } from "react-router-dom";
import "./styles.scss";
import Button from "../../components/Button";
const Header = () => {
  return (
    <div className="header">
      <div className="header__leftSide">
        <h3>Studio Bitmap</h3>
        <p>Socks Factory</p>
      </div>
      <div className="header__rightSide">
        <Link to="/faq" className="header__rightSide--faqButton" type="text">
          FAQ
        </Link>
        <Link className="header__rightSide--contactButton" type="text">
          Contact
        </Link>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Header;
