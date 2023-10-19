import { Link } from "react-router-dom";
import rightArrow from '../../assets/icons/arrow_right.svg';
import "./styles.scss";

const Faq = () => {
  return (
    <div className="faq">
      <div className="faq__headerText">
        <h2 className="faq__headerText--text">FAQ</h2>
      </div>
      <div className="faq__content">
        <div className="faq__content--block">
          <p className="faq__content--block__header">
            Lorem ipsum dolor sit amet, consectetur adipiscing
          </p>
          <p className="faq__content--block__content">
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
            Consectetur dui eu sit interdum. Ut
            pellentesque tincidunt justo eu quam
            nisl etiam. Integer eget enim,
            pulvinar sit turpis in. Tortor morbi
            tempus amet in volutpat amet
            convallis. 
          </p>
        </div>
        <div className="faq__content--block">
          <p className="faq__content--block__header">
            Lorem ipsum dolor sit amet, consectetur adipiscing
          </p>
          <p className="faq__content--block__content">
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
            Consectetur dui eu sit interdum. Ut
            pellentesque tincidunt justo eu quam
            nisl etiam. Integer eget enim,
            pulvinar sit turpis in. Tortor morbi
            tempus amet in volutpat amet
            convallis. 
          </p>
        </div>
        <div className="faq__content--block">
          <p className="faq__content--block__header">
            Lorem ipsum dolor sit amet, consectetur adipiscing
          </p>
          <p className="faq__content--block__content">
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
            Consectetur dui eu sit interdum. Ut
            pellentesque tincidunt justo eu quam
            nisl etiam. Integer eget enim,
            pulvinar sit turpis in. Tortor morbi
            tempus amet in volutpat amet
            convallis. 
          </p>
        </div>
        <div className="faq__content--block">
          <p className="faq__content--block__header">
            Lorem ipsum dolor sit amet, consectetur adipiscing
          </p>
          <p className="faq__content--block__content">
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
            Consectetur dui eu sit interdum. Ut
            pellentesque tincidunt justo eu quam
            nisl etiam. Integer eget enim,
            pulvinar sit turpis in. Tortor morbi
            tempus amet in volutpat amet
            convallis. 
          </p>
        </div>
        <div className="faq__content--block">
          <p className="faq__content--block__header">
            Lorem ipsum dolor sit amet, consectetur adipiscing
          </p>
          <p className="faq__content--block__content">
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
            Consectetur dui eu sit interdum. Ut
            pellentesque tincidunt justo eu quam
            nisl etiam. Integer eget enim,
            pulvinar sit turpis in. Tortor morbi
            tempus amet in volutpat amet
            convallis. 
          </p>
        </div>
        <div className="faq__content--block">
          <p className="faq__content--block__header">
            Lorem ipsum dolor sit amet, consectetur adipiscing
          </p>
          <p className="faq__content--block__content">
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
            Consectetur dui eu sit interdum. Ut
            pellentesque tincidunt justo eu quam
            nisl etiam. Integer eget enim,
            pulvinar sit turpis in. Tortor morbi
            tempus amet in volutpat amet
            convallis. 
          </p>
        </div>
        <div className="faq__content--block">
          <p className="faq__content--block__header">
            Lorem ipsum dolor sit amet, consectetur adipiscing
          </p>
          <p className="faq__content--block__content">
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
            Consectetur dui eu sit interdum. Ut
            pellentesque tincidunt justo eu quam
            nisl etiam. Integer eget enim,
            pulvinar sit turpis in. Tortor morbi
            tempus amet in volutpat amet
            convallis. 
          </p>
        </div>
        <div className="faq__content--block">
          <p className="faq__content--block__header">
            Lorem ipsum dolor sit amet, consectetur adipiscing
          </p>
          <p className="faq__content--block__content">
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
            Consectetur dui eu sit interdum. Ut
            pellentesque tincidunt justo eu quam
            nisl etiam. Integer eget enim,
            pulvinar sit turpis in. Tortor morbi
            tempus amet in volutpat amet
            convallis. 
          </p>
        </div>        
      </div>
      <div className="faq__backButton">
        <Link to='/' className="faq__backButton--button">
          Back
          <img src={rightArrow} alt="" />
        </Link>
      </div>

    </div>
  );
};

export default Faq;
