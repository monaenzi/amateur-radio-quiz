import AdminFooterNav from '@/components/AdminFooterNav'
import Header from '@/components/Header'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="pb-16">
            <Header variant="admin" />
            {children}
            <AdminFooterNav />
        </div>
    )
}