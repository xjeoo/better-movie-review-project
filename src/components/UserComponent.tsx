import { getSession } from "@/lib/sessionUtils";
import UserBox from "./custom_ui/navbar/UserBox";

const UserComponent = async () => {
  return <UserBox session={session} />;
};

export default UserComponent;
