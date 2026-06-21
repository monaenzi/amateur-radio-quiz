import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";

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
                </div>

                <FooterNav />
            </div>
        </main>
    );
}