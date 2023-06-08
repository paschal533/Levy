import { Box } from "@chakra-ui/react";
import CMCtable from "../cmc-table/cmcTable";
import Trending from "./TrendingTokens";

export default function Home() {
  return (
    <Box overflowY="scroll"
    height="100vh" className="min-h-screen w-full text-white">
      <div className="mt-10 pl-5 pr-5" />
      <Trending />
      <div className="mt-10" />
      <CMCtable />
    </Box>
  );
}