import AdminFooterNav from '@/components/AdminFooterNav'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-white pb-16 md:pb-0 md:p-8">
            <div className="md:mx-auto md:max-w-7xl">
                {children}
            </div>
            <div className="md:hidden">
                <AdminFooterNav />
            </div>
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    )
}