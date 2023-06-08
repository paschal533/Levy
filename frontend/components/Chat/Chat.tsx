import { Flex } from "@chakra-ui/react";
import ConversationWrapper from "./Conversations/ConversationWrapper";
import FeedWrapper from "./Feeds/FeedWrapper";
import SafeDetails from "./SafeDetails";
import Profile from "../Profile/Profile";
import { useRouter } from "next/router";
import NFTStore from "../NFT-Store/NFT-Store";
import Buy from "../Buy-crypto/Buy";
import CreateNFT from "../NFT-Store/create-nft";
import NFTDetails from "../NFT-Store/nft-details";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import Tokens from "../Tokens/Token"

const Chat = () => {
  const router = useRouter();
  const { conversactionAddress } = useContext(AuthContext);
  const { page } = router.query;
  const { conversationId } = router.query;
  const { price, create } = router.query;

  return (
    <>
      {page === "profile" ? (
        <Profile />
      ): page === "Tokens" ? (
        <Tokens />
      ) : page === "buy" ? (
        <Buy />
      ): create == "create-nft" ? (
        <CreateNFT />
      ) : price ? (
        <NFTDetails />
      ) : page == "nft-store" ? (
        <NFTStore />
      ): (<Flex
        overflowY="scroll"
        borderRadius={30}
        height="100vh"
        width="100vw"
        overflowX="hidden"
      >
        <ConversationWrapper />
        <FeedWrapper />
        {conversationId &&
        conversactionAddress !==
          "0x0000000000000000000000000000000000000000" ? (
          <SafeDetails />
        ): null}
          </Flex>)}
    </>
  );
};

export default Chat;
