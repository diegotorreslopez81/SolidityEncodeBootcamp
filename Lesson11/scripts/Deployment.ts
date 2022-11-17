import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { MyERC20__factory } from "../typechain-types";
dotenv.config();

async function main() {
    const accounts = await ethers.getSigners();
    const erc20TokenFactory = new MyERC20__factory(accounts[0]);
    const erc20TokenContract = await erc20TokenFactory.deploy(100000000);
    await erc20TokenContract.deployed();
    console.log(`Contract deployed at address ${erc20TokenContract.address}`);
    const totalSupply = await erc20TokenContract.totalSupply();
    console.log(`Contract deployed has a Total Supply of ${totalSupply}`);
    const balanceOfAccoount0 = await erc20TokenContract.balanceOf(accounts[0].address);
    console.log(`The balance of Account 0 is ${balanceOfAccoount0}`);
    const transferTx = await erc20TokenContract.transfer(accounts[1].address, 100);

    await transferTx.wait();

    const balanceOfAccoount1 = await erc20TokenContract.balanceOf(accounts[1].address);
    const balanceOfAccoount0afterTx = await erc20TokenContract.balanceOf(accounts[0].address);
    console.log(`The balance of Account 1 is ${balanceOfAccoount1}`);
    console.log(`The balance of Account 0 is ${balanceOfAccoount0afterTx}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});