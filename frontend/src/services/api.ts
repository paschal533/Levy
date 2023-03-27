import { NFTMarketplaceAddress } from "@/config";
import { ethers, providers } from "ethers";

import { NFTMarketplace__factory } from "../../types/ethers-contracts";

export const fetchContract = (
  signerOrProvider: ethers.Signer | ethers.providers.Provider
) => NFTMarketplace__factory.connect(NFTMarketplaceAddress, signerOrProvider);

export const getTopTenCoins = async () => {
  try {
    const res = await fetch("/api/getTopTen");
    const data = await res.json();
    return data.data.data;
  } catch (e: any) {
    console.log(e.message);
  }
};

export const getNewsUpdate = async () => {
  try {
    const res = await fetch("/api/getNews");
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};
