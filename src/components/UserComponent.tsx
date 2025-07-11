import { getSession } from "@/lib/sessionUtils";
import UserBox from "./custom_ui/navbar/UserBox";

const UserComponent = async () => {
  const session = await getSession();
  return <UserBox session={session} />;
};

export default UserComponent;
