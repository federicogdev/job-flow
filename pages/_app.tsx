import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";
import { ThemeProvider } from "next-themes";
import JobApplicationModal from "@/components/Modals/JobApplicationModal";
import { Toaster } from "react-hot-toast";
import { JobsContextProvider } from "@/context/JobsContext";
import JobApplicationEditModal from "@/components/Modals/JobApplicationEditModal";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <JobsContextProvider>
        <ThemeProvider attribute="class">
          <Layout>
            <JobApplicationEditModal />
            <JobApplicationModal />
            <Toaster
              toastOptions={{
                success: {
                  style: {
                    background: "#4AAD52",
                    color: "white",
                  },
                },
                error: {
                  style: {
                    background: "#9E2A2B",
                    color: "white",
                  },
                },
              }}
            />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </JobsContextProvider>
    </SessionProvider>
  );
}
