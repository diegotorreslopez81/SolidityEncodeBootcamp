import { Get } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as tokenJson from './assets/MyToken.json';

export class PaymentOrderModel {
  id: number;
  secret: string;
  value: number;
}

@Injectable()
export class AppService {
  provider: ethers.providers.Provider;
  paymentOrders: PaymentOrderModel[];
  constructor() {
    this.provider = ethers.getDefaultProvider('goerli');
    this.paymentOrders = [];
  }

  getLastBlock(): any {
    const provider = ethers.getDefaultProvider("goerli");
    console.log(provider.getBlock(provider.getBlockNumber()));
    return provider.getBlock(provider.getBlockNumber());
  }
  getAnother(): string {
    return 'Anooootheeerrrr!';
  }
  getHello(): string {
    return 'Hello World!';
  }

  getBlock(blockHashorBlockTag: string): Promise<ethers.providers.Block> {
    return ethers.getDefaultProvider("goerli").getBlock(blockHashorBlockTag);
  }


  async getTotalSupply(address: string) {
    const contract = new ethers.Contract(
      address, 
      tokenJson.abi, 
      this.provider
    );
    const bn = await contract.totalSupply();
    return ethers.utils.formatEther(bn);
  }

  async getAllowance(address: string, owner: string, spender: string) {
    const contract = new ethers.Contract(
      address, 
      tokenJson.abi, 
      this.provider
    );
    const bn = await contract.allowance(owner, spender);
    return ethers.utils.formatEther(bn);
  }  

  getPaymentOrder(id: string) {
    return this.paymentOrders[id];
  }

  createPaymentOrder(secret: string, value: number) {
    const newPaymentOrder = new PaymentOrderModel();
    newPaymentOrder.secret = secret;
    newPaymentOrder.value = value;
    newPaymentOrder.id = this.paymentOrders.length;
    this.paymentOrders.push(newPaymentOrder);
  }

  claimPaymentOrder(id: string, secret: string, address: string) {
    // TODO
    if(this.paymentOrders[id].secret != secret) throw new Error("Wrong Secret!");
    // Mint this.paymentOrders[id].value to address

  }
}
