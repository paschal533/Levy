﻿# LEVY

Levy is a social financial management application on Gnosis. Users create an account and sign in with their Web2 social credentials, such as Gmail or Twitter, through Gelato and Web3Auth. They can view current token prices on the market, and buy crypto with a credit card through Stripe. Users can search for their peers and add them to a group chat via Safe where they can communicate in real time (thanks to XMTP), on-ramp and manage funds together, including swapping tokens from their treasury through CoW Swap. Users can also create and collect NFTs. Balances are displayed in the native token, xDAI, which conveniently allows users to interface with the dollar value of their assets. DAO without even thinking about it. Use Levy. 

# 🛠 Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (NextJs & Unit Testing)
- Ethers JS (Blockchain Interaction)
- Hardhat (Smart Contract Development Framework)
- Gnosis Chain (Blockchain network)
- Gnosis Safe (DAO Safe)
- XMTP (Web3 Messaging)
- Stripe (Gateway payment with credit card)
- Gelato && Web3Auth (Social media Authentication)
- Express & Apollo (Backend server)
- MongoDB (DataBase)

# ⛓ Blockchain Protocol used

- ERC-720 standard
- ERC-721 standard

# ⚙ Requirements For Initial Setup
- Install NodeJS, should work with any node version below 18.12.1
- Install Hardhat in your terminal. You can check to see if you have hardhat by running `npx hardhat`. To install hardhat, run `npm install --save-dev hardhat`.

# 🚀 Quick Start

📄 Clone or fork Levy:

```
https://github.com/paschal533/Levy.git
```

- Install all the dependencies in the frontend, smart-contract and backend. And Add all the required environmental varriables.

# 🛠 Test the Smart-contract:

change to the smart contract directory

```
cd smart-contract
```

Then run

```
npx hardhat test
```

# 🎗 Compile the Smart-contract:

```
npx hardhat compile
```
# 🔗 Deploy the Smart-contract:

```
npx hardhat run --network chiado scripts/deploy.js
```

# 📄 interacting with the Frontend

```
cd frontend

npm install
```

# 🚴‍♂️ Run the App:

```
npm run dev
```

- Note :- The smart contract of this app was deployed to Gnosis (Chiado) testnet.

# 📄 Smart-contract address

```
0x82761803b0AF78638Ec18f9b2F24b4811d01d235
```

# 📜 Chiado Explorer

- Verified

```
https://blockscout.com/gnosis/chiado/address/0x82761803b0AF78638Ec18f9b2F24b4811d01d235
```
