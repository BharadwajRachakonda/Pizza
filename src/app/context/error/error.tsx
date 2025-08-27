"use client";
import React, { useEffect, useState } from "react";
import ErrorContext from "./errorcontext";
import toast from "react-hot-toast";

function Error({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export default Error;
