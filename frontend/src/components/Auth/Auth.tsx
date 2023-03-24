
import {
  Button,
  Center,
  Stack,
  Text,
  Image,
  Input,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useContext, useEffect } from 'react';
import { AuthContext } from "@/context/AuthContext";

interface IAuthProps {
  reloadSession: () => void;
}

const Auth: React.FunctionComponent<IAuthProps> = ({
  reloadSession,
}) => {
  const [username, setUsername] = useState("");
  const { provider, login, userInfo, privateKey, currentAccount } = useContext(AuthContext);

  return (
    <Center height="100vh">
      <Stack spacing={8} align="center"> 
        <Text fontSize="3xl">MessengerQL</Text>
        <Button
          onClick={login}
          leftIcon={<Image height="20px" src="/images/web3auth.png" />}
        >
          Continue with Web3Auth
        </Button>
      </Stack>
    </Center>
  );
};

export default Auth;
