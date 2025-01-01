"use client";
import GoogleNavbar from "@/components/GoogleNavbar";
import { SearchIcon } from "@/components/Icons";
import FeedbackIcon from "@/components/icons/FeedbackIcon";
import ImageSourceIcon from "@/components/icons/ImageSourceIcon";
import ImageGrid from "@/components/ImageGrid";
import VisualSearch from "@/components/VisualSearch";
import Image from "next/image";
import { useRef, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

 function GoogleLensContent() {
  const [activeTab, setActiveTab] = useState("search");
  const [uploadedImage, setUploadedImage] = useState(null);
  const componentRef = useRef(null);
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Get the image URL from the search parameters
    const imageUrl = searchParams.get('imageUrl');
    if (imageUrl) {
      setUploadedImage(imageUrl);
    }
  }, [searchParams]);

  // Handle search box selection
  const handleSearch = (searchBox) => {
    console.log("Selected search box:", searchBox);
    // Add your search logic here
  };

  return (
    <div className="relative w-full h-full bg-slateGray">
      <GoogleNavbar/>
      <div className="items-stretch box-border border-t-[#f0f0f0] flex flex-nowrap h-[calc(100vh-64px)] overflow-x-hidden relative w-full">
        {/* Left Pane */}
        <div className="basis-1/2 flex-grow h-full">
          <div className="items-center bg-[rgb(32,33,36)] box-border flex flex-col py-24 px-6 pb-[84px] relative transition-[padding-top] duration-200 ease select-none h-full">
            {/* Top Button */}
            <div className="absolute top-6 z-[1]">
              <button
                className="border border-whiteTransparent text-lightGray rounded-[20px] h-[40px]
                  outline-none px-[16px] pointer-events-auto font-sans font-medium tracking-[.00625em]
                  transition duration-[280ms] ease-[cubic-bezier(.4,0,.2,1)] mt-[6px] mb-[6px]
                  relative inline-flex items-center justify-center box-border min-w-[64px]
                  select-none bg-transparent"
              >
                <span className="relative text-lightGray flex items-center
                    border border-[rgb(229,231,235)] border-solid border-0
                    box-border cursor-pointer font-sans font-medium
                    tracking-[0.1px] leading-[30px] pointer-events-auto
                    text-center select-none antialiased tap-highlight-transparent">
                  <ImageSourceIcon className="mr-2"/>
                  Find image source
                </span>
              </button>
            </div>

            {/* Center Content */}
            <div className="flex-1 w-full flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center" ref={componentRef}>
                <VisualSearch
                  imageUrl={uploadedImage || "/demon-slayer.jpg"} // Use uploaded image or fallback
                  isActive={true}
                  onSearch={handleSearch}
                />
              </div>
            </div>

            {/* Bottom Spacer */}
            <div className="absolute bottom-[40px]">
              <div className="bg-[rgba(95,99,104,0.4)] rounded-2xl h-8 w-fit flex relative">
                {/* Sliding capsule background */}
                <div 
                  className="absolute h-8 bg-white rounded-2xl transition-all duration-200 ease-in-out"
                  style={{
                    width: '80px',
                    left: activeTab === 'search' ? '0' : activeTab === 'text' ? '80px' : '160px'
                  }}
                />
                
                {/* Buttons */}
                <button 
                  onClick={() => setActiveTab('search')}
                  className={`px-3 font-googleSans text-sm font-medium z-10 min-w-[80px] transition-colors duration-200 ${
                    activeTab === 'search' ? 'text-[rgb(32,33,36)]' : 'text-[rgb(232,234,237)]'
                  }`}
                >
                  Search
                </button>
                <button 
                  onClick={() => setActiveTab('text')}
                  className={`px-3 font-googleSans text-sm font-medium z-10 min-w-[80px] transition-colors duration-200 ${
                    activeTab === 'text' ? 'text-[rgb(32,33,36)]' : 'text-[rgb(232,234,237)]'
                  }`}
                >
                  Text
                </button>
                <button 
                  onClick={() => setActiveTab('translate')}
                  className={`px-3 font-googleSans text-sm font-medium z-10 min-w-[80px] transition-colors duration-200 ${
                    activeTab === 'translate' ? 'text-[rgb(32,33,36)]' : 'text-[rgb(232,234,237)]'
                  }`}
                >
                  Translate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane */}
        <div className="basis-1/2 flex-grow max-w-[784px] overflow-auto relative">
          <div className="flex bg-white h-full">
            <div className="bg-white flex flex-col flex-grow h-full max-w-full">
              <div className="box-border flex flex-col flex-grow relative">
                <ImageGrid
                 searchQuery="your search query"
                 searchType="shopping" // or "visual", "similar", "text"
                />
                <div className="bg-white sticky bottom-0 z-10 px-2 border-t border-[#f1f3f4]">
                  <div className="flex w-full flex-row">
                    <div className="flex items-center px-2.5">
                      <FeedbackIcon className="text-textGray" size={20} />
                    </div>
                    <div className="flex items-center font-roboto text-xs tracking-wider font-normal text-textGray leading-4 flex-1">
                      Did you find these results useful?
                    </div>
                    <div className="inline">
                      <button className="my-1.5 text-linkBlue bg-transparent h-9 rounded-md font-sans text-sm font-medium normal-case relative inline-flex items-center justify-center box-border min-w-[64px] border-0 outline-none leading-inherit select-none appearance-none overflow-visible align-middle bg-transparent">
                        Yes
                      </button>
                    </div>
                    <div className="inline">
                      <button className="my-1.5 text-linkBlue bg-transparent h-9 rounded-md font-sans text-sm font-medium normal-case relative inline-flex items-center justify-center box-border min-w-[64px] border-0 outline-none leading-inherit select-none appearance-none overflow-visible align-middle bg-transparent">
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function GoogleLens() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleLensContent />
    </Suspense>
  );
}