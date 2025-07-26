import NavbarSessionProvider from "@/components/NavbarSessionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full">
        <NavbarSessionProvider colorType={"dynamic"} />
        {children}
      </div>
    </>
  );

  // return (
  //   <>
  //     <SidebarProvider>
  //       <AppSidebar />
  //       <div className="w-full">
  //         <Navbar />
  //         {children}
  //       </div>
  //     </SidebarProvider>
  //   </>
  // );
}
