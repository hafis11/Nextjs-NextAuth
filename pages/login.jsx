import Head from "next/head";
import Image from "next/image";
// import { getProviders } from "next-auth/react";
import { signIn } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

const Login = () => {
  const HandleForm = async (event) => {
    event.preventDefault();
    let email = event.currentTarget.elements.email.value;
    let password = event.currentTarget.elements.password.value;

    signIn("login", { email, password });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col justify-center text-center">
        <form onSubmit={HandleForm}>
          <div className="w-3/5 space-y-6 mx-auto">
            <div className="flex justify-center md:p-8">
              <img
                className="h-6 object-fill md:h-10"
                src="https://hendtjtnfylqonzkujtg.supabase.co/storage/v1/object/public/knowit/common/logo.png"
                alt="Knowit"
              />
            </div>
            <div className="text-center text-3xl font-semibold text-black">
              Sign In
            </div>
            <div className="w-full">
              <div className=" relative ">
                <input
                  required
                  type="email"
                  name="email"
                  className=" w-full flex-1 rounded-full border border-transparent border-gray-500 bg-white py-3 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 lg:py-2"
                  placeholder="Email Address"
                />
              </div>
            </div>
            <div className="w-full">
              <div className=" relative ">
                <input
                  required
                  type="text"
                  name="password"
                  className=" w-full flex-1 rounded-full border border-transparent border-gray-500 bg-white py-3 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 lg:py-2"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <span className="block w-full">
                <button
                  type="submit"
                  className="shadow-laptop w-full rounded-full  bg-yellow-400 py-3 px-4 text-center text-base font-semibold text-black outline-none transition duration-200 ease-in hover:bg-amber-400 lg:py-2"
                >
                  SIGN IN
                </button>
              </span>
            </div>
          </div>
        </form>
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

export default Login;

export async function getServerSideProps({ req, res }) {
  const data = await unstable_getServerSession(req, res, authOptions);
  // console.log("data :", data);

  if (data?.role === "knowit_student") {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    };
  }

  if (data?.role === "knowit_admin") {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/admin",
      },
    };
  }

  return {
    props: {},
  };
}
