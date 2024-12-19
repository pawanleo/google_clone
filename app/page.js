import Image from "next/image";

export default function Home() {
  return (
    <div className="dark:invert">
      {/* Dark mode classes used: */}
      <div className="bg-black/[.05] dark:bg-white/[.06]">
        {/* Content */}
      </div>
      
      {/* Border color for dark mode */}
      <div className="border-black/[.08] dark:border-white/[.145]">
        {/* Content */}
      </div>

      {/* Background color transitions for dark mode */}
      <div className="hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]">
        {/* Content */}
      </div>
    </div>
  );
}
