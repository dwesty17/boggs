import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import { getDataFromTree } from "@apollo/react-ssr";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import fetch from "isomorphic-unfetch";
import cookie from "cookie";

let apolloClient = null;

const withApollo = (PageComponent, { ssr = true } = {}) => {
    const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
        const client = apolloClient || initApolloClient(apolloState, { getToken });
        return (
            <ApolloProvider client={client}>
                <PageComponent {...pageProps} />
            </ApolloProvider>
        );
    };

    WithApollo.propTypes = {
        apolloClient: PropTypes.object,
        apolloState: PropTypes.object,
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

            const apolloClient = (context.apolloClient = initApolloClient({}, {
                getToken () {
                    return getToken(context.req);
                }
            }));

            const pageProps = PageComponent.getInitialProps ? await PageComponent.getInitialProps(context) : {};

            if (typeof window === "undefined") {
                if (context.res && context.res.finished) {
                    return {};
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

const initApolloClient = (...args) => {
    if (typeof window === "undefined") {
        return createApolloClient(...args);
    }

    if (!apolloClient) {
        apolloClient = createApolloClient(...args);
    }

    return apolloClient;
};

const SERVER_URL = "https://rocky-thicket-94158.herokuapp.com/";

const createApolloClient = (initialState = {}, { getToken }) => {
    const authLink = setContext((req, { headers }) => {
        const token = getToken();
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    });

    const ssrMode = typeof window === "undefined";
    const link = authLink.concat(new HttpLink({
        uri: SERVER_URL,
        credentials: "same-origin",
        fetch,
    }));

    const cache = new InMemoryCache().restore(initialState);

    return new ApolloClient({ ssrMode, link, cache });
};

const getToken = (req) => {
    const cookies = cookie.parse(req ? req.headers.cookie || "" : document.cookie);
    return cookies.token;
};

export { withApollo };
