import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";
import { Scale, Radio, RadioTower } from "lucide-react";

export default function LearnPage() {
    return (
        <main className="min-h-screen bg-gray-100 md:p-8"> 
            <div className="flex min-h-screen w-full flex-col bg-white md:mx-auto md:max-w-7xl md:min-h-[850px] md:rounded-2xl md:shadow-lg overflow-hidden">
                
                <Header variant="default" />

                <div className="flex flex-1 flex-col justify-center px-6 pb-12 pt-6">
                    
                    <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
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

                    <div className="mt-8">
                        <button className="w-full rounded-full bg-[#008CEA] py-3 text-center font-semibold text-white hover:bg-[#0077c8] transition-colors">
                            Jetzt lernen
                        </button>
                    </div>
                </div>

                <FooterNav />
            </div>
        </main>
    );
}