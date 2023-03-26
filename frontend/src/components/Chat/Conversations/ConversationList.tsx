import { Box, Text, Button } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import ConversationModal from "./Modal/Modal";
import { useContext, useState } from 'react';
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";
import { ConversationPopulated } from "../../../../../backend/src/util/types";
import ConversationItem from "./ConversationItem";
import ConversationOperations from "../../../graphql/operations/conversation";
import { toast } from "react-hot-toast";

interface ConversationListProps {
  conversations: Array<ConversationPopulated>;
  onViewConversation: (
    conversationId: string,
    hasSeenLatestMessage: boolean | undefined
  ) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onViewConversation
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut, userId, setConversationAddress } = useContext(AuthContext);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const [deleteConversation] = useMutation<{
    deleteConversation: boolean;
    conversationId: string;
  }>(ConversationOperations.Mutations.deleteConversation);
  const router = useRouter();

  const onDeleteConversation = async (conversationId: string) => {
    try {
      toast.promise(
        deleteConversation({
          variables: {
            conversationId,
          },
          update: () => {
            router.replace(
              typeof process.env.NEXT_PUBLIC_BASE_URL === "string"
                ? process.env.NEXT_PUBLIC_BASE_URL
                : ""
            );
          },
        }),
        {
          loading: "Deleting conversation",
          success: "Conversation deleted",
          error: "Failed to delete conversation",
        }
      );
    } catch (error) {
      console.log("onDeleteConversation error", error);
    }
  };

  const sortedConversations = [...conversations].sort(
    (a, b) => b.updatedAt.valueOf() - a.updatedAt.valueOf()
  );

    return (
    <Box
      width={{ base: "100%", md: "320px" }}
      position="relative"
      height="100%"
      overflow="hidden"
    >
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
          Find or start a conversation
        </Text>
      </Box>
      <ConversationModal isOpen={isOpen} onClose={onClose} />
        {sortedConversations.map((conversation) => {
          const participant = conversation.participants.find(
            (p) => p.user.id === userId
          );

          return (
            <ConversationItem
              key={conversation.id}
              userId={userId}
              conversation={conversation}
              onClick={() => {
                onViewConversation(
                  conversation.id,
                  participant?.hasSeenLatestMessage
                ),
                setConversationAddress(conversation?.conversationAddress)
              }
              }
              onDeleteConversation={onDeleteConversation}
              hasSeenLatestMessage={participant?.hasSeenLatestMessage}
              isSelected={conversation.id === router.query.conversationId}
            />
          );
        })}
        <Box position="absolute" bottom={0} left={0} width="100%" px={8}>
        <Button width="100%" onClick={() => signOut()}>
          Logout
        </Button>
      </Box>
      </Box>
    )
}

export default ConversationList;