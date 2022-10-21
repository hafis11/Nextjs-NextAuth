import React from "react";
import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const { Component, ctx } = appContext;
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, namespacesRequired: "common" };
};

export default MyApp;
