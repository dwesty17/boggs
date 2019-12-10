import gql from 'graphql-tag';

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
    const data = await apolloClient.query({ query });
    return { loggedInUser: data.getUser || {} };
  } catch (error) {
    return { loggedInUser: {} };
  }
};

export default checkLoggedIn;