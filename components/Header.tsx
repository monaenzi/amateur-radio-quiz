import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
    variant?: "home" | "welcome";
};

export default function Header({ variant = "home" }: HeaderProps) {
    if (variant === "welcome") {
        return (
            <header className="bg-[#008CEA] px-6 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-white">
                        Willkommen zurück
                    </h1>

                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="ÖVSV Lernkurs Logo"
                            width={120}
                            height={40}
                            className="w-24"
                            priority
                        />
                    </Link>
                </div>
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