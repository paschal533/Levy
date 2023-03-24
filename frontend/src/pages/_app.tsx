//import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "@/context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../chakra/theme";
import { client } from "../graphql/apollo-client";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <Toaster />
      </ChakraProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}
