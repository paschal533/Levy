const Input = ({ inputType, title, placeholder, handleClick }: any) => {
  const nftCurrency = "xDAI";

  return (
    <div className="mt-10 w-full">
      <p className="font-poppins text-white font-semibold text-xl">{title}</p>

      {inputType === "number" ? (
        <div className="bg-nft-black-1  border border-nft-black-1 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row">
          <input
            type="number"
            className="flex-1 w-full bg-nft-black-1 outline-none "
            placeholder={placeholder}
            onChange={handleClick}
          />
          <p className="font-poppins text-white  font-semibold text-xl">
            {nftCurrency}
          </p>
        </div>
      ) : inputType === "textarea" ? (
        <textarea
          rows={10}
          className="bg-nft-black-1 border border-nft-black-1 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          placeholder={placeholder}
          onChange={handleClick}
        />
      ) : (
        <input
          className="bg-nft-black-1 border border-nft-black-1 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          placeholder={placeholder}
          onChange={handleClick}
        />
      )}
    </div>
  );
};

export default Input;
