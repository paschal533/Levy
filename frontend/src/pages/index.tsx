import Head from 'next/head'
import { Box, Flex } from "@chakra-ui/react";
import { useContext, useEffect } from 'react';
import { AuthContext } from "@/context/AuthContext";
import Auth from "../components/Auth/Auth";
import { useMutation, useLazyQuery } from "@apollo/client";
import UserOperations from "../graphql/operations/user";
import { CreateUserData, CreateUserVariables, SearchUserData, SearchUserInput } from "../util/types";
import Chat from '@/components/Chat/Chat';
import toast from "react-hot-toast";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const { setPass, signOut, pass, setUserId, userInfo, privateKey, currentAccount } = useContext(AuthContext);
  const [createUser, { loading, error }] = useMutation<
    CreateUserData,
    CreateUserVariables
  >(UserOperations.Mutations.createUser);

  const [searchUser, { loading : searchloading, error: searchError }] = useLazyQuery<
    SearchUserData,
    SearchUserInput
  >(UserOperations.Queries.searchUser);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);

  };
  useEffect(() => {
    if(privateKey){
     create()
    }
   }, [privateKey])

 const create = async () => {
   if(!userInfo || !currentAccount || !privateKey) return;

   try {
     const id = currentAccount.slice(2, 14) as string;
     const name = userInfo?.name as string;
     const username = userInfo?.name as string;
     const email = userInfo?.email as string;
     const image = userInfo?.profileImage as string;
     const walletAddress = currentAccount as string;
     await createUser({ variables: { id, name, username, email, image, walletAddress, privateKey } });

     toast.success("Login successfully! 🚀");

     const user = await searchUser({ variables: { walletAddress }})

     const userId = user.data?.searchUser.id as string;

     setUserId(user.data?.searchUser.id)

     localStorage.setItem("userId", userId)

     setPass(true)

   } catch (error: any) {
     toast.error(error?.message);
     console.log("onSubmit error", error);
   }
 };
   
  return (
    <Box>
      {pass ? (
        <Flex>
        <Sidebar />
        <Chat />
        </Flex>
      ) : (
        <Auth reloadSession={reloadSession} />
      )}
    </Box>
  );
}
