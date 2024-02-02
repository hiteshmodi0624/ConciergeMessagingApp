import { type User } from "~/mockData/users";
import MessageProfile from "./messageProfile";
import { TbPinned } from "react-icons/tb";
import { PiRobot } from "react-icons/pi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { deleteUser, changePinState, clearChats } from "~/store/user";
import { useAppSelector, useAppDispatch } from "~/store";

export default function MessageProfiles() {
  const profiles = useAppSelector((state) => state.user.slice().sort((a,b)=>{
    if(a.recentMessage===null) return 1;
    if(b.recentMessage===null) return -1;
    if (a.recentMessage.time > b.recentMessage.time) return -1;
    else return 1;
  }));
  const dispatch = useAppDispatch();
  const bot=profiles.filter((user) => user.gender==="bot");
  const pinnedProfiles = profiles.filter(
    (user) => user.isPinned && user.gender !== "bot",
  );
  const otherProfiles = profiles.filter((user) => !user.isPinned);
  return (
    <div className="h-full overflow-y-scroll">
      {bot.length > 0 && (
        <div className="ml-2 mt-4 flex items-center gap-1 font-normal text-gray-500">
          <PiRobot /> <p>ChatBots</p>
        </div>
      )}
      {bot.map((profile: User) => (
        <MessageProfile
          profile={profile}
          key={profile.id}
          deleteUser={() => dispatch(deleteUser(profile.id))}
          changePinState={() => dispatch(changePinState(profile.id))}
          clearChats={() => dispatch(clearChats(profile.id))}
        />
      ))}
      {pinnedProfiles.length > 0 && (
        <div className="ml-2 mt-4 flex items-center gap-1 font-normal text-gray-500">
          <TbPinned /> <p>Pinned Advertisers</p>
        </div>
      )}
      {pinnedProfiles.map((profile: User) => (
        <MessageProfile
          profile={profile}
          key={profile.id}
          deleteUser={() => dispatch(deleteUser(profile.id))}
          changePinState={() => dispatch(changePinState(profile.id))}
          clearChats={() => dispatch(clearChats(profile.id))}
        />
      ))}
      {otherProfiles.length > 0 && (
        <div className="ml-2 mt-4 flex items-center gap-1 font-normal text-gray-500">
          <BiMessageSquareDetail /> <p>Other Advertisers</p>
        </div>
      )}
      {otherProfiles.map((profile: User) => (
        <MessageProfile
          profile={profile}
          key={profile.id}
          deleteUser={() => dispatch(deleteUser(profile.id))}
          changePinState={() => dispatch(changePinState(profile.id))}
          clearChats={() => dispatch(clearChats(profile.id))}
        />
      ))}
    </div>
  );
}
