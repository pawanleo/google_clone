"use client";
import React from "react";
import Image from "next/image";
import { GoogleIcon } from "./Icons";
import UploadIcon from "./icons/UploadIcon";
import IconWithDots from "./icons/DotsIcon";
import { useRouter } from "next/navigation";

export default function GoogleNavbar() {
  const router = useRouter();
  const handleClick = () => {
    // Navigate to the desired page
    router.push("/");
  };
  return (
    <div className="h-16 px-4 flex items-center justify-between border-b border-[#dadce0] bg-white">
      {/* Left side - Google logo */}
      <div className="flex items-center">
        <div className="w-24 relative cursor-pointer" onClick={handleClick}>
          <Image
            src="/googlelogo_clr_74x24px.svg"
            alt="Google"
            width={92}
            height={30}
            className="object-contain"
          />
        </div>
      </div>

      {/* Right side - Icons */}
      <div className="flex items-center gap-2">
        {/* Upload button */}
        <button className="font-googleSans flex items-center px-6 py-2 text-sm font-medium text-[#5F6368] hover:bg-[#f8f9fa] rounded-md">
          <UploadIcon />
          &nbsp; Upload
        </button>

        {/* Apps grid icon */}
        <button className="w-12 h-12 p-2 hover:bg-[#f8f9fa] rounded-full flex items-center justify-center">
          <IconWithDots color="#5f6368" width={24} height={24} />
        </button>

        {/* Profile icon */}
        <button className="w-12 h-12 rounded-full flex items-center justify-center bg-transparent p-2">
          <div className="w-8 h-8 bg-[#1e8e3e] rounded-full flex items-center justify-center">
            <span className="text-base font-medium text-white leading-none">
              p
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
