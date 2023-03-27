//@ts-nocheck
import { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

import images from "../../../assets";
import { shortenAddress } from "../../util/shortenAddress";

const NFTCard = ({ nft, onProfilePage }: any) => {
  const router = useRouter();
  const onClick = (nft: any) => {
    router.push({ query: nft });
  };

  return (
    <div onClick={() => onClick(nft)}>
      <div className="flex-1 min-w-327 w-[250px] bg-[#2A2D3A] rounded-2xl p-4 m-8 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md">
        <div className="relative w-full h-60 sm:h-36 xs:h-56 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
          <Image
            src={nft.image || images[`nft${nft.i}`]}
            layout="fill"
            objectFit="cover"
            alt="nft01"
          />
        </div>
        <div className="mt-3 flex flex-col">
          <p className="font-poppins text-white  font-semibold text-xl minlg:text-xl">
            {nft.name}
          </p>
          <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
            <p className="font-poppins text-white font-semibold text-md minlg:text-lg">
              {nft.price}
              <span className="font-normal ml-2">xDAI</span>
            </p>
            <p className="font-poppins text-white font-semibold text-md minlg:text-lg">
              {shortenAddress(onProfilePage ? nft.owner : nft.seller)}
            </p>
          </div>
          <div className="mt-3 minlg:mt-3 flexBetween flex-row" />
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
