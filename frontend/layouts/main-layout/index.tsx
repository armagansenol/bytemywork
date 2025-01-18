export async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
  headerVariant: "v1" | "v2"
}>) {
  return (
    <>
      {/* <ScrollToTop /> */}
      <div className="flex flex-col flex-1 with-bg overflow-hidden">
        <main className="flex-1">{children}</main>
      </div>
    </>
  )
}
