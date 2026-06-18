import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-[#008CEA]">
      <Link href="/">
        <div className="bg-gradient-to-l from-[#cfefff] via-white to-white">
          <Image
            src="/logo.png"
            alt="ÖVSV Lernkurs Logo"
            width={800}
            height={240}
            className="w-[97%] md:w-[430px]"
            priority
          />
        </div>
      </Link>
    </header>
  )
}