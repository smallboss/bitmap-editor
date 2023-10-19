import "./styles.scss";
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="home__textWrapper">
        <p className="home__textWrapper--welcome">
          Welcome to the Studio BitMap
        </p>
        <h1 className="home__textWrapper--mainText">
          Print unique socks
          <br /> designs with an easily
          <br /> bit maps system.
        </h1>
        <p className="home__textWrapper--annotation">
          Here you can review, change or approve the final socks design.
          <br /> Quality assurance is our priority, we care about your
          experience
          <br /> throughout the process to the finish line.
        </p>
        <div className="home__buttons">
          <Link className="home__buttons--default" to="constructor/6526d5bffb30d429e3c68ad7">
            Get Started
            <div className="home__buttons--default--background"></div>
          </Link>
          <button className="home__buttons--default">
            Log In
            <div className="home__buttons--default--background"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
