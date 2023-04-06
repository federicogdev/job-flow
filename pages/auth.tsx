import { NextPageContext } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import register from "./api/register";

interface Props {}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Auth = (props: Props) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (!res?.error) {
        router.push("/");
      } else {
        setError("Invalid Email/Password");
      }
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          name,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        login();
      } else {
        setError((await res.json()).error);
      }
    } catch (error: any) {
      setError(error?.message);
    }
  }, [email, name, password, login]);

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2 bg-white dark:bg-zinc-800">
        <div className=" w-11/12 max-w-[700px] px-10 py-16 rounded-lg bg-gray-100 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700">
          <h1 className="text-4xl font-semibold text-black dark:text-white">
            {variant === "login" ? " Login" : "Register"}
          </h1>

          <div className="mt-8">
            <div className="flex flex-col">
              <label className="text-lg font-bold text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                value={email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-3 border rounded-md p-3 mt-1 bg-transparent dark:bg-transparent focus:outline-none focus:ring-0border-gray-300 dark:border-zinc-700 focus:border-[#392061] dark:focus:border-[#DDC9B4]"
                placeholder="Enter your email"
              />
            </div>
            {variant === "register" && (
              <div className="flex flex-col">
                <label className="text-lg font-bold text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mb-3 border rounded-md p-3 mt-1 bg-transparent dark:bg-transparent focus:outline-none focus:ring-0border-gray-300 dark:border-zinc-700 focus:border-[#392061] dark:focus:border-[#DDC9B4]"
                  placeholder="Enter your name"
                />
              </div>
            )}
            <div className="flex flex-col">
              <label className="text-lg font-bold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-3 border rounded-md p-3 mt-1 bg-transparent dark:bg-transparent focus:outline-none focus:ring-0border-gray-300 dark:border-zinc-700 focus:border-[#392061] dark:focus:border-[#DDC9B4]"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-y-4">
            <button
              onClick={variant === "login" ? login : register}
              className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 text-white  dark:text-black bg-[#392061] dark:bg-[#DDC9B4] rounded-md font-bold text-lg"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
          </div>

          <div className="mt-8 flex justify-center items-center">
            <p className="font-medium text-base text-gray-700 dark:text-gray-300">
              {variant === "login"
                ? "First time around?"
                : "Already have an account?"}
            </p>
            <button
              onClick={toggleVariant}
              className="ml-2 font-medium text-base text-[#392061] dark:text-[#DDC9B4] hover:underline
                "
            >
              {variant === "login" ? "Create an account" : "Login"}
            </button>
          </div>
        </div>
      </div>
      <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
        <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-[#DDC9B4] to-[#392061] animate-pulse" />
        <div className="w-full h-1/2 absolute bottom-0 bg-gray-100/10  dark:bg-zinc-900/10 backdrop-blur-lg" />
      </div>
    </div>
  );
};

export default Auth;
