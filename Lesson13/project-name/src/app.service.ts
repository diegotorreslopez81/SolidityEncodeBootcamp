import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class AppService {
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
}
