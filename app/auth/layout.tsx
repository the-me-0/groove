export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='bg-[#0F0F0F] flex flex-col items-center justify-evenly h-full md:flex-row'>
      <div className='w-full flex justify-center'>
        <div id='tars-logo'></div>
      </div>
      <div className='w-full flex justify-center'>
        {children}
      </div>
    </div>
  )
}
