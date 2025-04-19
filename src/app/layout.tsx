import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Koinside :: Where your journey and Korea coincide',
  description: 'A guide for living in Korea for foreigners',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link href="/">Koinside</Link>
          </h1>
          <nav className="space-x-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/info" className="hover:underline">Info</Link>
            <Link href="https://community.koinside.org" className="hover:underline">Community</Link>
          </nav>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}