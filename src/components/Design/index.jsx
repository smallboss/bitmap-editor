import { useState } from "react";
import Icon from "../Icon";
import "./style.scss";

const colors = ["00F0FF", "00FF18", "2400FF", "FFFFFF", "FF0000", "FF00F6"];

const Design = ({ data, setData }) => {
  const [drop, setDrop] = useState(null);

  const toggleTool = (property, value) => () => {
    if (property === "color") {
      setData((prev) => ({
        ...prev,
        erase: false,
        zoom: false,
      }));
    }

    if (property === "erase") {
      setData((prev) => ({
        ...prev,
        zoom: false,
      }));
    }

    setData((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const toggleDrop = (value) => () => {
    setDrop((prev) => (prev === value ? null : value));
  };
  return (
    <div className="design">
      <div className="design__header">Edit design</div>

      <div className="design__item">
        <div className="design__item__header" onClick={toggleDrop("color")}>
          <Icon name="pencil" size={25} color="white" />
          <span>Add to design</span>
          <div className="toggle-slide">
            <Icon
              className={drop === "color" ? "mirror-y" : ""}
              name="arrow-up"
              size={18}
              color="white"
            />
          </div>
        </div>
        {drop === "color" && (
          <div className="design__item__body">
            <div className="body-title">
              Select a color to modify and expand the design
            </div>
            <div className="body-container">
              {colors.map((color) => (
                <div
                  key={color}
                  className="body-item"
                  style={
                    data.color === color && !data.erase && !data.zoom
                      ? { backgroundColor: "white", color: "black" }
                      : {}
                  }
                  onClick={toggleTool("color", color)}
                >
                  <div
                    className="marker"
                    style={{ backgroundColor: `#${color}` }}
                  />
                  <span>{color}</span>
                  <div className="color-plus" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="design__item">
        <div
          className="design__item__header"
          onClick={toggleTool("erase", true)}
          style={data.erase && !data.zoom ? { backgroundColor: "#214167" } : {}}
        >
          <Icon name="eraser" size={25} color="white" />
          <span>Erase</span>
        </div>
      </div>

      <div className="design__item">
        <div className="design__item__header" onClick={toggleDrop("side")}>
          <Icon name="eye" size={25} color="white" />
          <span>{data.side}</span>
          <div className="toggle-slide">
            <Icon
              className={drop === "side" ? "mirror-y" : ""}
              name="arrow-up"
              size={18}
              color="white"
            />
          </div>
        </div>
        {drop === "side" && (
          <div className="design__item__body">
            <div className="body-container">
              <div className="body-item" onClick={toggleTool("side", "Left")}>
                <span>Left</span>
              </div>

              <div className="body-item" onClick={toggleTool("side", "Right")}>
                <span>Right</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="design__item">
        <div
          className="design__item__header"
          onClick={toggleTool("grid", !data.grid)}
        >
          <span style={{ margin: 0 }}>Enable Grid</span>
          <div className="toggle">
            <div
              className="toggle-thumb"
              style={data.grid ? { transform: "translateX(23px)" } : {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Design;
