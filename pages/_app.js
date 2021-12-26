import Layout from "../components/layout/layout";
import "../styles/globals.css";
import Head from "next/head";
import Notification from "../components/ui/notification";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="initial0-scale=1.0, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
      <Notification />
    </Layout>
  );
}

export default MyApp;
