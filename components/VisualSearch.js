"use client";
import React, { useState, useRef, useEffect } from "react";
import './VisualSearch.css'

const VisualSearch = ({
  imageUrl,
  onSearch,
  isActive = false,
  initialSize = { width: 100, height: 100 },
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [searchArea, setSearchArea] = useState(initialSize);
  const [showStars, setShowStars] = useState(false);
 
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current && isActive) {
      const img = imageRef.current;
      const container = containerRef.current.getBoundingClientRect();

      // Get the natural aspect ratio of the image
      const aspectRatio = img.naturalWidth / img.naturalHeight;

      // Fit the image within the container while maintaining aspect ratio
      const containerWidth = container.width;
      const containerHeight = container.height;
      const containerAspectRatio = containerWidth / containerHeight;

      let displayWidth, displayHeight;

      if (aspectRatio > containerAspectRatio) {
        // Image is wider than the container
        displayWidth = containerWidth;
        displayHeight = containerWidth / aspectRatio;
      } else {
        // Image is taller than the container
        displayHeight = containerHeight;
        displayWidth = containerHeight * aspectRatio;
      }

      // Set the responsive image size
      setImageSize({
        width: displayWidth,
        height: displayHeight,
      });

      // Calculate initial search area size (50% of displayed image)
      const searchWidth = displayWidth * 0.5;
      const searchHeight = searchWidth * 0.5;

      setSearchArea({
        width: searchWidth,
        height: searchHeight,
      });

      // Center the search box
      setPosition({
        x: (displayWidth - searchWidth) / 2,
        y: (displayHeight - searchHeight) / 2,
      });
    }
  }, [isActive, imageRef.current]);
  

  const handleMouseDown = (e) => {
    if (!isActive) return;
    setIsDragging(true);
    const rect = imageRef.current.getBoundingClientRect();
    setStartPos({
      x: e.clientX - position.x + rect.left,
      y: e.clientY - position.y + rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isActive) return;
    const rect = imageRef.current.getBoundingClientRect();
    const newX = Math.max(
      0,
      Math.min(
        e.clientX - startPos.x + rect.left,
        rect.width - searchArea.width
      )
    );
    const newY = Math.max(
      0,
      Math.min(
        e.clientY - startPos.y + rect.top,
        rect.height - searchArea.height
      )
    );

    setPosition({
      x: newX,
      y: newY,
    });
  };

  const handleMouseUp = () => {
    if (isDragging && onSearch) {
      const rect = imageRef.current.getBoundingClientRect();
      const searchBox = {
        x: position.x / rect.width,
        y: position.y / rect.height,
        width: searchArea.width / rect.width,
        height: searchArea.height / rect.height,
      };
      captureScreenshot();
      setShowStars(true);
      setTimeout(() => setShowStars(false), 4000); 
      onSearch(searchBox);
    }
    setIsDragging(false);
  };

  const handleResize = (e, corner) => {
    if (!isActive) return;
    e.stopPropagation();
    const rect = imageRef.current.getBoundingClientRect();
    const minSize = 80;

    let newWidth = searchArea.width;
    let newHeight = searchArea.height;

    if (corner.includes("right")) {
      newWidth = Math.max(
        minSize,
        Math.min(e.clientX - rect.left - position.x, rect.width - position.x)
      );
    }
    if (corner.includes("bottom")) {
      newHeight = Math.max(
        minSize,
        Math.min(e.clientY - rect.top - position.y, rect.height - position.y)
      );
    }

    setSearchArea({
      width: newWidth,
      height: newHeight,
    });
  };
  const captureScreenshot = () => {
    if (!imageRef.current) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const img = imageRef.current;
    const rect = img.getBoundingClientRect();

    // Calculate crop dimensions in the natural image dimensions
    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;

    const cropX = position.x * scaleX;
    const cropY = position.y * scaleY;
    const cropWidth = searchArea.width * scaleX;
    const cropHeight = searchArea.height * scaleY;

    // Set canvas size to match the crop area
    canvas.width = cropWidth;
    canvas.height = cropHeight;

    // Draw the cropped area of the image onto the canvas
    context.drawImage(
      img,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    // Convert the canvas content to a data URL
    const screenshotDataUrl = canvas.toDataURL("image/png");
    console.log("Captured screenshot:", screenshotDataUrl);

   
    if (onSearch) {
      onSearch({ screenshot: screenshotDataUrl });
    }
  };
  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="relative mx-auto" style={{ width: imageSize.width, height: imageSize.height }}> 
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Search content"
          className="w-full h-full object-contain"
        />
        {isActive && (
          <>
            {/* Top overlay */}
            <div 
              className="absolute bg-black/40" 
              style={{ 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: position.y 
              }} 
            />
            
            {/* Bottom overlay */}
            <div 
              className="absolute bg-black/40" 
              style={{ 
                top: position.y + searchArea.height, 
                left: 0, 
                width: '100%', 
                height: imageSize.height - (position.y + searchArea.height)
              }} 
            />
            
            {/* Left overlay */}
            <div 
              className="absolute bg-black/40" 
              style={{ 
                top: position.y, 
                left: 0, 
                width: position.x, 
                height: searchArea.height 
              }} 
            />
            
            {/* Right overlay */}
            <div 
              className="absolute bg-black/40" 
              style={{ 
                top: position.y, 
                left: position.x + searchArea.width, 
                width: imageSize.width - (position.x + searchArea.width), 
                height: searchArea.height 
              }} 
            />

            {/* Search area */}
            <div
              className="absolute flex items-center justify-center cursor-move"
              style={{
                left: position.x,
                top: position.y,
                width: searchArea.width,
                height: searchArea.height,
                borderRadius: "12px",
                // boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.3)",
              }}
              onMouseDown={handleMouseDown}
            >
               {showStars && (
                <div className="glowing-stars">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className="star"></div>
                  ))}
                </div>
              )}
              {/* Corner Markers */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white rounded-br-lg"></div>
              </div>

              {/* Resize Handle */}
              <div
                className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  const handleMouseMove = (moveEvent) => {
                    handleResize(moveEvent, "right-bottom");
                  };
                  const handleMouseUp = () => {
                    document.removeEventListener("mousemove", handleMouseMove);
                    document.removeEventListener("mouseup", handleMouseUp);
                  };
                  document.addEventListener("mousemove", handleMouseMove);
                  document.addEventListener("mouseup", handleMouseUp);
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VisualSearch;