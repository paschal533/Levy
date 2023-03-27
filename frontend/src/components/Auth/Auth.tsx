
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
      <Flex alignItems="center" alignContent="center">
            <Image src="./images/logo.png" height={50} width={70} alt="logo" />
            <Text ml={2} fontSize="3xl" color="white" fontWeight="bold" >Levy</Text>
      </Flex>
        <Button
          onClick={login}
          leftIcon={<Image height="20px" src="/Gelato_logo.jpeg" />}
        >
          Continue with Gelato
        </Button>
      </Stack>
    </Center>
  );
};

export default Auth;
