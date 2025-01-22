import  { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image } from "react-konva";

const CanvasWithVideoUpload = () => {
  const [video, setVideo] = useState(null);
  const videoRef = useRef(null);
  const konvaImageRef = useRef(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const vid = document.createElement("video");
      vid.src = url;
      vid.loop = true;
      vid.muted = true;
      vid.autoplay = true;
      setVideo(vid);
    }
  };

  useEffect(() => {
    if (video) {
      const layer = konvaImageRef.current.getLayer();
      video.play();
      const anim = new Konva.Animation(() => {
        konvaImageRef.current.getLayer().batchDraw();
      }, layer);
      anim.start();

      return () => anim.stop(); // Stop animation when component unmounts
    }
  }, [video]);

  return (
    <div>
      <input
        type="file"
        accept="video/*"
        style={{ marginBottom: "10px" }}
        onChange={handleVideoUpload}
      />
      <Stage width={800} height={600} style={{ border: "1px solid black" }}>
        <Layer>
          {video && (
            <Image
              ref={konvaImageRef}
              image={video}
              x={50}
              y={50}
              width={400}
              height={300}
              draggable
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasWithVideoUpload;
