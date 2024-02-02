import Link from "next/link"

export default function NavButton({
  icon,
  href,
  active,
}: {
  icon: JSX.Element;
  href: string;
  active: boolean;
}) {
  return (
    <div
      className={` ${active ? " !bg-primary" : ""} hover:bg-secondary rounded-lg p-2 hover:scale-110 `}
    >
      <Link
        href={href}
        className="text-xl md:text-3xl font-bold text-white duration-200 sm:text-2xl"
      >
        {icon}
      </Link>
    </div>
  );
}