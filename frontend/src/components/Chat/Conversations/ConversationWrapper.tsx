import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import ConversationList from "./ConversationList";
import ConversationOperations from "../../../graphql/operations/conversation";
import {
  ConversationsData,
} from "../../../util/types";
import {
  ConversationPopulated,
  ParticipantPopulated,
} from "../../../../../backend/src/util/types";
import { useRouter } from "next/router";
import SkeletonLoader from "../../common/SkeletonLoader";

const ConversationWrapper = () => {
  const {
      data: conversationsData,
      error: conversationsError,
      loading: conversationsLoading,
      subscribeToMore,
    } = useQuery<ConversationsData, null>(
      ConversationOperations.Queries.conversations
    );

    const router = useRouter();

    const [markConversationAsRead] = useMutation<
      { markConversationAsRead: boolean },
      { userId: string; conversationId: string }
    >(ConversationOperations.Mutations.markConversationAsRead);

    const onViewConversation = async (
      conversationId: string,
      hasSeenLatestMessage: boolean | undefined
    ) => {
      /**
       * 1. Push the conversationId to the router query params
       */
      router.push({ query: { conversationId } });
  
      /**
       * 2. Mark the conversation as read
       */
      if (hasSeenLatestMessage) return;
  
      // markConversationAsRead mutation
    };

    const subscribeToNewConversations = () => {
      subscribeToMore({
        document: ConversationOperations.Subscriptions.conversationCreated,
        updateQuery: (
          prev,
          {
            subscriptionData,
          }: {
            subscriptionData: {
              data: { conversationCreated: ConversationPopulated };
            };
          }
        ) => {
          if (!subscriptionData.data) return prev;
  
          const newConversation = subscriptionData.data.conversationCreated;
  
          return Object.assign({}, prev, {
            conversations: [newConversation, ...prev.conversations],
          });
        },
      });
    };
  
    /**
     * Execute subscription on mount
     */
    useEffect(() => {
      subscribeToNewConversations();
    }, []);
    
    return (
        <Box
          width={{ base: "100%", md: "430px" }}
          flexDirection="column"
          bg="whiteAlpha.50"
          gap={4}
          py={6}
          px={3}
        >
           {conversationsLoading ? (
              <SkeletonLoader count={7} height="80px" />
            ) : (
              <ConversationList
                conversations={conversationsData?.conversations || []}
                onViewConversation={onViewConversation}
              />
            )}
        </Box>
    )
}

export default ConversationWrapper;