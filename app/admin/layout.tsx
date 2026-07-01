import AdminFooterNav from '@/components/AdminFooterNav'
import Header from '@/components/Header'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="pb-16">
            {children}
            <AdminFooterNav />
        </div>
    )
}