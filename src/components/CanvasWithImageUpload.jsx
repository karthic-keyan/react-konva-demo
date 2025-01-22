import  { useState, useRef } from "react";
import { Stage, Layer, Image } from "react-konva";

const CanvasAppWithImageUpload = () => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isCanvasReady, setCanvasReady] = useState(false);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  // Handle dimension input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDimensions({ ...dimensions, [name]: value });
  };

  // Create canvas
  const handleCreateCanvas = (e) => {
    e.preventDefault();
    setCanvasReady(true);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;
      img.onload = () => {
        setImage(img);
      };
    };
    if (file) reader.readAsDataURL(file);
  };

  return (
    <div>
      {/* Form to set canvas dimensions */}
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

          {/* Image upload input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ marginBottom: "10px" }}
            onChange={handleImageUpload}
          />

          {/* Konva Stage */}
          <Stage
            width={dimensions.width}
            height={dimensions.height}
            style={{
              border: "1px solid black",
              backgroundColor: "white",
              margin: "20px 0",
            }}
          >
            <Layer>
              {image && (
                <Image
                  image={image}
                  x={50}
                  y={50}
                  width={200}
                  height={200}
                  draggable
                />
              )}
            </Layer>
          </Stage>
        </div>
      )}
    </div>
  );
};

export default CanvasAppWithImageUpload;
