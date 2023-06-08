import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import MessagesHeader from "./Messages/Header";
import MessageInput from "./Messages/Input";
import Messages from "./Messages/Messages";
import NoConversation from "./NoConversationSelected";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const FeedWrapper = () => {
  const router = useRouter();

  const { conversationId } = router.query;
  const { userId } = useContext(AuthContext);

  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
      width="100%"
      direction="column"
      mb={2}
    >
      {conversationId && typeof conversationId === "string" ? (
        <>
          <Flex
            direction="column"
            justify="space-between"
            overflow="hidden"
            flexGrow={1}
          >
            <MessagesHeader userId={userId} conversationId={conversationId} />
            <Messages userId={userId} conversationId={conversationId} />
          </Flex>
          <MessageInput conversationId={conversationId} />
        </>
      ) : (
        <NoConversation />
      )}
    </Flex>
  );
};

export default FeedWrapper;
