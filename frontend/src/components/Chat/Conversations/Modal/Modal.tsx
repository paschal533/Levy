//@ts-nocheck 
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import UserOperations from "../../../../graphql/operations/user";
import ConversationOperations from "../../../../graphql/operations/conversation";
import { useContext } from 'react';
import { AuthContext } from "@/context/AuthContext";
import {
  CreateConversationData,
  CreateConversationInput,
  SearchedUser,
  SearchUsersData,
  SearchUsersInput,
} from "../../../../util/types";
import Participants from "./Participants";
import UserSearchList from "./UserSearchList";
import { useRouter } from "next/router";
import { ethers } from 'ethers'
import EthersAdapter from '@safe-global/safe-ethers-lib'
import SafeServiceClient from '@safe-global/safe-service-client'
import { SafeAccountConfig } from '@safe-global/safe-core-sdk'
import { SafeFactory } from '@safe-global/safe-core-sdk'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [checkValue, setCheckValue] = useState<any>(false);
  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);
  const { userInfo, privateKey, currentAccount, userId } = useContext(AuthContext);
  const [searchUsers, { data, error, loading }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOperations.Queries.searchUsers);
  const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData, CreateConversationInput>(
      ConversationOperations.Mutations.createConversation
    );

  const onCreateConversation = async () => {
    const participantIds = [userId, ...participants.map((p) => p.id)];
    const conversationAddress = "0x0000000000000000000000000000000000000000";
    const participantAddresses = [currentAccount, ...participants.map((p) => p.walletAddress)];
     
    try {
      if(checkValue){
        const RPC_URL='https://eth-goerli.public.blastapi.io'
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

      // Initialize signers
      const signer = new ethers.Wallet(privateKey, provider)

      const ethAdapterOwner = new EthersAdapter({
        ethers,
        signerOrProvider: signer
      })

      const txServiceUrl = 'https://safe-transaction-goerli.safe.global'
      const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner })

      const safeAccountConfig: SafeAccountConfig = {
        owners: participantAddresses,
        threshold: participantAddresses.length,
        // ... (Optional params)
      }

      /* This Safe is tied to owner 1 because the factory was initialized with
      an adapter that had owner 1 as the signer. */
      const safeSdkOwner = await safeFactory.deploySafe({ safeAccountConfig })

      const safeAddress = safeSdkOwner.getAddress()

      const { data } = await createConversation({
        variables: {
          participantIds,
          safeAddress,
          userId
        },
      });

      if (!data?.createConversation) {
        throw new Error("Failed to create conversation");
      }

      const {
        createConversation: { conversationId },
      } = data;

      router.push({ query: { conversationId } });

      }else{
        const { data } = await createConversation({
          variables: {
            participantIds,
            conversationAddress,
            userId
          },
        });
  
        if (!data?.createConversation) {
          throw new Error("Failed to create conversation");
        }
  
        const {
          createConversation: { conversationId },
        } = data;
  
        router.push({ query: { conversationId } });
      }
       
      /**
       * Clear state and close modal
       * on successful creation
       */
      setParticipants([]);
      setUsername("");
      onClose();
      setCheckValue(false)
    } catch (error: any) {
      console.log("onCreateConversation error", error);
      toast.error(error?.message);
    }
  };

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const caller = userInfo.name;
    searchUsers({ variables: { username, caller } });
  };

  const addParticipant = (user: SearchedUser) => {
    setParticipants((prev) => [...prev, user]);
    setUsername("");
  };

  const removeParticipant = (userId: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== userId));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#273B4A" color="#fff" pb={4}>
          <ModalHeader color="#fff">Create a Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <Button bg="#436475" type="submit" disabled={!username} isLoading={loading}>
                  Search
                </Button>
              </Stack>
            </form>
            {data?.searchUsers && (
              <UserSearchList
                users={data.searchUsers}
                addParticipant={addParticipant}
                participants={participants}
              />
            )}
            {participants.length !== 0 && (
              <>
                <Participants
                  participants={participants}
                  removeParticipant={removeParticipant}
                />
                 <Flex mt={4}>
                 <input  type="checkbox" onChange={(e) => setCheckValue(e.target.checked)} />
                 <Text ml={2}>Create a safe</Text>
                 </Flex>
                <Button
                  bg="brand.100"
                  width="100%"
                  mt={6}
                  _hover={{ bg: "brand.100" }}
                  isLoading={createConversationLoading}
                  onClick={onCreateConversation}
                >
                  Create Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConversationModal;
