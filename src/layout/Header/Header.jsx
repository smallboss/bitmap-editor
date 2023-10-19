import { Link } from "react-router-dom";
import "./styles.scss";

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
        <a target="_blank" rel="noreferrer" href="https://socksfactory.pl/kontakt/" className="header__rightSide--contactButton" type="text">
          Contact
        </a>
        <button className="header__rightSide--logInButton">Login 
          <div className="header__rightSide--logInButton--background"></div>
        </button>
      </div>
    </div>
  );
};

export default Header;
