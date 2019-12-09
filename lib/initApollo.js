import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (typeof window === 'undefined') {
    global.fetch = fetch
}

const initApollo = (initialState, options) => {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (typeof window === 'undefined') {
        let fetchOptions = {};
        // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
        // 'https-proxy-agent' is required here because it's a sever-side only module
        if (process.env.https_proxy) {
            fetchOptions = {
                agent: new (require('https-proxy-agent'))(process.env.https_proxy)
            }
        }
        return create(initialState, {
            ...options,
            fetchOptions
        })
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState, options)
    }

    return apolloClient
};

const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

const create = (initialState, { getToken, fetchOptions }) => {
    const httpLink = createHttpLink({
        uri: SERVER_URL,
        credentials: 'same-origin',
        fetchOptions
    });

    const authLink = setContext((_, { headers }) => {
        const token = getToken();
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        }
    });

    const isBrowser = typeof window !== 'undefined';
    return new ApolloClient({
        connectToDevTools: isBrowser,
        ssrMode: !isBrowser,
        link: authLink.concat(httpLink),
        cache: new InMemoryCache().restore(initialState || {})
    })
};

export default initApollo;
