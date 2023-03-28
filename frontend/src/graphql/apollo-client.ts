import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: "ws://levy.onrender.com/graphql/subscriptions",
          connectionParams: async () => ({
            userId: localStorage.getItem("userId"),
          }),
        })
      )
    : null;

const httpLink = new HttpLink({
  uri: "https://levy.onrender.com/graphql",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("userId");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const link =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});
