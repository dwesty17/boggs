import gql from 'graphql-tag';

const query = gql`
  query getUser {
    user {
      id
      name
    }
  }
`;

const checkLoggedIn = async (apolloClient) => {
  try {
    const data = await apolloClient.query({ query });
    return { loggedInUser: data.loggedInUser };
  } catch (error) {
    return { loggedInUser: {} };
  }
};

export default checkLoggedIn;
