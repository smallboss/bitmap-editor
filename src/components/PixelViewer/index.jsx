import { useEffect, useRef } from "react";
import Icon from "../Icon";
import "./style.scss";

const PixelViewer = ({ order }) => {
  const canvasRef = useRef(null);
  const gridRef = useRef(null);
  const drawRef = useRef(null);

  const draw = (ctx, image) => {
    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const drawing = (ctx, array) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    array.forEach((item) => {
      ctx.fillRect(...item.split(","), 1, 1);
    });
  };

  const drawCover = (ctx) => {
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

  const translate = (context, canvas, dx = 0, dy = 0) => {
    const zoom = context.currentScale || 1;
    const current = {
      x: context.currentTranslate.x + dx,
      y: context.currentTranslate.y + dy,
    };

    const limitX = (canvas.width / zoom - canvas.width) / 2;
    const limitY = (canvas.height / zoom - canvas.height) / 2;

    if (current.x < limitX) {
      current.x = limitX;
      dx = -context.currentTranslate.x + limitX;
    }
    if (current.x > -limitX) {
      current.x = -limitX;
      dx = -context.currentTranslate.x - limitX;
    }

    if (current.y < limitY) {
      current.y = limitY;
      dy = -context.currentTranslate.y + limitY;
    }
    if (current.y > -limitY) {
      current.y = -limitY;
      dy = -context.currentTranslate.y - limitY;
    }

    context.currentTranslate = current;
    context.translate(dx, dy);
    return { dx, dy };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    context.currentTranslate = {
      x: 0,
      y: 0,
    };
    let animationFrameId;
    let isDragging = false;
    let isLoad = true;

    let image = new Image();
    image.onload = () => {
      setTimeout(() => {
        image.onload = null;
        image.src = canvas.toDataURL();
        isLoad = false;
      }, 700);
    };
    image.crossOrigin = "anonymous";
    image.src = order.template.file_data[0];

    const grid = gridRef.current;
    const gridCtx = grid.getContext("2d");
    gridCtx.imageSmoothingEnabled = false;

    const drawCanvas = drawRef.current;
    const drawCtx = drawCanvas.getContext("2d");
    gridCtx.imageSmoothingEnabled = false;

    let mod = "draw";

    window.mod = () => {
      mod = mod ? "" : "draw";
    };
    const mousedown = () => {
      isDragging = true;
    };
    let array = [];
    const mousemove = (e) => {
      if (isDragging) {
        const zoom = context.currentScale || 1;
        if (mod === "draw") {
          const scaleX = drawCanvas.width / container.offsetWidth / zoom;
          const scaleY = drawCanvas.height / container.offsetHeight / zoom;
          const transform = context.getTransform();
          const translationX = transform.e / zoom;
          const translationY = transform.f / zoom;
          const x = Math.floor(e.offsetX * scaleX - translationX);
          const y = Math.floor(e.offsetY * scaleY - translationY);

          if (!array.includes(`${x},${y}`)) {
            array.push(`${x},${y}`);
          }

          return;
        }
        const dx = e.movementX / (2 * zoom);
        const dy = e.movementY / (2 * zoom);
        const shift = translate(context, canvas, dx, dy);
        drawCtx.translate(shift.dx, shift.dy);
        gridCtx.translate(shift.dx * 10, shift.dy * 10);
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
      draw(context, image);
      drawing(drawCtx, array);
      if (!isLoad) drawCover(gridCtx);
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
    const context = canvas.getContext("2d");

    const grid = gridRef.current;
    const gridCtx = grid.getContext("2d");

    const drawCanvas = drawRef.current;
    const drawCtx = drawCanvas.getContext("2d");

    const currentScale = Math.abs((context.currentScale || 1) * scaleFactor);
    if (currentScale < 1) return;
    context.currentScale = currentScale;

    const centerX = canvas.width / 2 - context.currentTranslate.x;
    const centerY = canvas.height / 2 - context.currentTranslate.y;

    const centerGritX = grid.width / 2 - context.currentTranslate.x * 10;
    const centerGritY = grid.height / 2 - context.currentTranslate.y * 10;

    context.translate(centerX, centerY);
    context.scale(scaleFactor, scaleFactor);
    context.translate(-centerX, -centerY);

    drawCtx.translate(centerX, centerY);
    drawCtx.scale(scaleFactor, scaleFactor);
    drawCtx.translate(-centerX, -centerY);

    const shift = translate(context, canvas);
    drawCtx.translate(shift.dx, shift.dy);

    gridCtx.translate(centerGritX, centerGritY);
    gridCtx.scale(scaleFactor, scaleFactor);
    gridCtx.translate(-centerGritX, -centerGritY);

    gridCtx.translate(shift.dx * 10, shift.dy * 10);
  };

  return (
    <div className="canvas-wrapper">
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
        width={168}
        height={450}
        ref={drawRef}
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
      <div className="canvas-btns">
        <button onClick={zoom(1.1)}>
          <Icon name="zoom-in" size={28} color="white" />
        </button>
        <button onClick={zoom(1 / 1.1)}>
          <Icon name="zoom-out" size={28} color="white" />
        </button>
        <button>
          <Icon name="move" size={28} color="white" />
        </button>
      </div>
    </div>
  );
};

export default PixelViewer;
