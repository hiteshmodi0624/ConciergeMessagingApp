import Image from "next/image";
import Link from "next/link";
import { type User } from "~/mockData/users";
import { relativeTime } from "~/utils/rel-time";
import MenuToggler from "../ui/hidden-menu/menu-toggler";
import HiddenMenuItem from "../ui/hidden-menu/hidden-menu-item";
import { useRouter } from "next/router";
export default function MessageProfile({
  profile,
  deleteUser,
  changePinState,
  clearChats
}: {
  profile: User;
  deleteUser: () => void;
  changePinState: () => void;
  clearChats: () => void;
}) {
  const router = useRouter();
  const id = router.query.id;

  const unreadMessageCount = profile.messages.filter((msg) => {
    return msg.read === false;
  }).length;

  return (
    <MenuToggler
      button={
        <Link
          href={`/messages/${profile.id}`}
          className={`line-clamp-1 flex w-full items-center px-6 py-2 hover:!bg-gray-100 ${id && +id === profile.id && "bg-gray-100"}`}
        >
          <Image
            width={50}
            height={50}
            alt="profile-picture"
            src={profile.image ?? "/profile-picture.svg"}
            className="aspect-square h-14 w-14 rounded-full bg-white"
          />
          <div className="m-2 ml-3 flex-1 text-xs">
            <div className="flex w-full justify-between font-mono font-bold">
              <p>
                {profile.first_name} {profile.last_name}
              </p>
            </div>
            <div className="line-clamp-2 h-9">
              <p className="mt-1 break-all text-xs font-light text-gray-500">
                {profile.recentMessage?.message}
              </p>
            </div>
          </div>
          <div className="my-1 flex h-11 w-5 flex-col justify-between text-xs">
            {profile.recentMessage && (
              <p className="font-extralight text-gray-400">
                {relativeTime(profile.recentMessage.time)}
              </p>
            )}
            {unreadMessageCount !== 0 && (
              <div className="bg-primary flex h-5 w-5 items-center justify-center rounded-md text-white">
                <p>{unreadMessageCount}</p>
              </div>
            )}
          </div>
        </Link>
      }
      menu={
        <div>
          {profile.gender !== "bot" && (
            <>
              <HiddenMenuItem title="Delete chat" onClickHandler={deleteUser} />
              <HiddenMenuItem
                title={`${profile.isPinned ? "Unpin" : "Pin"} chat`}
                onClickHandler={changePinState}
              />
            </>
          )}
          <HiddenMenuItem title="Delete all messages" onClickHandler={clearChats} />
        </div>
      }
    />
  );
}
