import Image from "next/image";

import images from "../../../assets";

const CreatorCard = ({ rank, creatorImage, creatorName, creatorEths }: any) => {
  return (
    <div className="bg-[#2A2D3A] border border-[#2A2D3A] rounded-3xl flex flex-col p-4 m-4">
      <div className="w-10 h-10 minlg:w-10 minlg:h-10 rounded-full bg-[#2d89e6] flexCenter">
        <p className="font-poppins text-white font-semibold text-lg minlg:text-lg ">
          {rank}
        </p>
      </div>

      <div className="my-2 flex justify-center">
        <div className="relative w-28 h-28 minlg:w-28 minlg:h-28">
          <Image
            src={creatorImage}
            layout="fill"
            objectFit="cover"
            alt="creator"
            className="rounded-full"
          />
          <div className="absolute w-7 h-7 minlg:w-7 minlg:h-7 bottom-2 -right-0">
            <Image
              src={images.tick}
              layout="fill"
              objectFit="contain"
              alt="tick"
            />
          </div>
        </div>
      </div>

      <div className="mt-7 minlg:mt-7 text-center flexCenter flex-col">
        <p className="font-poppins text-white font-semibold text-base">
          {creatorName}
        </p>
        <p className="mt-1 font-poppins text-white font-semibold text-base">
          {creatorEths.toFixed(2)} <span className="font-normal">XDAi</span>
        </p>
      </div>
    </div>
  );
};

export default CreatorCard;
