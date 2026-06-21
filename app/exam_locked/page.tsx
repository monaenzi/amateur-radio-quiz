import Link from "next/link";
import { Lock } from "lucide-react";
import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";

export default function ExamGuestPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header variant="default" />

            <main className="flex flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#E6F4FD]">
                    <Lock size={32} className="text-[#008CEA]" />
                </div>

                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    Prüfungssimulation
                </h1>

                <p className="mb-8 max-w-xs text-gray-500">
                    Für diesen Bereich musst du angemeldet sein.
                </p>

                <div className="flex w-full max-w-xs flex-col gap-3">
                    <Link
                        href="/login"
                        className="rounded-full bg-[#008CEA] py-3 text-center font-semibold text-white"
                    >
                        Anmelden
                    </Link>

                    <Link
                        href="/register"
                        className="rounded-full bg-[#008CEA] py-3 text-center font-semibold text-white"
                    >
                        Mitglied werden
                    </Link>
                </div>
            </main>

            <FooterNav />
        </div>
    );
}