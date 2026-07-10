import AdminFooterNav from '@/components/AdminFooterNav'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="pb-16 md:pb-0">
            {children}
            <div className="md:hidden">
                <AdminFooterNav />
            </div>
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    )
}