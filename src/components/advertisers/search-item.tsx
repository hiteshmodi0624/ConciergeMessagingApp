import { type User } from "~/mockData/users";
import Image from "next/image";

export default function SearchItem({ profile }: { profile: User }) {
  return (
    <div className="flex items-center">
      <Image
        width={50}
        height={50}
        alt="profile-picture"
        src={profile.image ?? "/profile-picture.svg"}
        className="aspect-square h-10 w-10 rounded-full bg-white mx-2 mr-4"
      />
      <h1 className="font-mono text-sm text-black">
        {profile.first_name} {profile.last_name}
      </h1>
    </div>
  );
}
