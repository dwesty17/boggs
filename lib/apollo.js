import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import { getDataFromTree } from "@apollo/react-ssr";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";

let apolloClient = null;

const withApollo = (PageComponent, { ssr = true } = {}) => {
    const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
        const client = apolloClient || initApolloClient(apolloState);
        return (
            <ApolloProvider client={client}>
                <PageComponent {...pageProps} />
            </ApolloProvider>
        );
    };

    WithApollo.propTypes = {
        apolloClient: PropTypes.object.isRequired,
        apolloState: PropTypes.object.isRequired,
    };

    if (process.env.NODE_ENV !== "production") {
        const displayName = PageComponent.displayName || PageComponent.name || "Component";

        if (displayName === "App") {
            console.warn("🧩 This withApollo HOC only works with PageComponents");
        }

        WithApollo.displayName = `withApollo(${displayName})`;
    }

    if (ssr || PageComponent.getInitialProps) {
        WithApollo.getInitialProps = async (context) => {
            const { AppTree } = context;

            const apolloClient = (context.apolloClient = initApolloClient());

            let pageProps = {};
            if (PageComponent.getInitialProps) {
                pageProps = await PageComponent.getInitialProps(context);
            }

            if (typeof window === "undefined") {
                if (context.res && context.res.finished) {
                    return pageProps;
                }

                if (ssr) {
                    try {
                        await getDataFromTree(
                            <AppTree
                                pageProps={{
                                    ...pageProps,
                                    apolloClient,
                                }}
                            />,
                        );
                    } catch (error) {
                        console.error("🌴 Error while running getDataFromTree", error);
                    }

                    Head.rewind();
                }
            }

            const apolloState = apolloClient.cache.extract();

            return {
                ...pageProps,
                apolloState,
            };
        };
    }

    return WithApollo;
};

const initApolloClient = (initialState) => {
    if (typeof window === "undefined") {
        return createApolloClient(initialState);
    }

    if (!apolloClient) {
        apolloClient = createApolloClient(initialState);
    }

    return apolloClient;
};

const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000/";

const createApolloClient = (initialState = {}) => {
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: new HttpLink({
            uri: SERVER_URL,
            credentials: "same-origin",
            fetch,
        }),
        cache: new InMemoryCache().restore(initialState),
    });
};

export { withApollo };
