import { type FC, type PropsWithChildren, useRef } from "react";
import useMenuDirection from "../../hooks/useMenuDirection";

const HiddenMenu: FC<
  PropsWithChildren<{
    className?: string;
    pos: { x: number; y: number };
  }>
> = ({ children, className, pos }) => {
  const triggerRef = useRef<HTMLUListElement>(null);
  const menuDirection = useMenuDirection(triggerRef);
  return (
    <ul
      className={`fixed z-20 mx-3 cursor-pointer overflow-hidden rounded-lg bg-black ${className}`}
      style={{
        left: `${pos.x}px`,
        top: menuDirection === "top" ? `${pos.y}px` : "auto",
        bottom: menuDirection === "bottom" ? `5px` : "auto",
      }}
      ref={triggerRef}
    >
      {children}
    </ul>
  );
};
export default HiddenMenu;
