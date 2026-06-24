import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";
import { Scale, Radio, RadioTower } from "lucide-react";

export default function LearnPage() {
    return (
        <main className="min-h-screen bg-white md:p-8">
            <div className="w-full bg-white md:mx-auto md:max-w-7xl">
                <Header variant="default" />

                <div className="px-6 pb-24 pt-6">
                    <h1 className="mb-6 text-center text-2xl font-bold text-gray-300">
                        Was willst du lernen?
                    </h1>

                    <h2 className="mb-3 text-sm font-bold tracking-wide text-gray-700">
                        FACHGEBIETE
                    </h2>

                    <div className="rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E6F4FD]">
                                <Scale size={18} className="text-[#008CEA]" />
                            </div>

                            <div className="flex-1">
                                <p className="text-sm font-bold text-gray-900">Recht</p>
                                <p className="text-xs text-gray-500">16 von 40 Fragen</p>
                            </div>

                            <input type="checkbox" className="h-5 w-5 accent-[#008CEA]" />
                        </div>

                        <div className="border-t border-gray-200" />

                        <div className="flex items-center gap-3 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E6F4FD]">
                                <RadioTower size={18} className="text-[#008CEA]" />
                            </div>

                            <div className="flex-1">
                                <p className="text-sm font-bold text-gray-900">Technik</p>
                                <p className="text-xs text-gray-500">58 von 120 Fragen</p>
                            </div>

                            <input type="checkbox" className="h-5 w-5 accent-[#008CEA]" />
                        </div>

                        <div className="border-t border-gray-200" />

                        <div className="flex items-center gap-3 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E6F4FD]">
                                <Radio size={18} className="text-[#008CEA]" />
                            </div>

                            <div className="flex-1">
                                <p className="text-sm font-bold text-gray-900">Betrieb</p>
                                <p className="text-xs text-gray-500">37 von 60 Fragen</p>
                            </div>

                            <input type="checkbox" className="h-5 w-5 accent-[#008CEA]" />
                        </div>

                        <div className="border-t border-gray-200" />

                        <div className="flex items-center gap-3 p-4">
                            <div className="flex-1 pl-1">
                                <p className="text-sm text-gray-400">Alle Fachgebiete gemischt</p>
                            </div>

                            <input type="checkbox" className="h-5 w-5 accent-[#008CEA]" />
                        </div>
                    </div>
                </div>

                <FooterNav />
            </div>
        </main>
    );
}