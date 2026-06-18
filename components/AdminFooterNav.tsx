import Link from "next/link";
import { LayoutDashboard, CircleHelp } from "lucide-react";

export default function AdminFooterNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 border-t border-[#008CEA] bg-white md:hidden">
            <div className="grid grid-cols-2">
                <Link
                    href="/admin"
                    className="flex flex-col items-center gap-1 border-r border-[#008CEA] bg-blue-100 py-3 text-[#008CEA]"
                >
                    <LayoutDashboard size={20} />
                    <span className="text-xs">Dashboard</span>
                </Link>

                <Link
                    href="/admin/fragen"
                    className="flex flex-col items-center gap-1 py-3 text-[#008CEA]"
                >
                    <CircleHelp size={20} />
                    <span className="text-xs">Fragen</span>
                </Link>
            </div>
        </nav>
    );
}