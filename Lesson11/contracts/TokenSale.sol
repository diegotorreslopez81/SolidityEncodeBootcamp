// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

interface IMyERC20Token {
    function mint(address to, uint256 amount) external;
    function burnFrom(address account, uint256 amount) external;
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external;

}

interface IMyERC721Token {
     function safeMint(address to, uint256 tokenId) external;
}

contract TokenSale {
    uint256 public ratio;
    uint256 public price;
    uint256 ownerPool;
    uint256 publicPool;
    IMyERC20Token public paymentToken;
    IMyERC721Token public nftContract;

    constructor(uint256 _ratio, address _paymentToken, address _nftContract, uint256 _price) {
        ratio = _ratio;
        price = _price;
        paymentToken = IMyERC20Token(_paymentToken);
        nftContract = IMyERC721Token(_nftContract);
    }

    function purchaseTokens() external  payable {
        uint256 amountToBeMinted = msg.value / ratio;
        paymentToken.mint(msg.sender, amountToBeMinted);
    }

    function burnTokens(uint256 amount) external {
        paymentToken.burnFrom(msg.sender, amount);
        payable(msg.sender).transfer(amount * ratio);
    }

    function purchaseNFT(uint256 tokenId) external {
        paymentToken.transferFrom(msg.sender, address(this), price);
        nftContract.safeMint(msg.sender, tokenId);
        ownerPool += price / 2;
        publicPool += price - ownerPool;
    }

}