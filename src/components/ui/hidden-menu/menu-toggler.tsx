import { type FC, useState, type MouseEventHandler } from "react";
import HiddenMenu from "./hidden-menu";

const MenuToggler: FC<{
  className?: string;
  button: JSX.Element;
  menu: JSX.Element;
}> = ({ button, menu, className }) => {
  const [state, changeState] = useState(false);
  const [pos, changePos] = useState({ x: 0, y: 0 });
  const hide = () => {
    changeState(false);
  };
  const show = () => {
    changeState(true);
  };
  const onClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    changePos({ x: e.clientX, y: e.clientY });
    changeState((prev) => !prev);
  };
  return (
    <div
      className={`group relative cursor-pointer ${className}`}
      onFocusCapture={hide}
      onContextMenu={onClickHandler}
    >
      {button}
      <div className="hidden group-focus-within:block" onFocusCapture={show}>
        {state && <HiddenMenu pos={pos}> {menu}</HiddenMenu>}
      </div>
    </div>
  );
};
export default MenuToggler;
