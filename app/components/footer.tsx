import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4 sm:px-6 flex items-center bg-background justify-between container max-w-7xl mx-auto">
      <p className="text-sm text-gray-500">© 2024 linkvault</p>
      <nav>
        <ul className="flex text-sm gap-4">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/terms">Terms</Link>
          </li>
          <li>
            <Link href="/privacy">Privacy</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
