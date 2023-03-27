const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("NFTMarketplace test", () => {
  let nFTMarketPlace, deployer, receiver;

  beforeEach(async () => {
    const NFTMarketPlace = await ethers.getContractFactory("NFTMarketplace");
    nFTMarketPlace = await NFTMarketPlace.deploy();
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    receiver = accounts[1];
  });

  it("updates listing price", async () => {
    await nFTMarketPlace.updateListingPrice(tokens(3));
    const listingPrice = await nFTMarketPlace.getListingPrice();
    expect(tokens(3)).to.equal(listingPrice.toString());
  });

  it("creates market token", async () => {
    await nFTMarketPlace.createToken("https:nftkastle.com", "20", {
      value: tokens(0.025),
    });
    const currentTokenID = await nFTMarketPlace.tokenID();
    expect("1").to.equal(currentTokenID.toString());
  });

  describe("Selling and Buying Token", () => {
    it("creates Market Sale", async () => {
      await nFTMarketPlace.createToken("https:nftkastle.com", "20", {
        value: tokens(0.025),
      });
      let price = await nFTMarketPlace.getPrice(1);
      let transaction = await nFTMarketPlace
        .connect(receiver)
        .createMarketSale(1, { value: price.toString() });
      let result = transaction.wait();

      let owner = await nFTMarketPlace.getOwner(1);

      expect(owner).to.equal(receiver.address);
    });

    it("Resells token", async () => {
      await nFTMarketPlace.createToken("https:nftkastle.com", "20", {
        value: tokens(0.025),
      });
      let price = await nFTMarketPlace.getPrice(1);
      let transaction = await nFTMarketPlace
        .connect(receiver)
        .createMarketSale(1, { value: price.toString() });
      let result = transaction.wait();

      await nFTMarketPlace
        .connect(receiver)
        .resellToken(1, tokens(30), { value: tokens(0.025) });

      let UpdatedPrice = await nFTMarketPlace.getPrice(1);
      expect(UpdatedPrice.toString()).to.equal(tokens(30));
    });
  });

  describe("Fetching items", () => {
    it("fetches Market Items", async () => {
      await nFTMarketPlace.createToken("https:nftkastle.com", "20", {
        value: tokens(0.025),
      });
      let res = await nFTMarketPlace.fetchMarketItems();

      expect(res.length).to.equal(1);
    });

    it("fetches Items listed", async () => {
      await nFTMarketPlace.createToken("https:nftkastle.com", "20", {
        value: tokens(0.025),
      });
      let res = await nFTMarketPlace.fetchItemsListed();

      expect(res.length).to.equal(1);
    });
  });
});
