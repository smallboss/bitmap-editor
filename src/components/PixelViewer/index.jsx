import { useEffect, useRef } from "react";
import ImageTest from "../../assets/test.png";
import Icon from "../Icon";
import "./style.scss";

const PixelViewer = () => {
  const canvasRef = useRef(null);

  const draw = (ctx, image) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const checkLimit = (context, canvas, dx = 0, dy = 0) => {
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
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    context.currentTranslate = {
      x: 0,
      y: 0,
    };
    let animationFrameId;
    let isDragging = false;

    let image = new Image();
    image.onload = () => {
      window
        .createImageBitmap(image, { resizeQuality: "pixelated" })
        .then((result) => {
          image = result;
        });
    };
    image.src = ImageTest;

    const mousedown = () => {
      isDragging = true;
    };
    const mousemove = (e) => {
      if (isDragging) {
        const zoom = context.currentScale || 1;
        const dx = e.movementX / (2 * zoom);
        const dy = e.movementY / (2 * zoom);
        checkLimit(context, canvas, dx, dy);
      }
    };
    const mouseup = () => {
      isDragging = false;
    };
    canvas.addEventListener("mousedown", mousedown);
    canvas.addEventListener("mousemove", mousemove);
    canvas.addEventListener("mouseup", mouseup);
    canvas.addEventListener("mouseleave", mouseup);

    const render = () => {
      animationFrameId = window.requestAnimationFrame(render);
      draw(context, image);
    };
    render();

    return () => {
      canvas.removeEventListener("mousedown", mousedown);
      canvas.removeEventListener("mousemove", mousemove);
      canvas.removeEventListener("mouseup", mouseup);
      canvas.removeEventListener("mouseleave", mouseup);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const zoom = (scaleFactor) => () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const currentScale = Math.abs((context.currentScale || 1) * scaleFactor);
    if (currentScale < 1) return;
    context.currentScale = currentScale;

    const centerX = canvas.width / 2 - context.currentTranslate.x;
    const centerY = canvas.height / 2 - context.currentTranslate.y;

    context.translate(centerX, centerY);
    context.scale(scaleFactor, scaleFactor);
    context.translate(-centerX, -centerY);

    checkLimit(context, canvas);
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
