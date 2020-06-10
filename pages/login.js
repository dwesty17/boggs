import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import gql from "graphql-tag";
import cookie from "cookie";
import { useRouter } from "next/router";
import { useApolloClient, useMutation } from "@apollo/react-hooks";

import LoginForm from "../components/LoginForm";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import { Caption, LinkText } from "../money-ui/typography";
import { withApollo } from "../lib/apollo";

const NINETY_DAYS = 30 * 24 * 60 * 60;

const LOGIN_USER_MUTATION = gql`
    mutation LoginUser($user: UserInput!) {
        loginUser(user: $user) {
            id
            token
        }
    }
`;

const LoginPage = (props) => {
    const router = useRouter();
    const client = useApolloClient();

    const [errors, setErrors] = useState({});

    const [loginUser] = useMutation(LOGIN_USER_MUTATION, {
        async onCompleted({ loginUser }) {
            if (loginUser && loginUser.token) {
                document.cookie = cookie.serialize("token", loginUser.token, {
                    maxAge: NINETY_DAYS,
                    path: "/",
                });
                await client.cache.reset();
                // TODO location.reload seems suboptimal.
                //  We should be able to achieve this with router.replace, but
                //  that's failing when there is no history.
                // await router.replace("/");
                location.reload();
            } else {
                setErrors({ invalidCredentials: true });
            }
        },
        onError(error) {
            if (error) {
                console.error(error);
                setErrors({ serverError: true });
            }
        },
    });

    const onSubmit = async (email, password) => {
        await loginUser({
            variables: {
                user: { email, password },
            },
        });
    };

    return (
        <Page>
            <LoginForm
                errors={errors}
                onSubmit={onSubmit}
            />
            <Caption>
                Don&apos;t have an account?&nbsp;
                <Link href="/sign-up">
                    <LinkText size={13}>Sign up</LinkText>
                </Link>
            </Caption>
        </Page>
    );
};

const Page = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

LoginPage.getInitialProps = async (context) => {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (loggedInUser.token) {
        await redirect(context, "/");
    }

    return {};
};

export default withApollo(LoginPage);
