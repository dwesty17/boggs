import React from "react";
import Link from "next/link";
import styled from "styled-components";
import gql from "graphql-tag";
import cookie from "cookie";
import {useRouter} from "next/router";
import {useApolloClient, useMutation} from "@apollo/react-hooks";

import SignUpForm from "../components/SignUpForm";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import {Caption, LinkText} from "../money-ui/typography";
import {withApollo} from "../lib/apollo";

const NINETY_DAYS = 30 * 24 * 60 * 60,

    CREATE_USER_MUTATION = gql`
    mutation CreateUser($user: UserInput!) {
        createUser(user: $user) {
            id
            token
        }
    }
`,

    CreateAccountPage = () => {

        const router = useRouter(),
            client = useApolloClient(),

            [createUser] = useMutation(
                CREATE_USER_MUTATION,
                {
                    async onCompleted ({createUser}) {

                        // This should be undefined until I allow accounts to be created without a review process
                        if (createUser.token) {

                            document.cookie = cookie.serialize(
                                "token",
                                createUser.token,
                                {
                                    "maxAge": NINETY_DAYS,
                                    "path": "/",
                                },
                            );
                            await client.cache.reset();

                            /*
                             * TODO location.reload seems suboptimal.
                             *  We should be able to achieve this with router.replace, but
                             *  that's failing when there is no history.
                             * await router.replace("/");
                             */
                            location.reload();

                        }

                    },
                    onError (error) {

                        if (error) {

                            console.error(error);

                        }

                    },
                },
            ),

            onSubmit = async (email, password) => {

                await createUser({
                    "variables": {
                        "user": {email,
                            password},
                    },
                });

            };

        return (
            <Page>
                <SignUpForm onSubmit={onSubmit} />
                <Caption>
                Already have an account?&nbsp;
                    <Link href="/login">
                        <LinkText size={13}>
Login
                        </LinkText>
                    </Link>
                </Caption>
            </Page>
        );

    },

    Page = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

CreateAccountPage.getInitialProps = async (context) => {

    const {loggedInUser} = await checkLoggedIn(context.apolloClient);

    if (loggedInUser.token) {

        await redirect(
            context,
            "/",
        );

    }

    return {};

};

export default withApollo(CreateAccountPage);
