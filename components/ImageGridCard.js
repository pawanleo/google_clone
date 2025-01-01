import React, { useState, useEffect } from "react";

const ImageGridCard = ({ image, link, price, description, website,icon}) => {
  const [aspectRatio, setAspectRatio] = useState(75); // Default 4:3 ratio
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = typeof image === "string" ? image : "/demon-slayer.jpg";

    img.onload = () => {
      const ratio = (img.height / img.width) * 100;
      setAspectRatio(ratio);
      setIsLoading(false);
    };

    img.onerror = () => {
      // Keep default aspect ratio on error
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [image]);

  return (
    <div className="md:pb-3">
      <div className="overflow-hidden relative z-0">
        <a className="relative no-underline">
          <div className="cursor-pointer max-w-full select-none relative md:rounded-[16px] overflow-hidden">
            <div
              className="h-0 overflow-hidden relative"
              style={{ paddingTop: `${aspectRatio}%` }}
            >
              {isLoading && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-200 animate-pulse" />
              )}
              <img
                src={typeof image === "string" ? image : "/demon-slayer.jpg"}
                alt={description}
                className={`absolute top-0 left-0 bg-[rgb(241,243,244)] object-cover h-full w-full align-bottom border-0 transition-opacity duration-300 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                loading="lazy"
              />
              <div className="bg-black/30 left-0 h-full pointer-events-none absolute top-0 w-full"></div>
            </div>
          </div>
        </a>
        <div className="bg-white rounded-[10px] cursor-pointer pb-2 select-none">
          <div className="select-auto md:mt-3 mt-2 mx-1 mb-0">
            <div className="flex items-center mb-1.5">
              <img
                className=" select-none h-[18px] w-[18px] bg-transparent rounded-md mr-2 object-cover align-bottom"
                src={icon}
              />
              <span className="font-sans text-[.875rem] tracking-wide text-gray-800  leading-5 line-clamp-2 overflow-hidden break-words">
                Amazon.in
              </span>
            </div>
            <div className="font-sans text-[.875rem] tracking-wide text-gray-800 font-medium leading-5 line-clamp-2 overflow-hidden break-words">
              Aditya Birla Fashion and Retail SWOT Analysis - Osum
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default ImageGridCard;
