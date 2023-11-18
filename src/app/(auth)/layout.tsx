import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      {children}
    </div>
  );
};

export default Layout;
