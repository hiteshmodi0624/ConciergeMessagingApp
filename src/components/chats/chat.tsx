import { type User } from "~/mockData/users";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import { useAppDispatch } from "~/store";
import { markAllAsRead } from "~/store/user";
import ChatMessages from "./chat-messages";
import Bot from "./bot";
export default function Chat({ user }: { user: User }) {
  const dispatch=useAppDispatch();
  dispatch(markAllAsRead(user.id));
  return (
    <div className="relative flex h-screen flex-col">
      <ChatHeader user={user} />
      <ChatMessages messages={user.messages} profilePhoto={user.image} />
      {user.id !== 0 ? <ChatInput id={user.id} /> : <Bot messages={user.messages}/>}
    </div>
  );
}
