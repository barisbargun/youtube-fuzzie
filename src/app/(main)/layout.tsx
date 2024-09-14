import { Infobar, Sidebar } from "@/components/pages/main";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const PagesLayout = ({ children }: Props) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      <div className="w-full dark:bg-neutral-900/20 bg-neutral-900/10 overflow-hidden">
        <Infobar />
        {children}
      </div>
    </div>
  );
};

export default PagesLayout;
