import React from "react";
import App from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import withApollo from "../lib/withApollo";

class Boggs extends App {
    static displayName = "Boggs";

    render () {
        const { Component, pageProps, apolloClient } = this.props;
        return (
            <ApolloProvider client={apolloClient}>
                <Component {...pageProps} />
            </ApolloProvider>
        );
    }
}

export default withApollo(Boggs);

