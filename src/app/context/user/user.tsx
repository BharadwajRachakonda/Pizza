"use client";
import React, { useEffect, useState } from "react";
import UserContext from "./usercontext";
import { hasSession } from "@/app/lib/methods";

function User({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    const checkSession = async () => {
      const data = await hasSession();
      setUser(data.hasSession || false);
    };
    checkSession();
  }, [user]);

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </div>
  );
}

export default User;
