import { useRouter } from "next/router";
import Chat from "./chat";
import { useAppSelector } from "~/store";
import { BsChatLeftTextFill } from "react-icons/bs";
import Link from "next/link";


export default function Chats({ className }: { className?: string }) {
  const router = useRouter();
  const id = router.query.id;

  const profiles = useAppSelector((state) => state.user);
  const user = profiles.find((u) => {
    if (id) return u.id === +id;
    else return false;
  });
  return (
    <div className={`h-[calc(100vh-56px)] w-full md:h-screen flex-1 bg-[#EFF3F6] ${className}`}>
      {user ? (
        <Chat user={user} />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="rounded-full border-2 border-black p-6">
              <BsChatLeftTextFill className="text-6xl" />
            </div>
            <h2 className="text-xl">Open Any Chat to view your messages here!</h2>
            <Link
              href="/messages/0"
              className="rounded-full bg-black px-10 py-3 font-semibold text-white hover:bg-gray-700"
            >
              Click Here to chat with
              <br /> our Concierge Chatbot
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
