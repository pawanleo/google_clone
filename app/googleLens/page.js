"use client";
import VisualSearch from "@/components/VisualSearch";
import Image from "next/image";
import { useRef } from "react";

export default function GoogleLens() {
  const componentRef = useRef(null);
  console.log(componentRef.current);
  return (
    <div className="relative w-full h-full bg-slateGray">
      <div className="items-stretch box-border border-t border-t-[#f0f0f0] flex flex-nowrap h-[calc(100vh-64px)] overflow-x-hidden relative w-full">
        {/* Left Pane */}
        <div className="basis-1/2 flex-grow h-full">
          <div className="items-center bg-[rgb(32,33,36)] box-border flex flex-col py-24 px-6 pb-[84px] relative transition-[padding-top] duration-200 ease select-none h-full">
            {/* Top Button */}
            <div className="absolute top-6 z-[1]">
              <button
                className="
                  border border-whiteTransparent text-lightGray rounded-[20px] h-[40px]
                  outline-none px-[16px] pointer-events-auto font-sans font-medium tracking-[.00625em]
                  transition duration-[280ms] ease-[cubic-bezier(.4,0,.2,1)] mt-[6px] mb-[6px]
                  relative inline-flex items-center justify-center box-border min-w-[64px]
                  select-none bg-transparent
                "
              >
                <span
                  className="
                    relative text-lightGray flex items-center
                    border border-[rgb(229,231,235)] border-solid border-0
                    box-border cursor-pointer
                    font-sans font-medium
                    tracking-[0.1px] leading-[30px] pointer-events-auto
                    text-center select-none antialiased
                    tap-highlight-transparent
                  "
                >
                  <Image
                    src="/camera.svg"
                    alt="Camera Icon"
                    width={18}
                    height={18}
                    className="mr-[6px]"
                  />
                  Find image source
                </span>
              </button>
            </div>

            {/* Center Content */}
            <div className="flex-1 w-full flex items-center justify-center">
              <div
                className="w-full h-full flex items-center justify-center"
                ref={componentRef}
              >
                <VisualSearch
                  imageUrl="/demon-slayer.jpg"
                  isActive={true}
                  onSearch={(searchBox) => {
                    console.log(searchBox);
                  }}
                />
              </div>
            </div>

            {/* Bottom Spacer */}
            <div className="absolute bottom-[40px]"></div>
          </div>
        </div>

        {/* Right Pane */}
        <div className="basis-1/2 flex-grow max-w-[784px] overflow-auto relative">
          <div className="flex bg-white h-full">
            <div className="bg-white flex flex-col flex-grow h-full max-w-full">
<div className="box-border flex flex-col flex-grow relative">

</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
