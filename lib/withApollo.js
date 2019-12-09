import React from 'react'
import cookie from 'cookie'
import PropTypes from 'prop-types'
import { getDataFromTree } from '@apollo/react-ssr'
import Head from 'next/head'

import initApollo from './initApollo'

function parseCookies (req, options = {}) {
    return cookie.parse(req ? req.headers.cookie || '' : document.cookie, options)
}

export default (App) => {
    return class WithData extends React.Component {
        static displayName = `WithData(${App.displayName})`;

        static defaultProps = {
            apolloState: {},
        };

        static propTypes = {
            apolloState: PropTypes.object.isRequired,
        };

        static async getInitialProps (ctx) {
            const {
                AppTree,
                ctx: { req, res }
            } = ctx;
            const apollo = initApollo({}, { getToken: () => parseCookies(req).token });

            ctx.ctx.apolloClient = apollo;

            let appProps = {};
            if (App.getInitialProps) {
                appProps = await App.getInitialProps(ctx);
            }

            if (res && res.finished) {
                return {};
            }

            if (typeof window === 'undefined') {
                try {
                    await getDataFromTree(<AppTree {...appProps} apolloClient={apollo} />);
                } catch (error) {
                    console.error('Error while running `getDataFromTree`', error);
                }

                Head.rewind();
            }

            const apolloState = apollo.cache.extract();

            return { ...appProps, apolloState };
        }

        constructor (props) {
            super(props);
            this.apolloClient = initApollo(props.apolloState, {
                getToken: () => parseCookies().token,
            });
        }

        render () {
            return (<App apolloClient={this.apolloClient} {...this.props} />);
        }
    }
}
