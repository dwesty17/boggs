import gql from "graphql-tag";

const query = gql`
  query GetUser {
    getUser {
      id
      email
      token
      monthlySpendingGoal
    }
  }
`;

const checkLoggedIn = async (apolloClient) => {
  try {
    const { data } = await apolloClient.query({ query });
    return { loggedInUser: data.getUser || {} };
  } catch (error) {
    console.error("❌ Unable to query for logged in user", error);
    return { loggedInUser: {} };
  }
};

export default checkLoggedIn;
