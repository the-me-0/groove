import Sidebar from '@/lib/components/Sidebar';

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Sidebar>
      {children}
    </Sidebar>
  )
}
