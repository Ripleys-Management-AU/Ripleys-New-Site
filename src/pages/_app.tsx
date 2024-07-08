import type { AppProps } from "next/app";

import "../styles/globals.css";

import { TalentProvider } from "@/context/talent/TalentProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TalentProvider>
      <Component {...pageProps} />
    </TalentProvider>
  );
}
