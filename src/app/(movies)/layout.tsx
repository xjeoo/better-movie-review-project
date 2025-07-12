import Footer from "@/components/custom_ui/Footer";
import NavbarSessionProvider from "@/components/NavbarSessionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full">
        <NavbarSessionProvider colorType="static" />
        {children}
        <Footer />
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
