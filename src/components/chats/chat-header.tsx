import { type User } from "~/mockData/users";
import Image from "next/image";

export default function ChatHeader({ user }: { user: User }) {
  return (
    <div className="flex justify-center">
      <div className="mt-4 flex w-11/12 items-center rounded-full bg-white p-4">
        <Image
          width={50}
          height={50}
          alt="profile-picture"
          src={user.image ?? "/profile-picture.svg"}
          className="aspect-square h-10 w-10 rounded-full bg-white"
        />
        <div className="mx-2 my-1 font-mono text-sm">
          <h1>
            {user.first_name} {user.last_name}
          </h1>
          {user.gender !== "bot" && (
            <div className="font-mono text-xs text-gray-500">
              <h2>
                {user.industry}, {user.location}
              </h2>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
}
