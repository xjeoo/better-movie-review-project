import AppSidebar from "@/components/custom_ui/AppSidebar";
import Navbar from "@/components/custom_ui/navbar/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <Navbar />
          {children}
        </div>
      </SidebarProvider>
    </>
  );
}
