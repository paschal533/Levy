import { gql } from "@apollo/client";

export default {
  Queries: {
    searchUsers: gql`
      query SearchUsers(
        $username: String! 
        $caller: String!
      ) {
        searchUsers(username: $username, caller: $caller) {
          id
          username
          image
          walletAddress
        }
      }
    `,
    searchUser: gql`
      query SearchUser(
        $walletAddress: String! 
      ) {
        searchUser(walletAddress: $walletAddress) {
          id
          username
          image
          walletAddress
        }
      }
    `,
  },
  Mutations: {
    createUser: gql`
      mutation CreateUser(
        $id: String!
        $name: String!
        $username: String!
        $email: String!
        $image: String!
        $walletAddress: String!
        $privateKey: String!
      ) {
        createUser(
          id: $id
          name: $name
          username: $username
          email: $email
          image: $image
          walletAddress: $walletAddress
          privateKey: $privateKey
        ) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {},
};
