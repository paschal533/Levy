//@ts-nocheck
import Banner from "../Profile/Banner";
import { useEffect, useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import NFTButton from "./NFTButton";
import Image from "next/image";
import CreatorCard from "./CreatorCard";
import SearchBar from "./SearchBar";
import NFTCard from "./NFTCard";
import Loader from "./Loader";
import { FetchContext } from "../../context/FetchContext";
import { getCreators } from "../../util/getTopCreators";
import { shortenAddress } from "../../util/shortenAddress";
import images from "../../../assets";
import { makeid } from "../../util/makeId";
import { Box } from "@chakra-ui/react";

const NFT = () => {
  const { nfts, isLoading, nftsCopy, setNfts, setNftsCopy } =
    useContext(FetchContext);
  const [hideButtons, setHideButtons] = useState(false);
  const [activeSelect, setActiveSelect] = useState("Recently Added");

  const scrollRef = useRef(null);
  const parentRef = useRef(null);
  const router = useRouter();

  const onHandleSearch = (value: any) => {
    const filteredNfts = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNfts.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNfts);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  const handleScroll = (direction: any) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === "left") {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  // check if scrollRef container is overfilling its parentRef container
  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth)
      return setHideButtons(false);
    return setHideButtons(true);
  };

  // if window is resized
  useEffect(() => {
    isScrollable();
    window.addEventListener("resize", isScrollable);

    return () => {
      window.removeEventListener("resize", isScrollable);
    };
  });

  const onClick = (create: string) => {
    router.push({ query: { create } });
  };

  const creators = getCreators(nfts);

  return (
    <>
      <Box
        overflowY="scroll"
        height="100vh"
        width="88vw"
        color="white"
        className="overflow-x-hidden"
        bg="whiteAlpha.50"
      >
        <div className="w-full justify-center items-center flex flex-col">
          <div className="mt-10 pl-10 w-full max-w-[1500px] pr-10">
            <Banner
              name={
                <>
                  Discover, collect, and sell <br /> extraordinary NFTs
                </>
              }
              childStyles="md:text-5xl sm:text-2xl xs:text-xl text-left"
              parentStyle="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
              show
            />

            {!isLoading ? (
              <>
                <div>
                  <div className="flex w-full justify-between">
                    <h1 className="font-poppins   text-4xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
                      Best Creators
                    </h1>
                    <NFTButton
                      btnName="create NFT"
                      btnType="primary"
                      classStyles="text-[23px] text-xl rounded-xl"
                      handleClick={() => onClick("create-nft")}
                    />
                  </div>

                  <div
                    className="relative flex-1 max-w-full flex mt-3"
                    ref={parentRef}
                  >
                    <div
                      className="flex flex-row w-full overflow-x-scroll no-scrollbar select-none"
                      ref={scrollRef}
                    >
                      {creators.map((creator, i) => (
                        <CreatorCard
                          key={creator.seller}
                          rank={i + 1}
                          creatorImage={images[`creator${i + 1}`]}
                          creatorName={shortenAddress(creator.seller)}
                          creatorEths={creator.sumall}
                        />
                      ))}
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                        .slice(creators.length, 10)
                        .map((i) => (
                          <CreatorCard
                            key={`creator-${i}`}
                            rank={i}
                            creatorImage={images[`creator${i}`]}
                            creatorName={`0x${makeid(3)}...${makeid(4)}`}
                            creatorEths={10 - i * 0.534}
                          />
                        ))}
                      {!hideButtons && (
                        <div className="w-full justify-center items-center text-center flex">
                          <div
                            onClick={() => handleScroll("left")}
                            className="absolute  h-12 w-12 minlg:h-12 cursor-pointer left-0"
                          >
                            <Image
                              src={images.left}
                              layout="fill"
                              objectFit="contain"
                              alt="left_arrow"
                            />
                          </div>
                          <div
                            onClick={() => handleScroll("right")}
                            className="absolute h-12 w-12 minlg:h-12 cursor-pointer right-0"
                          >
                            <Image
                              src={images.right}
                              layout="fill"
                              objectFit="contain"
                              alt="left_arrow"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <div className="flexBetween justify-between flex mx-8 xs:mx-0 minlg:mx-8 sm:items-start">
                    <h1 className="flex-1 font-poppins text-4xl minlg:text-4xl font-semibold sm:mb-4">
                      Hot Bids
                    </h1>

                    <div className="flex-2 sm:w-[80%] flex flex-row">
                      <SearchBar
                        activeSelect={activeSelect}
                        setActiveSelect={setActiveSelect}
                        handleSearch={onHandleSearch}
                        clearSearch={onClearSearch}
                      />
                    </div>
                  </div>
                  <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                    {nfts.map((nft) => (
                      <NFTCard key={nft?.tokenId} nft={nft} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-20">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </Box>
    </>
  );
};

export default NFT;
