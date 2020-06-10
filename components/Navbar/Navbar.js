import React from "react";
import Link from "next/link";
import styled from "styled-components";
import cookie from "cookie";
import {useApolloClient} from "@apollo/react-hooks";

import redirect from "../../lib/redirect";
import {Color} from "../../styles";
import {Button} from "../../money-ui";

const Navbar = ({mockClient}) => {

        const client = mockClient || useApolloClient(),

            signOut = async () => {

                document.cookie = cookie.serialize(
                    "token",
                    null,
                    {"maxAge": -1,
                        "path": "/"},
                );
                await client.cache.reset();
                await redirect(
                    {},
                    "/login",
                );

            };

        return (
            <Container>
                <Link href="/">
                    <Logo src="/logos/text-logo-white.png" />
                </Link>

                <Button
                    noShadow
                    onClick={signOut}
                    size="small"
                >
                Sign out
                </Button>
            </Container>
        );

    },

    Container = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${Color.GovernorsBay};
  padding: 0 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px ${Color.Alto};
`,

    Logo = styled.img`
  height: 25px;
  cursor: pointer;
`;

export default Navbar;
