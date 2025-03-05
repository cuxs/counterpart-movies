import { PropsWithChildren } from "react";

function HeaderTitle({ children }: PropsWithChildren) {
  return <h1 className="mb-4">{children}</h1>;
}
function Nav() {
  return <div className="flex text-base border-t-slate-200 border-t-2">
    <button className="flex-1 p-3 hover:bg-red-400 border-r-2">Home</button>
    <button className="flex-1 p-3 hover:bg-red-400">Search</button>
  </div>
}

interface HeaderProps extends PropsWithChildren { }

const Header = ({ children }: HeaderProps) => {
  return <div className="pt-5 px-5 text-2xl bg-red-500 text-white">{children}</div>;
};

Header.Title = HeaderTitle;
Header.Nav = Nav;

export { Header };
