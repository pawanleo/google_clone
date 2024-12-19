import Link from 'next/link';


export default function Header() {
  return (
    <header className="flex">
      <nav>
        <Link href="/">Gmail</Link>
        <Link href="/images">Images</Link>
      </nav>
    </header>
  );
}
