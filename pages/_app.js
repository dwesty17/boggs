import React from "react";
import App from "next/app";
import Head from "next/head";

import { GlobalStyles, StylesContainer } from "../styles";

class MyApp extends App {
    static async getInitialProps(appContext) {
      const appProps = await App.getInitialProps(appContext);

      return { ...appProps };
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <StylesContainer>
                <GlobalStyles/>
                <Head>
                    <title>Pennyworth</title>
                </Head>
                <Component {...pageProps} />
            </StylesContainer>
        );
    }
}

export default MyApp;
