"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

const VisualSearch = ({
  imageUrl,
  onSearch,
  isActive = false,
  initialSize = { width: 100, height: 100 },
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageSize,setImageSize]=useState({width:0,height:0})
  const [searchArea, setSearchArea] = useState(initialSize);
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current && isActive) {
      // Get container dimensions
      const container = containerRef.current.getBoundingClientRect();
      const img = imageRef.current;

      // Calculate image display size while maintaining aspect ratio
      const scale = Math.min(
        container.width / img.naturalWidth,
        container.height / img.naturalHeight
      );

      const displayWidth = img.naturalWidth * scale;
      const displayHeight = img.naturalHeight * scale;

      // Calculate initial search area size (20% of displayed image width)
      const searchWidth = displayWidth * 0.5;
      const searchHeight = searchWidth * 0.5;

      const newImageWidth=img.naturalWidth
      const newImageHeight=img.naturalHeight
      setImageSize({
        width: newImageWidth,
        height: newImageHeight,
      })
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
    const rect = containerRef.current.getBoundingClientRect();
    setStartPos({
      x: e.clientX - position.x + rect.left,
      y: e.clientY - position.y + rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isActive) return;
    const rect = containerRef.current.getBoundingClientRect();
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
      const rect = containerRef.current.getBoundingClientRect();
      const searchBox = {
        x: position.x / rect.width,
        y: position.y / rect.height,
        width: searchArea.width / rect.width,
        height: searchArea.height / rect.height,
      };
      onSearch(searchBox);
    }
    setIsDragging(false);
  };

  const handleResize = (e, corner) => {
    if (!isActive) return;
    e.stopPropagation();
    const rect = containerRef.current.getBoundingClientRect();
    const minSize = 80; // Reduced minimum size

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

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div > 
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Search content"
          className="max-w-full h-auto"
        />
      </div>
      {isActive && (
        <>
          {/* Black overlay outside search area */}
          <div className="absolute inset-0 bg-black/40">
            {/* Cutout for search area */}
            <div
              className="absolute bg-transparent"
              style={{
                left: position.x,
                top: position.y,
                width: searchArea.width,
                height: searchArea.height,
                boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.4)",
              }}
            />
          </div>

          {/* Search area */}
          <div
            className="absolute flex items-center justify-center cursor-move"
            style={{
              left: position.x,
              top: position.y,
              width: searchArea.width,
              height: searchArea.height,

              borderRadius: "12px",
              boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.3)",
            }}
            onMouseDown={handleMouseDown}
          >
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
  );
};

export default VisualSearch;
