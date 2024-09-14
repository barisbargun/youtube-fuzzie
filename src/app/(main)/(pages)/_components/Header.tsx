import { Separator } from "@/components/ui";
import { cn } from "@/lib/utils";
import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  children?: React.ReactNode;
};

const Header = ({ title, children, className, ...props }: Props) => {
  return (
    <>
      <div
        {...props}
        className={cn("mb-10 flex items-center justify-between", className)}
      >
        <h1 className="text-3xl capitalize sm:text-4xl">{title}</h1>
        {children}
      </div>
      <Separator className="absolute left-0 right-0 -mt-5" />
    </>
  );
};

export default Header;
