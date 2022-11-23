import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Get Last Block';
  
  lastBlockNumber: number | undefined;
  clicks = 0;
  constructor() {
    this.lastBlockNumber = 645645;
    ethers
      .getDefaultProvider("goerli")
      .getBlock("lastest")
      .then((block) => this.lastBlockNumber = block.number);
  }

  countClick(increment: string){
    this.clicks += parseFloat(increment);
  }
}
