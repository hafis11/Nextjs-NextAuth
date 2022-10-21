import Head from "next/head";
import Image from "next/image";
// import { getProviders } from "next-auth/react";
import { signIn } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { useState } from "react";

const Login = () => {
  const [loader, setLoader] = useState(false);

  const HandleForm = async (event) => {
    event.preventDefault();
    let email = event.currentTarget.elements.email.value;
    let password = event.currentTarget.elements.password.value;

    signIn("login", { redirect: false, email, password })
      .then((res) => {
        const status = JSON.parse(res.status);
        // console.log("res :", status);
        if (status !== 200) {
          throw new Error("Invalid Username  and Password combination");
        }
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoader(false);
      });
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
                  className="shadow-laptop w-full rounded-full bg-yellow-400 py-3 px-4 text-center text-base font-semibold text-black outline-none transition duration-200 ease-in hover:bg-amber-400 lg:py-2"
                >
                  {!loader ? (
                    <span>SIGN IN</span>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg
                        aria-hidden="true"
                        class="mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
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
