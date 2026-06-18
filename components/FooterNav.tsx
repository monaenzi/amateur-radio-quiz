import Link from "next/link";
import { Home, BookOpen, ClipboardList, ChartColumn } from "lucide-react";

export default function FooterNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 border-t border-[#008CEA] bg-white">
            <div className="grid grid-cols-4">
                <Link
                    href="/"
                    className="flex flex-col items-center gap-1 border-r border-[#008CEA] py-3 text-[#008CEA]"
                >
                    <Home size={20} />
                    <span className="text-xs">Home</span>
                </Link>

                <Link
                    href="/lernen"
                    className="flex flex-col items-center gap-1 border-r border-[#008CEA] py-3 text-[#008CEA]"
                >
                    <BookOpen size={20} />
                    <span className="text-xs">Lernen</span>
                </Link>

                <Link
                    href="/pruefung"
                    className="flex flex-col items-center gap-1 border-r border-[#008CEA] py-3 text-[#008CEA]"
                >
                    <ClipboardList size={20} />
                    <span className="text-xs">Prüfung</span>
                </Link>

                <Link
                    href="/statistik"
                    className="flex flex-col items-center gap-1 py-3 text-[#008CEA]"
                >
                    <ChartColumn size={20} />
                    <span className="text-xs">Statistik</span>
                </Link>
            </div>
        </nav>
    );
}