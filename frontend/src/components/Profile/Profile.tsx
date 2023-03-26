import { Button, useClipboard } from "@chakra-ui/react"
import Banner from "./Banner";
import Image from "next/image";
import { useContext } from 'react';
import { AuthContext } from "@/context/AuthContext";
import { MdOutlineAccountBalanceWallet, MdContentCopy } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";


const Profile = () => {
    const { userInfo, privateKey, currentAccount } = useContext(AuthContext);
    const { onCopy, value, setValue, hasCopied } = useClipboard(currentAccount);

    return (
        <div  className=" justify-center w-full items-center flex flex-col">
        <div className="w-full flexCenter flex-col">
             <Banner
                name="Your dashboard"
                childStyles="text-center mb-4"
                parentStyle="h-60 justify-center"
              />
              <div className="flexCenter flex-col -mt-20 z-0">
                <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 rounded-full">
                <Image src={userInfo.profileImage} height={200} width={200} alt="profile" className="rounded" />
                </div>
                <p className="font-poppins font-semibold text-2xl mt-3">
                    {userInfo?.name}
                </p>
                <p className="font-poppins font-semibold text-2xl mt-2">
                    {userInfo?.email}
                </p>
                </div>
                <div className=" justify-center mt-4 items-center flex flex-col w-full">
                    <div className="max-w-[1100px] w-full items-center drop-shadow-2xl">
                      <div className="w-full pl-10 pr-10">
                        <p className="font-poppins font-semibold text-xl">
                          Wallet Address
                        </p>
                        <div className="bg-nft-black-1 border border-nft-black-1 rounded-lg w-full outline-none font-poppins text-base mt-4 px-4 py-3 flexBetween flex-row">
                          <input
                            type="number"
                            className="flex-1 w-full bg-nft-black-1 outline-none"
                            value={currentAccount}
                            placeholder={currentAccount}
                            onChange={(e) => {
                              setValue(currentAccount);
                            }}
                          />
                          <p className="font-poppins  font-semibold text-xl">
                            <Button onClick={onCopy}>
                              {hasCopied ? <GrStatusGood className="text-white" /> : <MdContentCopy />}
                            </Button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
        </div>
        </div>
    )
}

export default Profile;