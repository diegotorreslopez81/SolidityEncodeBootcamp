import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

export class createPaymentOrderDTO {
  id: number;
  secret: string;
  value: number;
}

export class claimPaymentOrderDTO {
  id: string;
  secret: string;
  address: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }  

  @Get("/last-block")
  getLastBlock() {
    return this.appService.getBlock("latest");
  }

  @Get("/block-by-hash/:hash")
  getBlockByHash(@Param('hash') hash: string) {
    return this.appService.getBlock(hash);
  }  

  @Get('total-supply/:address') 
  getTotalSupply(@Param('address') address: string){
    return this.appService.getTotalSupply(address);
  }

  @Get('allowance') 
  getAllowance(
    @Query('address') address: string,
    @Query('owner') owner: string,
    @Query('spender') spender: string,
  ){
    return this.appService.getAllowance(address, owner, spender);
  }  

  @Get("payment-order/:id")
  getPaymentOrder(@Param('id') id: string) {
    return this.appService.getPaymentOrder(id);
  }

  @Post("create-payment-order")
  createPaymentOrder(@Body() body: createPaymentOrderDTO) {
    return this.appService.createPaymentOrder(body.secret, body.value);
  }

  @Post("claim-payment-order")
  claimPaymentOrder(@Body() body: claimPaymentOrderDTO) {
    return this.appService.claimPaymentOrder(body.id, body.secret, body.address);
  }

}
