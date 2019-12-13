import gql from "graphql-tag";

const query = gql`
  query GetUser {
    getUser {
      id
      email
      token
    }
  }
`;

const checkLoggedIn = async (apolloClient) => {
  try {
    const { getUser } = await apolloClient.query({ query });
    return { loggedInUser: getUser || {} };
  } catch (error) {
    console.error("❌ Unable to query for logged in user", error);
    return { loggedInUser: {} };
  }
};

export default checkLoggedIn;
