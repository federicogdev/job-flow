import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";
import { ThemeProvider } from "next-themes";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}
