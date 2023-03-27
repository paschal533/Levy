import * as API from "@/services/api";
import { ethers } from "ethers";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { AuthContext } from "@/context/AuthContext";

export const useFetchData = () => {
  const [topTenTokens, setTopTenTokens] = useState(null);
  const [isLoadingNFT, setIsLoadingNFT] = useState(false);
  const [isBuyNFT, setIsBuyNFT] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const xDai = "xDai"


  const fetchNFTs = async () => {
    try {
      setIsLoadingNFT(true);

      const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc.chiadochain.net"
      );
      const contract = API.fetchContract(provider);

      const data = await contract.fetchMarketItems();

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice } : any) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              id: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );

      return items;
      setIsLoadingNFT(false)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyNFTsOrCreatedNFTs = async (type : string) => {
    setIsLoadingNFT(false);

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = API.fetchContract(signer);
    const data =
      type === "fetchItemsListed"
        ? await contract.fetchItemsListed()
        : await contract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async ({ tokenId, seller, owner, price: unformattedPrice }: any) => {
        const tokenURI = await contract.tokenURI(tokenId);
        const {
          data: { image, name, description },
        } = await axios.get(tokenURI);
        const price = ethers.utils.formatUnits(
          unformattedPrice.toString(),
          "ether"
        );

        return {
          price,
          tokenId: tokenId.toNumber(),
          seller,
          owner,
          image,
          name,
          description,
          tokenURI,
        };
      })
    );

    return items;
  };

  const createSale = async (url : string, formInputPrice : any, isReselling : any, id : any) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(formInputPrice, "ether");
    const contract = API.fetchContract(signer);
    const listingPrice = await contract.getListingPrice();

    const transaction = !isReselling
      ? await contract.createToken(url, price, {
          value: listingPrice.toString(),
        })
      : await contract.resellToken(id, price, {
          value: listingPrice.toString(),
        });

    setIsLoadingNFT(true);
    await transaction.wait();
  };

  const buyNft = async (nft: any) => {
    try {
      setIsBuyNFT(true)
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = API.fetchContract(signer);

      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });
      await transaction.wait();
      setIsBuyNFT(false)
    } catch (error) {
      alert(
        "You do not have sufficient money on your wallet to purchase this NFT. "
      );
    }
  };

  return {
    topTenTokens,
    buyNft,
    isLoadingNFT,
    fetchNFTs,
    fetchMyNFTsOrCreatedNFTs,
    createSale,
    loadingData,
    xDai,
    isBuyNFT,
  };
};
