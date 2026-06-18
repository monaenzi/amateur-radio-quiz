import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
    variant?: "home" | "welcome" | "default";
};

export default function Header({ variant = "home" }: HeaderProps) {

    if (variant === "default") {
        return (
            <header className="relative bg-[#008CEA] px-6 py-4">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-white">
                        Lernkurs
                    </h1>

                    <p className="text-sm text-white/80">
                        ÖVSV Lernkurs
                    </p>
                </div>

                <Link href="/">
                    <Image
                        src="/logoWhite.png"
                        alt="ÖVSV Lernkurs Logo"
                        width={30}
                        height={30}
                        className="absolute right-6 top-1/2 -translate-y-1/2"
                        priority
                    />
                </Link>
            </header>
        );
    }

    if (variant === "welcome") {
        return (
            <header className="relative bg-[#008CEA] px-6 py-4">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-white">
                        Willkommen zurück
                    </h1>

                    <p className="text-sm text-white/80">
                        ÖVSV Lernkurs
                    </p>
                </div>

                <Link href="/">
                    <Image
                        src="/logoWhite.png"
                        alt="ÖVSV Lernkurs Logo"
                        width={30}
                        height={30}
                        className="absolute right-6 top-1/2 -translate-y-1/2"
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