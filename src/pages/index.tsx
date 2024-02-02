import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {

  return (
    <>
      <Head>
        <title>Concierge Messaging App</title>
        <meta name="description" content="Concierge Messaging App" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b to-[#02366d] from-[#15182c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Concierge{" "}
            <span className="text-[hsl(192,100%,70%)]">Messaging</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://www.github.com/hiteshmodi0624/ConciergeMessagingApp"
              target="_blank"
            >
              <h3 className="text-2xl font-bold text-[hsl(189,100%,70%)]">Explore the Codebase →</h3>
              <div className="text-lg">
                Unleashing the power behind this Concierge Messaging App.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://hiteshmodi.in"
              target="_blank"
            >
              <h3 className="text-2xl font-bold text-[hsl(189,100%,70%)]">
                Discover the Developer&apos;s Journey →
              </h3>
              <div className="text-lg">Learn more about Hitesh Modi.</div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span className="text-[hsl(192,100%,70%)]">Logged in as {sessionData.user?.name}</span>}
      </p>
      <div className="flex gap-4">
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
        <Link href="/messages">
          <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
            {sessionData ? (
              <span>View Product</span>
            ) : (
              <span>
                View Demo <br /> (Without Signing In)
              </span>
            )}
          </button>
        </Link>
      </div>
    </div>
  );
}
