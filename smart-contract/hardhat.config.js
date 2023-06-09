const fs = require("fs");
//require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan"); 
require("@nomicfoundation/hardhat-toolbox");

const dotenv = require("dotenv");

dotenv.config();


module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    gnosis: {
      url: "https://rpc.gnosischain.com",
      accounts: [process.env.PRIVATE_KEY],
    },
    chiado: {
      url: process.env.CHIADO_RPC_URL, //Chiado RPC url
      gasPrice: 1000000000,
      accounts: [process.env.PRIVATE_KEY], // add the account that will deploy the contract (private key)
    },
    linea: {
      url: `https://rpc.goerli.linea.build/`,
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  etherscan: {
    customChains: [
      {
        network: "chiado",
        chainId: 10200,
        urls: {
          //Blockscout
          apiURL: "https://blockscout.com/gnosis/chiado/api",
          browserURL: "https://blockscout.com/gnosis/chiado",
        },
      },
       
    ],
    apiKey: {
      //4) Insert your Gnosisscan API key
      //blockscout explorer verification does not require keys
      chiado: process.env.API_KEY,
    },
  }
};

