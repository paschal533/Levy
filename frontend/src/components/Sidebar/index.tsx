import { Box, Flex, Text } from "@chakra-ui/react";
import { TbBuildingStore } from "react-icons/tb"
import { BsChatDots } from "react-icons/bs"
import { CgProfile } from "react-icons/cg"
import { IoMdWallet} from "react-icons/io"
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
    const [item, setItem] = useState<string>("nft")
    const router = useRouter();

    const onClick = (page : string) => {
        router.push({ query: { page } });
    }

    return (
        <Box
        width={{ base: "0px", md: "200px" }}
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
        className="sticky z-10"
        gap={4}
        >
            <Flex py={2} onClick={() => router.push("/")} px={2} borderRadius={5} _hover={{ cursor:"pointer" }} alignItems="center" alignContent="center">
                 <Image src="./images/logo.png" height={50} width={70} alt="logo" />
                 <Text ml={5} fontSize={20} fontWeight="bold" >Levy</Text>
            </Flex>
            <Box
              gap={4}
              py={6}
              px={4}
              mt={20}
            >
                 
                <Flex onClick={() => {setItem("profile"), onClick("profile")}} py={2} px={2} borderRadius={5} color={`${item == "profile" && "#4FD8E0"}`} bg={`${item == "profile" && "whiteAlpha.200"}`} _hover={{ cursor:"pointer", bg:"whiteAlpha.300" }} alignItems="center" alignContent="center">
                <CgProfile fontSize={25} />
                <Text ml={5} fontSize={20} fontWeight="bold" >Profile</Text>
                </Flex>
                 
                 
                <Flex onClick={() => { setItem("chat"), router.push("/")}} py={2} px={2} color={`${item == "chat" && "#4FD8E0"}`} bg={`${item == "chat" && "whiteAlpha.200"}`} borderRadius={5} _hover={{ cursor:"pointer", bg:"whiteAlpha.300" }} alignItems="center" alignContent="center"> 
                <BsChatDots fontSize={25} />
                <Text ml={5} fontSize={20} fontWeight="bold" >Chats</Text>
                </Flex>
                
                <Flex onClick={() => {setItem("nft"), onClick("nft-store")}} py={2} px={2}color={`${item == "nft" && "#4FD8E0"}`} bg={`${item == "nft" && "whiteAlpha.200"}`} borderRadius={5} _hover={{ cursor:"pointer", bg:"whiteAlpha.300" }} alignItems="center" alignContent="center">
                <TbBuildingStore fontSize={25} />
                <Text ml={5} fontSize={20} fontWeight="bold" >NFTs</Text>
                </Flex>

                <Flex onClick={() => {setItem("buy"), onClick("buy-crypto")}} py={2} px={2}color={`${item == "buy" && "#4FD8E0"}`} bg={`${item == "buy" && "whiteAlpha.200"}`} borderRadius={5} _hover={{ cursor:"pointer", bg:"whiteAlpha.300" }} alignItems="center" alignContent="center">
                <IoMdWallet fontSize={25} />
                <Text ml={5} fontSize={20} fontWeight="bold" >Buy</Text>
                </Flex>
                 
            </Box>
        </Box>
    )
}

export default Sidebar;