import React from "react";
import App from "next/app";
import Head from "next/head";

import "../assets/shared.scss";

class MyApp extends App {
    static async getInitialProps(appContext) {
      const appProps = await App.getInitialProps(appContext);

      return { ...appProps };
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <>
                <Head>
                    <title>$$$</title>
                </Head>
                <Component {...pageProps} />
            </>
        );
    }
}

export default MyApp
