import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="border-r h-full w-full border-slate-500 p-4 flex flex-col overflow-auto">
      <div className="flex items-center">
        <SearchInput />
      </div>
      <div className="divider px-3"></div>
      <Conversations />
      <div className="mt-auto flex gap-2">
        <LogoutButton />
        <Link to="/notifications">
          <IoIosNotifications className="w-8 h-8 hover:cursor-pointer mt-auto hover:text-cyan-700 transition-all" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
