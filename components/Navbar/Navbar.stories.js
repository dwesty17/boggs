import React from "react";
import styled from "styled-components";

import {Color} from "../../styles";

import Navbar from "./Navbar";
import {Text} from "../../money-ui/typography";

export default {
    "title": "components/Navbar",
};

const mockClient = {
    "cache": {
        "reset": () => {},
    },
};

export const Default = () => <Page>
    <Navbar mockClient={mockClient} />
    <SiteContainer>
        <Text>
This is where the good stuff happens...
        </Text>
    </SiteContainer>
</Page>;
export const Mobile = () => <Screen>
    <Navbar mockClient={mockClient} />
    <SiteContainer>
        <Text>
This is where the good stuff happens...
        </Text>
    </SiteContainer>
</Screen>;
const Page = styled.div`
  height: 300px;
  margin: 20px;
  border: 1px dotted ${Color.ShipGrey};
  border-bottom: none;
`,

    Screen = styled.div`
  width: 300px;
  height: 300px;
  margin: 20px;
  border: 1px dotted ${Color.ShipGrey};
  border-bottom: none;
`,

    SiteContainer = styled.div`
  padding: 10px;
`;
