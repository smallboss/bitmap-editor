import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.scss";

const basename = location.host.includes(':') ? '/' : 'portfolio/socks-bitmap-studio'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>,
);
