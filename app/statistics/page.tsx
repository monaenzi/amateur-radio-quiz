import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";
import { Scale, Radio, RadioTower } from "lucide-react";

export default function StatistikPage() {
    return (
        <main className="min-h-screen bg-white md:p-8">
            <div className="w-full bg-white md:mx-auto md:max-w-7xl">
                <Header variant="default" />

                <div className="px-6 pb-24 pt-6">
                    <h2 className="mb-3 text-sm font-bold tracking-wide text-gray-700">
                        GESAMTFORTSCHRITT
                    </h2>

                    <div className="rounded-xl bg-[#E6F4FD] p-4">
                        <p className="mb-2 text-3xl font-bold text-[#008CEA]">63%</p>

                        <div className="h-2 w-full rounded-full bg-gray-300">
                            <div className="h-2 w-[63%] rounded-full bg-[#008CEA]" />
                        </div>
                    </div>
                    <h2 className="mb-3 mt-8 text-sm font-bold tracking-wide text-gray-700">
                        FRAGEN
                    </h2>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-xl bg-[#E6F4FD] py-4 text-center">
                            <p className="text-2xl font-bold text-[#008CEA]">34</p>
                            <p className="text-sm text-gray-600">gelernt</p>
                        </div>

                        <div className="rounded-xl bg-[#E6F4FD] py-4 text-center">
                            <p className="text-2xl font-bold text-[#008CEA]">58</p>
                            <p className="text-sm text-gray-600">unsicher</p>
                        </div>

                        <div className="rounded-xl bg-[#E6F4FD] py-4 text-center">
                            <p className="text-2xl font-bold text-[#008CEA]">128</p>
                            <p className="text-sm text-gray-600">offen</p>
                        </div>
                    </div>

                    <h2 className="mb-3 mt-8 text-sm font-bold tracking-wide text-gray-700">
                        FACHGEBIETE
                    </h2>

                    <div className="rounded-xl border border-gray-200 p-4">
                        <div className="flex items-center gap-4 pb-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#E6F4FD]">
                                <Scale size={22} className="text-[#008CEA]" />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="font-bold text-gray-900">Recht</p>
                                    <p className="font-bold text-[#008CEA]">40%</p>
                                </div>

                                <p className="text-sm text-gray-500">16 von 40 Fragen</p>

                                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                                    <div className="h-2 w-[40%] rounded-full bg-[#008CEA]" />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200" />

                        <div className="flex items-center gap-4 py-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#E6F4FD]">
                                <RadioTower size={22} className="text-[#008CEA]" />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="font-bold text-gray-900">Technik</p>
                                    <p className="font-bold text-[#008CEA]">48%</p>
                                </div>

                                <p className="text-sm text-gray-500">58 von 120 Fragen</p>

                                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                                    <div className="h-2 w-[48%] rounded-full bg-[#008CEA]" />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200" />

                        <div className="flex items-center gap-4 pt-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#E6F4FD]">
                                <Radio size={22} className="text-[#008CEA]" />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="font-bold text-gray-900">Betrieb</p>
                                    <p className="font-bold text-[#008CEA]">62%</p>
                                </div>

                                <p className="text-sm text-gray-500">37 von 60 Fragen</p>

                                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                                    <div className="h-2 w-[62%] rounded-full bg-[#008CEA]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <FooterNav />
            </div>
        </main>
    );
}