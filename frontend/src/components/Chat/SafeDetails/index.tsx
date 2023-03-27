import { Box, Button, Flex, Text, Input } from "@chakra-ui/react";
import { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import SafeServiceClient from "@safe-global/safe-service-client";
import Image from "next/image";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import EthersAdapter from "@safe-global/safe-ethers-lib";

const SafeDetails = () => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [depositing, setDepositing] = useState<boolean>(false);
  const [transfer, setTransfer] = useState<boolean>(false);
  const [ethAmount, setEthAmount] = useState<string>("");
  const [transactionAmount, setTransactionAmount] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [pending, setPending] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const { conversationId } = router.query;
  const { conversactionAddress, privateKey } = useContext(AuthContext);

  useEffect(() => {
    const getPendingTransactions = async () => {
      try {
        if (conversactionAddress) {
          const RPC_URL = "https://eth-goerli.public.blastapi.io";
          const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
          const owner1Signer = new ethers.Wallet(privateKey, provider);
          const txServiceUrl = "https://safe-transaction-goerli.safe.global";
          const ethAdapterOwner1 = new EthersAdapter({
            ethers,
            signerOrProvider: owner1Signer,
          });
          const safeService = new SafeServiceClient({
            txServiceUrl,
            ethAdapter: ethAdapterOwner1,
          });
          const pendingTransactions = await safeService.getPendingTransactions(
            conversactionAddress
          );
          setPending(pendingTransactions);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPendingTransactions();
  }, [conversactionAddress]);

  const deposit = async () => {
    if (!ethAmount) return;
    setDepositing(true);

    try {
      const safeAmount = ethers.utils
        .parseUnits(ethAmount, "ether")
        .toHexString();

      const transactionParameters = {
        to: conversactionAddress,
        value: safeAmount,
      };

      // https://chainlist.org/?search=goerli&testnets=true
      const RPC_URL = "https://eth-goerli.public.blastapi.io";
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

      const Signer = new ethers.Wallet(privateKey, provider);

      await Signer.sendTransaction(transactionParameters);

      setDepositing(false);
      toast.success(`${ethAmount} deposited to safe`);
      setEthAmount("");
    } catch (error) {
      console.log(error);
      toast.error("Insuficient balance");
      setDepositing(false);
      setEthAmount("");
    }
  };

  const CreateTransaction = async () => {
    if (!transactionAmount || !walletAddress) return;

    try {
      const amount = ethers.utils
        .parseUnits(transactionAmount, "ether")
        .toString();
      const RPC_URL = "https://eth-goerli.public.blastapi.io";
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      const owner1Signer = new ethers.Wallet(privateKey, provider);
      const txServiceUrl = "https://safe-transaction-goerli.safe.global";
      const ethAdapterOwner1 = new EthersAdapter({
        ethers,
        signerOrProvider: owner1Signer,
      });
      const safeService = new SafeServiceClient({
        txServiceUrl,
        ethAdapter: ethAdapterOwner1,
      });
      const safeTransactionData: SafeTransactionDataPartial = {
        to: walletAddress,
        data: "0x",
        value: amount,
      };

      /*const res = await safeService.getSafeInfo(conversactionAddress)

            const safeTransaction = await res.createTransaction({ safeTransactionData })*/
    } catch (error) {
      console.log(error);
      toast.error("Insuficient balance in safe");
      setTransfer(false);
      setTransactionAmount("");
      setWalletAddress("");
    }
  };

  return (
    <Box
      width={{ base: "0px", md: "800px" }}
      flexDirection="column"
      bg="whiteAlpha.50"
      gap={4}
      py={6}
      px={3}
    >
      {conversationId && typeof conversationId === "string" ? (
        <>
          <Flex
            direction="column"
            justify="center"
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            overflow="hidden"
            flexGrow={1}
          >
            <Text fontSize={25} fontWeight="bold">
              Safe account balance
            </Text>
            <Text fontSize={35} fontWeight="medium">
              $4,500
            </Text>
            <Flex>
              <div
                className="p-2 w-[150px] cursor-pointer hover:bg-[#a59999] justify-center text-center bg-[#828181] rounded-2xl"
                onClick={() => {
                  onOpen(), setContent("send");
                }}
              >
                Send token
              </div>
              <div
                className="p-2 ml-3 w-[150px] cursor-pointer hover:bg-[#a59999] justify-center text-center bg-[#828181] rounded-2xl"
                onClick={() => {
                  onOpen(), setContent("pending");
                }}
              >
                Pending
              </div>
            </Flex>
            <Text fontSize={20} mt={4} fontWeight="medium">
              Assets
            </Text>
            <Flex
              width="100%"
              p={4}
              mt={2}
              justifyContent="center"
              alignItems="center"
              className="bg-[#273B4A] rounded-2xl"
            >
              <Flex width="70%" color="white" justifyContent="space-between">
                <div className="">Tokens</div>
                <div>NFTs</div>
              </Flex>
            </Flex>
            <Flex
              width="100%"
              mt={3}
              justifyContent="space-around"
              justifyItems="center"
            >
              <Flex>
                <Image src="/matic.png" height={25} width={25} alt="matic" />
                <Text ml={2}>Matic</Text>
              </Flex>
              <Text>200 Matic</Text>
              <Text>248 USD</Text>
            </Flex>
            <Flex
              width="100%"
              mt={4}
              justifyContent="space-around"
              justifyItems="center"
            >
              <Flex>
                <Image src="/ether.png" height={25} width={25} alt="matic" />
                <Text ml={2}>Ether</Text>
              </Flex>
              <Text>2 Ether</Text>
              <Text>2480 USD</Text>
            </Flex>
            <Flex
              width="100%"
              mt={4}
              justifyContent="space-around"
              justifyItems="center"
            >
              <Flex>
                <Image src="/uniswap.png" height={25} width={25} alt="matic" />
                <Text ml={2}>Uniswap</Text>
              </Flex>
              <Text>20 Uniswap</Text>
              <Text>145 USD</Text>
            </Flex>
            <div className="bg-[#273B4A] mb-4 border border-[#273B4A] rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row">
              <input
                type="number"
                className="flex-1 w-full bg-[#273B4A] outline-none "
                placeholder="Deposit to safe"
                onChange={(e) => setEthAmount(e.target.value)}
                value={ethAmount}
              />
              <p className="font-poppins text-white  font-semibold text-xl">
                Ether
              </p>
            </div>
            <Button
              onClick={deposit}
              isLoading={depositing}
              colorScheme="teal"
              className="bg-[#2d89e6]"
              size="md"
              color="white"
            >
              Deposit
            </Button>
          </Flex>
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            {content === "send" ? (
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Send Tokens</DrawerHeader>

                <DrawerBody>
                  <Input
                    placeholder="Wallet address..."
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                  />
                  <br />
                  <Input
                    className="mt-4"
                    placeholder="Ether Amount"
                    value={transactionAmount}
                    onChange={(e) => setTransactionAmount(e.target.value)}
                  />
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={CreateTransaction} colorScheme="blue">
                    Send
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            ) : (
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Pending transactions</DrawerHeader>

                <DrawerBody>
                  {!pending && <Text>No pending transaction</Text>}
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            )}
          </Drawer>
        </>
      ) : (
        <Box
          width="100%"
          justifyContent="center"
          justifyItems="center"
          alignContent="center"
          alignItems="center"
          className="w-full justify-center items-center text-center align-middle"
        >
          <Text>Fetching Safe...</Text>
        </Box>
      )}
    </Box>
  );
};

export default SafeDetails;
