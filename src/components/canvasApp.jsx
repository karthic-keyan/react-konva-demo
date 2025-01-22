import { useState } from "react";
import { Stage, Layer } from "react-konva";

const CanvasApp = () => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isCanvasReady, setCanvasReady] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDimensions({ ...dimensions, [name]: value });
  };

  const handleCreateCanvas = (e) => {
    e.preventDefault();
    setCanvasReady(true);
  };

  return (
    <div>
      {!isCanvasReady ? (
        <form onSubmit={handleCreateCanvas}>
          <label>
            Width:
            <input
              type="number"
              name="width"
              value={dimensions.width}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Height:
            <input
              type="number"
              name="height"
              value={dimensions.height}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Create Canvas</button>
        </form>
      ) : (
        <div>
          <h3>Canvas</h3>
          <Stage
            width={dimensions.width}
            height={dimensions.height}
            style={{
              border: "1px solid black",
              backgroundColor: "white",
              margin: "20px 0",
            }}
          >
            <Layer></Layer>
          </Stage>
        </div>
      )}
    </div>
  );
};

export default CanvasApp;
