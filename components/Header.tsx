import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
    variant?: "home" | "welcome";
};

export default function Header({ variant = "home" }: HeaderProps) {
    if (variant === "welcome") {
        return (
            <header className="relative bg-[#008CEA] px-6 py-4">
                <h1 className="text-center text-2xl font-bold text-white">
                    Willkommen zurück
                </h1>
                <h2 className="text-center">
                    ÖVSV Lernkurs
                    </h2>

                <Link href="/">
                    <Image
                        src="/logoWhite.png"
                        alt="ÖVSV Lernkurs Logo"
                        width={32}
                        height={32}
                        className="absolute right-6 top-1/2 h-10 w-6 -translate-y-1/2"
                        priority
                    />
                </Link>
            </header>
        );
    }

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
    );
}