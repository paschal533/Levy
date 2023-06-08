import { useContext, useEffect, useState, useCallback } from "react";
import { FetchContext } from "@/context/FetchContext";
import btc from "../../assets/btc.png";
import CMCtableHeader from "./cmcTableHeader";
import CMCtableRow from "./cmcTableRow";
import { Skeleton, Stack } from "@chakra-ui/react";

const CMCtable = () => {
  const { topTenTokens, loadingData } = useContext(FetchContext);
  let [coinData, setCoinData] = useState([]);

  useEffect(() => {
    if (loadingData == false) {
      setCoinData(topTenTokens);
    }
  }, [loadingData]);

  /*const setData = useCallback(async () => {
    try {
       const data = await queryTopTenCrypto();
       setCoinData(data)
    } catch (e) {
      console.log(e.message)
    }
  }, [])*/

  return (
    <div className="text-white font-bold pl-5 pr-5 mb-20">
      <div className="mx-auto max-w-screen-2xl">
        <table className="w-full">
          <CMCtableHeader />

          {loadingData == false && coinData ? (
            coinData.map((coin, index) => {
              return (
                <CMCtableRow
                  key={index}
                  starNum={coin.cmc_rank}
                  coinName={coin.name}
                  coinSymbol={coin.symbol}
                  coinIcon={btc}
                  showBuy={true}
                  hRate={coin.quote.USD.percent_change_24h}
                  dRate={coin.quote.USD.percent_change_7d}
                  hRateIsIncrement={true}
                  price={coin.quote.USD.price}
                  marketCapValue={coin.quote.USD.market_cap}
                  volumeCryptoValue={coin.quote.USD.volume_24h}
                  volumeValue={coin.total_supply}
                  circulatingSupply={coin.circulating_supply}
                />
              );
            })
          ) : (
            <></>
          )}
        </table>
      </div>
    </div>
  );
};

export default CMCtable;
