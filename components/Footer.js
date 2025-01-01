import Link from "next/link";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 text-sm text-white w-full dark:bg-[#171717]">
      <p className="py-[15px] px-[30px]">India</p>
      <div className="flex justify-between flex-wrap border-t border-gray-500 w-full py-[15px] px-[30px]">
        <div className="flex space-x-4">
          <Link href="#" className="hover:underline">
            Advertising
          </Link>
          <Link href="#" className="hover:underline">
            Business
          </Link>
          <Link href="#" className="hover:underline">
            How Search Works
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="#" className="hover:underline">
            Privacy
          </Link>
          <Link href="#" className="hover:underline">
            Terms
          </Link>
          <Link href="#" className="hover:underline">
            Settings
          </Link>
        </div>
      </div>
    </footer>
  );
}
