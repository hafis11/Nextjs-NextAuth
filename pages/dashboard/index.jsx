import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Admin = () => {
  const { data: session } = useSession();

  // console.log("session :", session);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Dashboard Screen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold mb-6 uppercase">
          Welcome student{" "}
          <a className="text-blue-600 font-black" href="https://nextjs.org">
            email
          </a>
        </h1>

        {/* <p className="mt-3 text-2xl">
          <p>Your email is {AuthUser.email ? AuthUser.email : "unknown"}.</p>{" "}
        </p> */}

        <div>
          <button
            onClick={() => signOut()}
            type="button"
            className="text-white bg-blue-700 my-5 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Logout
          </button>

          <Link href={"./login"}>
            <span
              type="button"
              className="text-white bg-blue-700 my-5 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Login
            </span>
          </Link>
        </div>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <Link href={"./dashboard"}>
            <span className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600 cursor-pointer">
              <h3 className="text-2xl font-bold">Student Port &rarr;</h3>
              <p className="mt-4 text-xl">
                Find in-depth information about Next.js features and its API.
              </p>
            </span>
          </Link>

          <Link href={"./admin"}>
            <span className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600 cursor-pointer">
              <h3 className="text-2xl font-bold">Admin port &rarr;</h3>
              <p className="mt-4 text-xl">
                Learn about Next.js in an interactive course with quizzes!
              </p>
            </span>
          </Link>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  );
};

export default Admin;

Admin.auth = { role: "knowit_admin", unauthorized: "/login" };
