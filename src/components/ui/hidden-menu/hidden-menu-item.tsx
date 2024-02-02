import Link from "next/link";
import { type FC, type PropsWithChildren } from "react";

const HiddenMenuItem: FC<
    PropsWithChildren<{
        className?: string;
        to?: string;
        onClickHandler?: (...args: unknown[]) => void;
        title?:string;
        icon?:JSX.Element
    }>
> = ({ children, className, to, onClickHandler, title, icon }) => {
    const text= <div className="flex justify-between w-full p-3">
                    <h3 className="text-xs block w-full">{title}</h3>
                    {icon&&<div className="text-xl font-bold mr-4 group-hover:scale-105 duration-200">
                        {icon}
                    </div>}
                </div>
    const element=<div className="p-3">{children}</div>
    const Wrapper=({children}:PropsWithChildren)=>{
        return (
            <li
                className={`text-white text-xs border-b-2 border-seperator last:border-b-0 hover:bg-gray ${className}`}
            >
                {children}
            </li>
        );
    }
    return (
        <>
            {to ? (
                <Link href={`/${to}`} className="w-full text-left">
                    <Wrapper>{title ? text : element}</Wrapper>
                </Link>
            ) : (
                <button onClick={onClickHandler} className="w-full text-left">
                    <Wrapper>{title ? text : element}</Wrapper>
                </button>
            )}
        </>
    );
};
export default HiddenMenuItem;
