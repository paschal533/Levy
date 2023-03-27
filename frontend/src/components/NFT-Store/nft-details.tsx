//@ts-nocheck
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

import { FetchContext } from "../../context/FetchContext";
import { shortenAddress } from "../../util/shortenAddress";
import NFTButton from "./NFTButton";
import Loader from "./Loader";
import NFTModal from "./NFTModal";
import { AuthContext } from "@/context/AuthContext";

import images from "../../../assets";

const PaymentBodyCmp = ({ nft, nftCurrency }: any) => (
  <div className="flex flex-col">
    <div className="flexBetween">
      <p className="font-poppins text-white  font-semibold text-base minlg:text-xl">
        Item
      </p>
      <p className="font-poppins text-white  font-semibold text-base minlg:text-xl">
        Subtotal
      </p>
    </div>

    <div className="flexBetweenStart my-5">
      <div className="flex-1 flexStartCenter">
        <div className="relative w-28 h-28">
          <Image
            src={nft.image || images[`nft${nft.i}`]}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flexCenterStart flex-col ml-5">
          <p className="font-poppins text-white  font-semibold text-sm minlg:text-xl">
            {shortenAddress(nft.seller)}
          </p>
          <p className="font-poppins text-white  text-sm minlg:text-xl font-normal">
            {nft.name}
          </p>
        </div>
      </div>

      <div>
        <p className="font-poppins text-white text-sm minlg:text-xl font-normal">
          {nft.price} <span className="font-semibold">{nftCurrency}</span>
        </p>
      </div>
    </div>

    <div className="flexBetween mt-10">
      <p className="font-poppins  text-white font-semibold text-base minlg:text-xl">
        Total
      </p>
      <p className="font-poppins text-white  text-base minlg:text-xl font-normal">
        {nft.price} <span className="font-semibold">{nftCurrency}</span>
      </p>
    </div>
  </div>
);

const AssetDetails = () => {
  const { buyNft, isBuyNFT } = useContext(FetchContext);
  const nftCurrency = "xDAI";
  const { provider, login, currentAccount } = useContext(AuthContext);
  const [nft, setNft] = useState({
    image: "",
    itemId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  });
  const [paymentModal, setPaymentModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // disable body scroll when navbar is open
    if (paymentModal || successModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [paymentModal, successModal]);

  useEffect(() => {
    if (!router.isReady) return;

    setNft(router.query);

    setIsLoading(false);
  }, [router.isReady]);

  const checkout = async () => {
    try {
      await buyNft(nft).then(() => setSuccessModal(true));

      setPaymentModal(false);
    } catch (error) {
      alert(error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Box
        overflowY="scroll"
        height="100vh"
        className="relative flex justify-center min-h-screen"
      >
        <div className="max-w-[1200px] flex relative">
          <div className="relative flex-1 p-12 border-r border-nft-black-1 ">
            <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full  h-557 ">
              <Image
                src={nft.image || images[`nft${nft.i}`]}
                height={557}
                width={557}
                alt="image"
                className=" rounded-xl shadow-lg"
              />
            </div>
          </div>

          <div className="flex-1 justify-start p-12 sm:pb-4">
            <div className="flex flex-row ">
              <h2 className="font-poppins text-white font-semibold text-2xl minlg:text-3xl">
                {nft.name}
              </h2>
            </div>

            <div className="mt-10">
              <p className="font-poppins text-white  text-xs minlg:text-base font-normal">
                Creator
              </p>
              <div className="flex flex-row items-center mt-3">
                <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
                  <Image
                    src={images.creator1}
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <p className="font-poppins text-white text-sm minlg:text-lg font-semibold">
                  {shortenAddress(nft.seller)}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col">
              <div className="w-full border-b border-nft-black-1 flex flex-row">
                <p className="font-poppins text-white font-medium text-base mb-2">
                  Details
                </p>
              </div>
              <div className="mt-3">
                <p className="font-poppins text-white font-normal text-base">
                  An NFT (non-fungible token) is a digital asset that has been
                  authenticated using blockchain technology. Digital assets are
                  intangible objects that live on the Internet, including
                  videos, GIFs, images, and collages. NFTs allow their makers
                  not only to “sign” digital assets but also to make money from
                  them.
                </p>
              </div>
            </div>
            <div className="flex flex-row mt-10">
              {provider ? (
                currentAccount.toLowerCase() === nft.seller.toLowerCase() ? (
                  <p className="font-poppins text-white font-normal text-base border border-gray p-2">
                    You cannot buy your own NFT
                  </p>
                ) : currentAccount.toLowerCase() === nft.owner.toLowerCase() ? (
                  <NFTButton
                    btnName="List on Marketplace"
                    btnType="primary"
                    classStyles="mr-5  rounded-xl"
                    handleClick={() =>
                      router.push(
                        `/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`
                      )
                    }
                  />
                ) : (
                  <NFTButton
                    btnName={`Buy for ${nft.price} ${nftCurrency}`}
                    btnType="primary"
                    classStyles="mr-5 rounded-xl"
                    handleClick={() => setPaymentModal(true)}
                  />
                )
              ) : (
                <NFTButton
                  btnName="Login"
                  btnType="primary"
                  classStyles="mr-5 rounded-xl"
                  handleClick={login}
                />
              )}
            </div>
          </div>

          {paymentModal && (
            <NFTModal
              header="Check Out"
              body={<PaymentBodyCmp nft={nft} nftCurrency={nftCurrency} />}
              footer={
                <div className="flex flex-row ">
                  <NFTButton
                    btnName="Checkout"
                    btnType="primary"
                    classStyles="mr-5 rounded-xl"
                    handleClick={checkout}
                  />
                  <NFTButton
                    btnName="Cancel"
                    btnType="outline"
                    classStyles="rounded-lg"
                    handleClick={() => setPaymentModal(false)}
                  />
                </div>
              }
              handleClose={() => setPaymentModal(false)}
            />
          )}

          {isBuyNFT && (
            <NFTModal
              header="Buying NFT..."
              body={
                <div className="flexCenter flex-col text-center">
                  <div className="relative w-52 h-52">
                    <Loader />
                  </div>
                </div>
              }
              handleClose={() => setSuccessModal(false)}
            />
          )}

          {successModal && (
            <NFTModal
              header="Payment Successful"
              body={
                <div
                  className="flexCenter flex-col text-center"
                  onClick={() => setSuccessModal(false)}
                >
                  <div className="relative w-52 h-52">
                    <Image
                      src={nft.image || images[`nft${nft.i}`]}
                      objectFit="cover"
                      layout="fill"
                    />
                  </div>
                  <p className="font-poppins text-white text-sm minlg:text-xl font-normal mt-10">
                    {" "}
                    You successfully purchased{" "}
                    <span className="font-semibold">{nft.name}</span> from{" "}
                    <span className="font-semibold">
                      {shortenAddress(nft.seller)}
                    </span>
                    .
                  </p>
                </div>
              }
              footer={
                <div className="flexCenter flex-col">
                  <NFTButton
                    btnName="Check it out"
                    btnType="primary"
                    classStyles="sm:mr-0 sm:mb-5 rounded-xl"
                    handleClick={() => router.push("/")}
                  />
                </div>
              }
              handleClose={() => setSuccessModal(false)}
            />
          )}
        </div>
      </Box>
    </>
  );
};

export default AssetDetails;
