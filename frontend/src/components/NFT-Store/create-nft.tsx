//@ts-nocheck 
import { useState, useMemo, useCallback, useContext } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useTheme } from "next-themes";
import { AuthContext } from "@/context/AuthContext";

import { FetchContext } from '../../context/FetchContext';
import NFTButton from "./NFTButton"
import NFTInput from "./NFTInput"
import Loader from "./Loader";
import images from "../../../assets";
import { Box, Flex, Text } from "@chakra-ui/react";

const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET;
const projectIdAndSecret = `${projectId}:${projectSecret}`;

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
      "base64"
    )}`,
  },
});

const CreateItem = () => {
  const { provider, login } = useContext(AuthContext);
  const { createSale, isLoadingNFT } = useContext(FetchContext)
  const [fileUrl, setFileUrl] = useState<string>("");
  const { theme } = useTheme();

  const uploadToInfura = async (file : any) => {
    try {
      const added = await client.add({ content: file });

      const url = `https://levy.infura-ipfs.io/ipfs/${added.path}`;

      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const onDrop = useCallback(async (acceptedFile : any) => {
    await uploadToInfura(acceptedFile[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  // add tailwind classes acording to the file status
  const fileStyle = useMemo(
    () =>
      `bg-nft-black-1 border border-black flex flex-col items-center p-5 rounded-sm border-dashed  
       ${isDragActive ? " border-file-active " : ""} 
       ${isDragAccept ? " border-file-accept " : ""} 
       ${isDragReject ? " border-file-reject " : ""}`,
    [isDragActive, isDragReject, isDragAccept]
  );

  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const router = useRouter();

  const createMarket = async () => {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({ name, description, image: fileUrl });
    try {
      const added = await client.add(data);
      const url = `https://levy.infura-ipfs.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      await createSale(url, formInput.price);
      router.push('/')
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };


  if (isLoadingNFT) {
    return (
      <div className="flexCenter justify-center text-center w-full" style={{ height: "51vh" }}>
        <Flex flexDirection="column">
        <Loader />
        <Text>Creating your NFT...</Text>
        </Flex>
      </div>
    );
  }

  return (
      <Box   overflowY="scroll"  height="100vh" className="flex w-full align-middle items-center justify-center">
        <Box  height="100%" className=" pt-6 pb-6 mb-8 w-[700px] ">
          <h1 className="font-poppins text-white font-semibold text-2xl">
            Create new item
          </h1>

          <div className="mt-16">
            <p className="font-poppins text-white font-semibold text-xl">
              Upload file
            </p>
            <div className="mt-4 ">
              <div {...getRootProps()} className={fileStyle}>
                <input {...getInputProps()} />
                <div className="flexCenter flex-col text-center">
                  <p className="font-poppins text-white font-semibold text-xl">
                    JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.
                  </p>

                  <div className="my-12 w-full flex justify-center">
                    <Image
                      src={images.upload}
                      width={100}
                      height={100}
                      objectFit="contain"
                      alt="file upload"
                    />
                  </div>

                  <p className="font-poppins text-white  font-semibold text-sm">
                    Drag and Drop File
                  </p>
                  <p className="font-poppins text-white  font-semibold text-sm mt-2">
                    Or browse media on your device
                  </p>
                </div>
              </div>
              {fileUrl && (
                <aside>
                  <div>
                    <img src={fileUrl} alt="Asset_file" />
                  </div>
                </aside>
              )}
            </div>
          </div>

          <NFTInput
            inputType="input"
            title="Name"
            placeholder="Asset Name"
            handleClick={(e : any) =>
              updateFormInput({ ...formInput, name: e.target.value })
            }
          />

          <NFTInput
            inputType="textarea"
            title="Description"
            placeholder="Asset Description"
            handleClick={(e : any) =>
              updateFormInput({ ...formInput, description: e.target.value })
            }
          />

          <NFTInput
            inputType="number"
            title="Price"
            placeholder="Asset Price"
            handleClick={(e : any) =>
              updateFormInput({ ...formInput, price: e.target.value })
            }
          />

          <div className="mt-7 w-full flex justify-end">
            {provider ? (
              <NFTButton
                btnName="Create Item"
                btnType="primary"
                classStyles="rounded-xl"
                handleClick={createMarket}
              />
            ) : (
              <NFTButton
                btnName="Login"
                btnType="primary"
                classStyles="rounded-xl"
                handleClick={login}
              />
            )}
          </div>
        </Box>
      </Box>
  );
};

export default CreateItem;
