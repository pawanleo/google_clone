import { GoogleIcon } from "@/components/Icons";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";

export default function Home() {

  return (
    <main className="flex flex-col items-center justify-center mt-[6rem]">
      <GoogleIcon
        className="h-24"
        width={300}
        height={300}
      />
      <div className="relative  w-full max-w-xl">
        <SearchBar />
      </div>
      <div className="flex mt-4 space-x-4 pt-4 h-[70px]">
        <button className="px-4 h-9 text-sm bg-[#f8f9fa] border-[#dadce0] hover:border  box-shadow-[0_1px_1px_rgba(0,0,0,.1)] rounded hover:bg-gray-100 dark:bg-[#303134]  dark:text-[#e8eaed] dark:hover:bg-[#303134] dark:border dark:border-[#303134] dark:hover:border-[#5f6368] dark:hover:box-shadow-[0_1px_3px_rgba(23,23,23,0.24)]">
          Google Search
        </button>
        <button className="px-4 h-9 text-sm bg-[#f8f9fa] border-[#dadce0] hover:border box-shadow-[0_1px_1px_rgba(0,0,0,.1)] rounded hover:bg-gray-100 dark:bg-[#303134]  dark:text-[#e8eaed] dark:hover:bg-[#303134] dark:border dark:border-[#303134] dark:hover:border-[#5f6368] dark:hover:box-shadow-[0_1px_3px_rgba(23,23,23,0.24)]">
          I'm Feeling Lucky
        </button>
      </div>
      <div  className="text-sm text-[#bfbfbf] mt-4 mb-6">
        Google offered in: 
        <a href="#" className="ml-2 text-[#99c3ff]">हिन्दी</a>
        <a href="#" className="ml-2 text-[#99c3ff]">বাংলা</a>
        <a href="#" className="ml-2 text-[#99c3ff]">తెలుగు</a>
        <a href="#" className="ml-2 text-[#99c3ff]">मराठी</a>
        <a href="#" className="ml-2 text-[#99c3ff]">தமிழ்</a>
        <a href="#" className="ml-2 text-[#99c3ff]">ગુજરાતી</a>
        <a href="#" className="ml-2 text-[#99c3ff]">ಕನ್ನಡ</a>
        <a href="#" className="ml-2 text-[#99c3ff]">മലയാളം</a>
        <a href="#" className="ml-2 text-[#99c3ff]">ਪੰਜਾਬੀ</a>
      </div>
    </main>
  );
}
