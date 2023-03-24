import gql from "graphql-tag";

const typeDefs = gql`
   type User {
    id: String
    name: String
    username: String
    email: String
    image: String
    walletAddress: String
    privateKey: String
  }

  type SearchedUser {
    id: String
    username: String
    image: String
    walletAddress: String
  }

  type Query {
    searchUsers(
      username: String
      caller: String
    ): [SearchedUser]
  }

  type Query {
    searchUser(
      walletAddress: String
    ): SearchedUser
  }

  type Mutation {
    createUser(
      id: String 
      name: String 
      username: String
      email: String
      image: String
      walletAddress: String
      privateKey: String
    ): CreateUsernameResponse
  }

  type CreateUsernameResponse {
    success: Boolean
    error: String
  }
`;

export default typeDefs;