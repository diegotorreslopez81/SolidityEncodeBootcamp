import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { allowedNodeEnvironmentFlags } from "process";
import { TokenSale, TokenSale__factory } from "../typechain-types";
import { token } from "../typechain-types/@openzeppelin/contracts";
import { MyERC20__factory } from "../typechain-types/factories/contracts/MyERC20__factory";

const TOKEN_ETH_RATIO = 1;

describe("NFT Shop", async () => {
  // deploy
  let  accounts: SignerWithAddress[];
  let tokenSaleContract: TokenSale;
  let paymentTokenContract: MyERC20Token;
  let nftContract: MyERC721Token;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const tokenSaleContractFactory = new TokenSale__factory(accounts[0]);
    tokenSaleContract = await tokenSaleContractFactory.deploy(TOKEN_ETH_RATIO, ethers.constants.AddressZero);
    await tokenSaleContract.deployed();
  });

  describe("When the Shop contract is deployed", async () => {
    it("defines the ratio as provided in parameters", async () => {
      
      const ratio = await tokenSaleContract.ratio();
      expect(ratio).to.eq(TOKEN_ETH_RATIO);
      // throw new Error("Not implemented");
  });

    it("uses a valid ERC20 as payment token", async () => {
      const erc20TokenAddress = await tokenSaleContract.paymentToken();
      const erc20TokenFactory = new MyERC20__factory(accounts[0]);
      const erc20TokenContract = erc20TokenFactory.attach(erc20TokenAddress);
      await expect (erc20TokenContract.totalSupply()).not.to.reverted;
      await expect (erc20TokenContract.balanceOf(accounts[0].address)).not.to.reverted;
      // throw new Error("Not implemented");
    });
  });

  describe("When a user purchase an ERC20 from the Token contract", async () => {
    const ETH_SENT = parseEther("1");
    beforeEach(async () => {
      const tx = await tokenSaleContract.purchaseTokens({
        value: ETH_SENT,         
      });
      await tx.wait();
      const contractBalance = await ethers.provider.getBalance(tokenSaleContract.address);
      console.log(contractBalance);
    });

    it("charges the correct amount of ETH", async () => {
      const balanceAfter = await accounts[1].getBalance();
      const balanceBefore = 
      
      throw new Error("Not implemented");
    });

    it("gives the correct amount of tokens", async () => {
      throw new Error("Not implemented");
    });
  });

  

  describe("When a user burns an ERC20 at the Token contract", async () => {
    let gasCost: BigNumber;
    beforeEach(async () => {
      const allowTx = await paymentTokenContract.approve(
        tokenSaleContract.address,
        ETH_SENT.div(TOKEN_ETH_RATIO)        
      );
      const receiptAllow = await allowTx.wait();
      const gasUsageAllow = receiptAllow.gasUsed;
      const gasPriceAllow = receiptAllow.effectiveGasPrive;

      const burnTx = await tokenSaleContract.connect(accounts[1]).burnTokens(
        ETH_SENT.div(TOKEN_ETH_RATIO)
      );
      const receiptBurn = await burnTx.wait();

      // const tx = await paymentTokenContract.transfer(
      //   tokenSaleContract.address,
      //   ETH_SENT.div(TOKEN_ETH_RATIO)
      // );
      // await tx.wait();
      // const balanceAfter = paymentTokenContract.balanceOf(tokenSaleContract.address);
      // console.log(balanceAfter);
    });

    it("gives the correct amount of ETH", async () => {
      const balanceAfterBurn
      throw new Error("Not implemented");
    });

    it("burns the correct amount of tokens", async () => {
      const balanceBN = await paymentTokenContract.
      throw new Error("Not implemented");
    });
  });

  describe("When a user purchase a NFT from the Shop contract", async () => {
    const NFT_ID = 42;
    let TokenBalanceBefore: BigNumber;

    beforeEach(async () => {
      TokenBalanceBefore = await paymentTokenContract.balanceOf(accounts[1].address);


      const allowTx = await paymentTokenContract.connect(accounts[1]).approve(tokenSaleContract.address, NFT_PRICE);
      await allowTx.wait();
      const purchaseTx = await tokenSaleContract.purchaseNFT(NFT_ID);
      await purchaseTx.wait();

    });


    it("charges the correct amount of ETH", async () => {
      const TokenBalanceAfter = await paymentTokenContract.balanceOf(accounts[1].address); 
      const expectedTokenBalanceAfter = TokenBalanceBefore.sub(NFT_PRICE);
      expect(TokenBalanceAfter).to.eq(expectedTokenBalanceAfter);
      // throw new Error("Not implemented");
    });
    it("give the right NFT", async () => {
      const nftOwner = await nftContract.ownerOf(NFT_ID);
      

      // throw new Error("Not implemented");
    });

    it("updates the owner account correctly", async () => {
      throw new Error("Not implemented");
    });

    it("update the pool account correctly", async () => {
      throw new Error("Not implemented");
    });

    it("favors the pool with the rounding", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When a user burns their NFT at the Shop contract", async () => {
    it("gives the correct amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    });
    it("updates the pool correctly", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When the owner withdraw from the Shop contract", async () => {
    it("recovers the right amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    });

    it("updates the owner account correctly", async () => {
      throw new Error("Not implemented");
    });
  });
});