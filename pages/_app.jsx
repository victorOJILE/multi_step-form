import Head from "next/head";
import "/styles/globals.css";

export default function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>Frontend Mentor | Multi-step form</title>
        <meta name="description" content="This is a solution to the Multi-step form challenge on Frontend Mentor. Frontend Mentor challenges help you improve your coding skills by building realistic projects." />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
