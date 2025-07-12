import { getSession } from "@/lib/sessionUtils";
import Navbar from "./custom_ui/navbar/Navbar";

const NavbarSessionProvider = async ({
  colorType = "static",
}: {
  colorType: "static" | "dynamic" | null;
}) => {
  const session = await getSession();

  return <Navbar sidebar={true} colorType={colorType} session={session} />;
};

export default NavbarSessionProvider;
