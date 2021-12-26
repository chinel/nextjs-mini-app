import Layout from "../components/layout/layout";
import "../styles/globals.css";
import Head from "next/head";
import Notification from "../components/ui/notification";
import { NotificationContextProvider } from "../store/notification-context";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
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
    </NotificationContextProvider>
  );
}

export default MyApp;
