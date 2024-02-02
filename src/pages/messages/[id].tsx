import Advertisers from "~/components/advertisers/advertisers";
import Chats from "~/components/chats/chats";
import Navbar from "~/components/navbar/navbar";
import { Provider } from 'react-redux';
import store from "~/store/index"
import Head from "next/head";
export default function Messaging() {
  return (
    <>
      <Head>
        <title>Concierge Messaging App</title>
        <meta name="description" content="Concierge Messaging App" />
      </Head>
      <Provider store={store}>
        <main className="from-secondary to-primary flex max-h-screen items-center bg-gradient-to-b">
          <Navbar />
          <Advertisers className="hidden md:flex"/>
          <Chats />
        </main>
      </Provider>
    </>
  );
}
