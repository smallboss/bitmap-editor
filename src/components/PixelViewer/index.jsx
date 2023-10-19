import { useEffect, useRef, useState } from "react";
import Comments from "../../components/Comments";
import Design from "../../components/Design";
import Icon from "../Icon";
import "./style.scss";

const getTransform = (transform) => {
  const pattern = /translate\((-?\d*\.?\d+)px, (-?\d*\.?\d+)px\)/;
  let match = transform.match(pattern);
  const x = parseFloat(match[1]);
  const y = parseFloat(match[2]);

  const scalePattern = /scale\((-?\d*\.?\d+)\)/;
  match = transform.match(scalePattern);
  const scale = parseFloat(match[1]);

  return [x, y, scale];
};

const PixelViewer = ({ order }) => {
  const canvasRef = useRef(null);
  const gridRef = useRef(null);
  const [conf, setConf] = useState({
    color: "00F0FF",
    erase: false,
    side: "Left",
    grid: true,
    zoom: true,
  });

  const draw = (ctx, image, pixels) => {
    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let pixel in pixels) {
      ctx.beginPath();
      ctx.fillStyle = pixels[pixel].color;
      ctx.rect(...pixel.split(","), 1, 1);
      ctx.fill();
    }
  };

  const drawGrid = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    const step = 10;
    for (let x = 0; x <= ctx.canvas.width; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
    }

    for (let y = 0; y <= ctx.canvas.height; y += step) {
      ctx.moveTo(0, y - 0);
      ctx.lineTo(ctx.canvas.width, y - 0);
    }

    ctx.strokeStyle = "#6E7683";
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const translate = (container, dx = 0, dy = 0) => {
    const [x, y, scale] = getTransform(container.style.transform);
    let reX = x + dx;
    let reY = y + dy;

    if (x + dx > (container.offsetWidth * scale - container.offsetWidth) / 2) {
      reX = (container.offsetWidth * scale - container.offsetWidth) / 2;
    }

    if (x + dx < -(container.offsetWidth * scale - container.offsetWidth) / 2) {
      reX = -(container.offsetWidth * scale - container.offsetWidth) / 2;
    }

    if (
      y + dy >
      (container.offsetHeight * scale - container.offsetHeight) / 2
    ) {
      reY = (container.offsetHeight * scale - container.offsetHeight) / 2;
    }

    if (
      y + dy <
      -(container.offsetHeight * scale - container.offsetHeight) / 2
    ) {
      reY = -(container.offsetHeight * scale - container.offsetHeight) / 2;
    }

    container.style.transform = `translate(${reX}px, ${reY}px) scale(${scale})`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.conf = conf;
  }, [conf]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    let animationFrameId;
    let isDragging = false;

    let image = new Image();
    image.onload = () => {
      setTimeout(() => {
        image.onload = null;
        image.src = canvas.toDataURL();
      }, 700);
    };
    image.crossOrigin = "anonymous";
    image.src = order.template.file_data[0];

    const grid = gridRef.current;
    const gridCtx = grid.getContext("2d");
    gridCtx.imageSmoothingEnabled = false;

    const mousedown = () => {
      isDragging = true;
    };
    const pixels = {};
    const mousemove = (e) => {
      if (e.layerX < 0) return;
      if (isDragging) {
        if (!context.conf?.zoom) {
          const scaleX = canvas.width / container.offsetWidth;
          const scaleY = canvas.height / container.offsetHeight;
          const x = Math.floor(e.offsetX * scaleX) - 1;
          const y = Math.floor(e.offsetY * scaleY);

          if (context.conf?.erase) {
            delete pixels[`${x},${y}`];
          } else {
            pixels[`${x},${y}`] = {
              color: context.conf?.color
                ? `#${context.conf?.color}`
                : "#000000",
            };
          }
          return;
        }
        const dx = e.movementX;
        const dy = e.movementY;

        translate(container, dx, dy);
      }
    };
    const mouseup = () => {
      isDragging = false;
    };
    container.addEventListener("mousedown", mousedown);
    container.addEventListener("mousemove", mousemove);
    container.addEventListener("mouseup", mouseup);
    container.addEventListener("mouseleave", mouseup);

    const render = () => {
      animationFrameId = window.requestAnimationFrame(render);
      draw(context, image, pixels);
      if (context.conf?.grid) {
        drawGrid(gridCtx);
      } else {
        gridCtx.clearRect(0, 0, gridCtx.canvas.width, gridCtx.canvas.height);
      }
    };
    render();

    return () => {
      container.removeEventListener("mousedown", mousedown);
      container.removeEventListener("mousemove", mousemove);
      container.removeEventListener("mouseup", mouseup);
      container.removeEventListener("mouseleave", mouseup);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const zoom = (scaleFactor) => () => {
    const canvas = canvasRef.current;
    const container = canvas.parentElement;

    const [x, y, scale] = getTransform(container.style.transform);

    if (scale + scaleFactor < 1) return;
    if (scale + scaleFactor > 7) return;

    container.style.transform = `translate(${x}px, ${y}px) scale(${
      scale + scaleFactor
    })`;
    translate(container);
  };

  return (
    <>
      <div className="viewer-container">
        <div style={{ position: "relative", height: "100%" }}>
          <div className="canvas-wrapper">
            <div
              style={{
                width: "100%",
                height: "100%",
                transform: "translate(0, 0) scale(1)",
              }}
            >
              <canvas
                style={{
                  backgroundColor: "white",
                  imageRendering: "pixelated",
                  height: "100%",
                }}
                width={168}
                height={450}
                ref={canvasRef}
              ></canvas>

              <canvas
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  imageRendering: "pixelated",
                  height: "100%",
                }}
                width={168 * 10}
                height={450 * 10}
                ref={gridRef}
              ></canvas>
            </div>
          </div>
          <div className="canvas-btns">
            <button onClick={zoom(1)}>
              <Icon name="zoom-in" size={28} color="white" />
            </button>
            <button onClick={zoom(-1)}>
              <Icon name="zoom-out" size={28} color="white" />
            </button>
            <button
              style={conf.zoom ? { backgroundColor: "#214167" } : {}}
              onClick={() => {
                setConf((prev) => ({
                  ...prev,
                  zoom: true,
                }));
              }}
            >
              <Icon name="move" size={28} color="white" />
            </button>
          </div>
        </div>
      </div>
      <div className="right-bar">
        <Design data={conf} setData={setConf} />
        <Comments />
      </div>
    </>
  );
};

export default PixelViewer;
