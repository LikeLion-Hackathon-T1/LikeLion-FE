import { useState, useEffect } from "react";

const useImageAnalysis = (imageSrc) => {
  const [isDarkImage, setIsDarkImage] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let totalBrightness = 0;
        let count = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
          totalBrightness += brightness;
          count++;
        }
        const avgBrightness = totalBrightness / count;
        setIsDarkImage(avgBrightness < 190);
      } catch (error) {
        console.error("Failed to get image data: ", error);
      }
    };
  }, [imageSrc]);

  return isDarkImage;
};

export default useImageAnalysis;
