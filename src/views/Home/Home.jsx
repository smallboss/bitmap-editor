import Button from "../../components/Button";
import "./styles.scss";

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
        <div style={{ display: "flex" }}>
          <Button style={{ marginRight: "20px" }}>Get Started</Button>
          <Button>Log In</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
