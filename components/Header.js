import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4">
      {/* Left Links */}
      <div className="flex space-x-4 text-sm font-roboto">
        <Link href="#" className="hover:underline">
          About
        </Link>
        <Link href="#" className="hover:underline">
          Store
        </Link>
      </div>

      {/* Right Links and Icons */}
      <div className="flex items-center space-x-4 text-sm font-roboto">
        <Link href="#" className="hover:underline">
          Gmail
        </Link>
        <Link href="#" className="hover:underline">
          Images
        </Link>
        {/* Dot Icon */}
      <button className="p-2 hover:bg-[#343538] rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="h-6 w-6 text-white"
          >
            <circle cx="5" cy="5" r="2" />
            <circle cx="12" cy="5" r="2" />
            <circle cx="19" cy="5" r="2" />
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
            <circle cx="5" cy="19" r="2" />
            <circle cx="12" cy="19" r="2" />
            <circle cx="19" cy="19" r="2" />
          </svg>
        </button>
        {/* Avatar */}
        <div className="h-8 w-8 rounded-full overflow-hidden">
          <Image
            src="/avatar.png" 
            alt="User Avatar"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}
