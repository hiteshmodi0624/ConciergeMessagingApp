import { useSession } from "next-auth/react";
import Image from "next/image";
import { RiHome2Line } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaCode } from "react-icons/fa";
import { useRouter } from "next/router";

import NavButton from "../ui/nav-buttons";



export default function Navbar() {
  const router=useRouter()
  const pathName=router.pathname;
  const { data: sessionData } = useSession();
  return (
    <nav className="flex min-h-screen w-1/12 max-w-20 flex-col bg-black p-4">
      <Image
        width={150}
        height={150}
        alt="profile-picture"
        src={sessionData?.user.image ?? "/profile-picture.svg"}
        className="w-15 h-15 border-primary rounded-full border-2 bg-white"
      />
      <div className="flex h-[80vh] flex-col items-center justify-center gap-8">
        <NavButton href="/" icon={<RiHome2Line />} active={pathName === "/"} />
        <NavButton
          href="/messages"
          icon={<BiMessageSquareDetail />}
          active={pathName.includes("messages")}
        />
        <NavButton
          href="https://www.github.com/hiteshmodi0624/ConciergeMessagingApp"
          icon={<FaCode />}
          active={false}
        />
      </div>
    </nav>
  );
}
