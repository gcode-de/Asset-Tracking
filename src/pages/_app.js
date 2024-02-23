import "@/styles/globals.css";
import axios from "axios";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </SWRConfig>
    </>
  );
}
