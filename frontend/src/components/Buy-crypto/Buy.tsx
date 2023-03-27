// @ts-nocheck
import { Box } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { isAddress } from "@ethersproject/address";
import {
  SafeOnRampKit,
  SafeOnRampEvent,
  SafeOnRampProviderType,
} from "@safe-global/onramp-kit";
import { Grid, Text, Button } from "@chakra-ui/react";

const Buy = () => {
  const isSessionValid = (sessionId: any) => sessionId.length === 28;
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(
    process.env.NEXT_PUBLIC_SECTION_ID
  );
  const [onRampClient, setOnRampClient] = useState<any>();
  const stripeRootRef = useRef(null);

  const handleCreateSession = async () => {
    try {
      setLoading(true);
      if (!isSessionValid(sessionId) && !isAddress(walletAddress)) return;

      if (stripeRootRef.current) {
        stripeRootRef.current.innerHTML = "";
      }

      const sessionData = await onRampClient?.open({
        //sessionId: sessionId,
        walletAddress,
        networks: ["ethereum", "polygon"],
        element: "#stripe-root",
        events: {
          onLoaded: () => console.log("onLoaded()"),
          onPaymentSuccessful: (eventData: any) =>
            console.log("onPaymentSuccessful(): ", eventData),
          onPaymentProcessing: (eventData: any) =>
            console.log("onPaymentProcessing(): ", eventData),
          onPaymentError: (eventData: any) =>
            console.log("onPaymentError(): ", eventData),
        },
      });

      setLoading(false);
      setWalletAddress(sessionData.transaction_details.wallet_address);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const onRampClient = await SafeOnRampKit.init(
        SafeOnRampProviderType.Stripe,
        {
          onRampProviderConfig: {
            stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "",
            onRampBackendUrl: "https://aa-stripe.safe.global",
          },
        }
      );

      setOnRampClient(onRampClient);
    })();
  }, []);

  return (
    <Box bg="whiteAlpha.50" width="100%" height="100%">
      <div className="h-[100%]">
        <div className="w-full mt-8 justify-center text-center">
          <Text justifyContent="center" fontSize={30} fontWeight="bold">
            Buy Crypto with your credit card
          </Text>
        </div>
        <div className="w-full justify-center p-20 ">
          <div className=" justify-center w-full flex">
            <div className="w-full h-[50vh] justify-center mt-10">
              <p className="font-poppins font-semibold text-xl">
                Wallet address
              </p>
              <input
                className="bg-[#2D2E36]  border mb-4 border-[#2D2E36] rounded-lg w-full outline-none font-poppins text-white text-base mt-4 px-4 py-3"
                placeholder="Enter the address you want to initialize the session with"
                onChange={(event) => setWalletAddress(event.target.value)}
                value={walletAddress}
                id="wallet-address"
              />
              <br />
              <Button
                isLoading={loading}
                colorScheme="blue"
                onClick={handleCreateSession}
              >
                Create session
              </Button>
            </div>
            <div className="w-full justify-center items-center flex mb-8">
              <div id="stripe-root" ref={stripeRootRef}></div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Buy;
