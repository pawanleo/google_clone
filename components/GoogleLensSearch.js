"use client";
import { X } from "lucide-react";
import React, { useState, useRef } from "react";
import PictureIcon from "./icons/PictureIcon";
import { useRouter } from "next/navigation";

const GoogleLensSearch = ({ isOpen, onClose }) => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      // Create FormData
      const formData = new FormData();
      formData.append("file", file);

      // Here you would typically upload the file to your server
      // For now, we'll create a local URL and navigate
      const localUrl = URL.createObjectURL(file);
      router.push(`/google-lens?imageUrl=${encodeURIComponent(localUrl)}`);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileUpload(file);
    }
  };

  const handleUrlSearch = () => {
    if (imageUrl.trim()) {
      router.push(`/google-lens?imageUrl=${encodeURIComponent(imageUrl)}`);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="absolute top-[-4px] left-[-4px] w-[calc(100%+8px)] z-[989] shadow-lg shadow-[rgba(32,33,36,0.28)] mt-0 bg-[#303134] rounded-[24px]">
      <div className="m-[20px]">
        <div className="cursor-pointer flex p-[14px] absolute right-[6px] top-[6px]">
          <button className="h-[20px] w-[20px] leading-[20px] flex items-center justify-center" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <h1 className="text-[rgb(241,243,244)] font-arial text-[16px] font-semibold leading-[28px] mb-[14px] text-center tracking-[0.1px]">
          Search any image with Google Lens
        </h1>
        <div 
          className={`bg-[rgb(32,33,36)] border border-dashed ${dragActive ? 'border-[rgb(138,180,248)]' : 'border-[rgb(60,64,67)]'} rounded-lg box-border flex flex-col flex-grow h-[280px] relative w-full`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept="image/*"
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center rounded-lg flex-grow h-full mt-0">
            <div className="inline-flex items-center flex-row flex-grow justify-start pt-4">
              <div className="inline-flex mr-[18px]">
                <PictureIcon />
              </div>
              <div className="text-[#93969b] font-sans text-[16px] leading-[25px] max-w-[300px]">
                Drag an image here or
                <button 
                  className="text-[rgb(138,180,248)] cursor-pointer whitespace-nowrap ml-1" 
                  onClick={handleUploadClick}
                >
                  upload a file
                </button>
              </div>
            </div>
            {/* link input */}
            <div className="box-border flex flex-col px-[20px] pb-[20px] w-full">
              <div className="flex items-center justify-between">
                <div className="border-t border-[rgb(60,64,67)] flex-grow h-0"></div>
                <div className="text-[rgb(154,160,166)] cursor-default flex-shrink-0 font-googleSans font-medium text-[14px] mx-[20px]">
                  OR
                </div>
                <div className="border-t border-[rgb(60,64,67)] flex-grow h-0"></div>
              </div>
              <div className="mt-3.5 flex">
                <input
                  type="text"
                  placeholder="Paste image link"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="bg-[#303134] border border-[rgb(60,64,67)] text-[rgb(241,243,244)] rounded-[36px] inline-flex flex-grow text-[14px] font-sans h-[40px] px-[24px] w-full outline-none"
                />
                <button 
                  className="font-medium flex items-center justify-center bg-[#303134] rounded-[32px] border border-[rgb(60,64,67)] text-[rgb(138,180,248)] cursor-pointer inline-flex flex-shrink-0 font-arial text-[14px] tracking-[0.25px] ml-[8px] outline-none px-[24px] py-[8px]"
                  onClick={handleUrlSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleLensSearch;