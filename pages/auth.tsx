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
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          {/* <img src="/images/logo.png" className="h-12" alt="Logo" /> */}
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <input
                  id="name"
                  type="text"
                  //   label="Username"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
              )}
              <input
                id="email"
                type="email"
                // label="Email address or phone number"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <input
                type="password"
                id="password"
                // label="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <div>{error && <h1>{error}</h1>}</div>

            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>

            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time around?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
