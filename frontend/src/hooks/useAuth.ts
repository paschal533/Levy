// @ts-nocheck
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { Web3Auth } from "@web3auth/modal";
import { TorusWalletAdapter } from "@web3auth/torus-evm-adapter";
// import RPC from ".api/ethersRPC"; // for using ethers.js
// Plugins
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
// Adapters
import { WalletConnectV1Adapter } from "@web3auth/wallet-connect-v1-adapter";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  GaslessOnboarding,
  GaslessWalletConfig,
  GaslessWalletInterface,
  LoginConfig,
} from "@gelatonetwork/gasless-onboarding";

import RPC from "../pages/api/web3RPC"; // for using web3.js

const clientId = process.env.NEXT_PUBLIC_WEB3AUTHCLIENTID; // get from https://dashboard.web3auth.io

interface user {
  idToken: string;
  name: string;
  email: string;
  profileImage: string;
}

const useAuth = () => {
  const [gaslessOnboarding, setGaslessOnboarding] = useState<any>(null);
  const [provider, setProvider] = useState(null);
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [privateKey, setPrivatekey] = useState<string>("");
  const [userInfo, setUserInfo] = useState<user>({});
  const [balance, setBalance] = useState(null);
  const [pass, setPass] = useState<boolean>(false);
  const [userId, setUserId] = useState<any>(null);
  const [conversactionAddress, setConversationAddress] = useState<any>("");

  useEffect(() => {
    const init = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_GELATO_API_KEY;
        const gaslessWalletConfig: GaslessWalletConfig = { API };
        const loginConfig: LoginConfig = {
          domains: [window.location.origin],
          chain: {
            id: 5,
            rpcUrl: "https://rpc.ankr.com/eth_goerli",
          },
        };
        const gaslessOnboarding = new GaslessOnboarding(
          loginConfig,
          gaslessWalletConfig
        );

        setGaslessOnboarding(gaslessOnboarding);
        await gaslessOnboarding.init();
        const provider = gaslessOnboarding.getProvider();
        if (!provider) return;

        if (provider) {
          setProvider(provider);
        }
      } catch (err) {
        console.error(err);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (provider) {
        await getAccounts();
        await getPrivateKey();
        await getUserInfo();
        await getBalance();
      }
    };

    fetch();
  }, [provider]);

  const login = async () => {
    if (!gaslessOnboarding) {
      return;
    }
    await gaslessOnboarding.login();
    const provider = gaslessOnboarding.getProvider();
    console.log(provider);
    setProvider(provider);
  };

  const getUserInfo = async () => {
    if (!gaslessOnboarding) {
      return;
    }
    const data = await gaslessOnboarding.getUserInfo();
    setUserInfo(data);
  };

  const logout = async () => {
    if (!gaslessOnboarding) {
      return;
    }
    await gaslessOnboarding.logout();
    setProvider(null);
  };

  const getAccounts = async () => {
    if (!provider) {
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    setCurrentAccount(address);
  };

  const getBalance = async () => {
    if (!provider) {
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    setBalance(balance);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    setPrivatekey(privateKey);
  };

  const router = useRouter();

  const signOut = async () => {
    await logout();
    await router.push("/");
    await localStorage.setItem("userId", "");
    await setUserInfo({});
    await setCurrentAccount("");
    await setPrivatekey("");
    await setProvider(null);
    await setPass(false);
    await window.location.reload(false);
  };

  return {
    signOut,
    login,
    logout,
    userInfo,
    currentAccount,
    privateKey,
    balance,
    provider,
    pass,
    setPass,
    setUserId,
    setConversationAddress,
    userId,
    conversactionAddress,
  };
};

export default useAuth;
