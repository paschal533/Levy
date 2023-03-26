import { Flex } from "@chakra-ui/react";
import ConversationWrapper from "./Conversations/ConversationWrapper";
import FeedWrapper from "./Feeds/FeedWrapper";
import SafeDetails from "./SafeDetails";
import Profile from "../Profile/Profile";
import { useRouter } from 'next/router';
import NFTStore from "../NFT-Store/NFT-Store";
import Buy from "../Buy-crypto/Buy";

const Chat = () => {
  const router = useRouter();

  const { page } = router.query;

  return (
    <>
    {!page ? (<Flex height="100vh" width="100vw" overflowX="hidden">
        <ConversationWrapper />
        <FeedWrapper />
        <SafeDetails />
    </Flex>) : page === "profile" ? (<Profile />) : page === "nft-store" ? (<NFTStore />) : (<Buy />)}
    </>
  )
}

export default Chat;