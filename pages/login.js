import React from "react";
import Link from "next/link";
import gql from "graphql-tag";
import cookie from "cookie";
import styled from "styled-components";
import { useApolloClient, useMutation } from "@apollo/react-hooks";

import LoginForm from "../components/LoginForm/index";
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

const LoginPage = () => {
  const client = useApolloClient();
  const [loginUser] = useMutation(LOGIN_USER_MUTATION, {
    async onCompleted({ loginUser }) {
      if (loginUser.token) {
        document.cookie = cookie.serialize("token", loginUser.token, {
          maxAge: NINETY_DAYS,
          path: "/",
        });
        await client.cache.reset();
        redirect({}, "/");
      }
    },
    onError (error) {
      if (error) {
        console.error(error);
      }
    },
  });

  return (
    <Page>
      <LoginForm />
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
`;

LoginPage.getInitialProps = async (context) => {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (loggedInUser.token) {
        redirect(context, "/");
    }

    return {};
};

export default withApollo(LoginPage);
