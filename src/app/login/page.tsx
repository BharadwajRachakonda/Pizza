"use client";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user/usercontext";
import ErrorContext from "../context/error/errorcontext";
import { getUser } from "../lib/methods";
import { useRouter } from "next/navigation";
import { hasSession } from "@/app/lib/methods";

function Login() {
  const { user, setUser } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { replace } = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await getUser(username, password);
    if (result.error) {
      setError(result.error);
    } else {
      setUser(result);
      replace("/");
    }
  };

  useEffect(() => {
    if (user) replace("/");
  }, [user]);

  useEffect(() => {
    const checkSession = async () => {
      const data = await hasSession();
      setUser(data.hasSession || false);
      if (data.hasSession) replace("/");
    };
    checkSession();
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center h-svh">
      <h1 className="text-4xl font-bold text-gray-500/65 mb-8">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl p-4 flex flex-col gap-8 backdrop-blur-3xl backdrop-brightness-50 py-8"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded-full"
        />
        <div className="flex justify-around">
          <div className="relative">
            <button
              type="submit"
              className="glass2 flex text-white p-2 rounded-full bg-sky-500/65 cursor-pointer hover:bg-rose-500/65 transition-colors ease-in duration-300"
            >
              <div className="z-10">Login</div>
            </button>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => replace("/signup")}
              className="glass2 flex text-white p-2 rounded-full bg-sky-500/65 cursor-pointer hover:bg-rose-500/65 transition-colors ease-in duration-300"
            >
              <div className="z-10">Signup</div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
