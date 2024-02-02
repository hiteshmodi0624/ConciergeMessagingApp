import { useSession } from "next-auth/react";
import Image from "next/image";
import { RiHome2Line } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaCode } from "react-icons/fa";
import { useRouter } from "next/router";

import NavButton from "../ui/nav-buttons";



export default function Navbar({className}:{className?:string}) {
  const router=useRouter()
  const pathName=router.pathname;
  const { data: sessionData } = useSession();
  return (
    <nav
      className={`md:w-18 flex h-14 md:h-screen justify-center md:justify-normal w-full md:w-14 md:max-w-20 md:flex-col bg-black p-1 md:p-2  ${className}`}
    >
      <Image
        width={150}
        height={150}
        alt="profile-picture"
        src={sessionData?.user.image ?? "/profile-picture.svg"}
        className=" hidden md:block border-primary rounded-full border-2 bg-white"
      />
      <div className="flex md:h-[80vh] md:flex-col items-center w-full justify-around md:justify-center gap-8">
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
