import { useSession } from "next-auth/react";
import { type Message } from "~/mockData/users";
import Image from "next/image";
export default function ChatMessage({
  message,
  profilePhoto,
}: {
  message: Message;
  profilePhoto: string;
}) {
  const sessionData = useSession();
  const userId = sessionData.data?.user.id ?? "-1";
  const userImage = sessionData.data?.user.image ?? "/profile-picture.svg";
  return (
    <div className="flex w-full flex-col">
      <div
        className={`flex w-4/5 md:w-2/5 text-sm ${
          message.senderId === userId || message.senderId === "-1"
            ? "flex-row-reverse place-self-end"
            : "place-self-start"
        }`}
      >
        <Image
          width={50}
          height={50}
          alt="profile-picture"
          src={message.senderId === userId ? userImage : profilePhoto}
          className="mx-2 aspect-square h-8 w-8 self-end rounded-full bg-white"
        />
        <div
          className={`w-full break-words rounded-xl p-4  ${
            message.senderId === userId || message.senderId === "-1"
              ? "bg-black text-gray-300"
              : "bg-white text-black"
          }
      `}
        >
          {message.message}
        </div>
      </div>
      <p
        className={`relative my-2 text-xs text-gray-400
         ${message.senderId === userId || message.senderId === "-1" ? "right-12 place-self-end" : "left-12 place-self-start"}`}
      >
        {new Date(message.time).toLocaleTimeString("en-US", {
          timeZone: "UTC",
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        })}
      </p>
    </div>
  );
}
