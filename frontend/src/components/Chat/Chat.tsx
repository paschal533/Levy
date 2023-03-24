import { Flex } from "@chakra-ui/react";
import ConversationWrapper from "./Conversations/ConversationWrapper";
import FeedWrapper from "./Feeds/FeedWrapper";


const Chat = () => {
  return (
    <Flex height="100vh">
      <ConversationWrapper />
      <FeedWrapper />
    </Flex>
  )
}

export default Chat;