// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./openzeppelin/token/ERC721/IERC721.sol";
import "./openzeppelin/access/Ownable.sol";

contract NFTMarketplace is Ownable {
    struct Listing {
        address owner;
        uint256 price;
        bool isActive;
    }

    mapping(uint256 => Listing) private _listings;

    IERC721 private _nftContract;

    event NFTDeposited(uint256 indexed tokenId, address indexed owner);
    event TokenListed(uint256 indexed tokenId, uint256 price);
    event TokenSold(uint256 indexed tokenId, uint256 price, address indexed seller, address indexed buyer);

    constructor(address nftContractAddress) {
        _nftContract = IERC721(nftContractAddress);
    }

    // Deposit NFT into marketplace
    function depositNFT(uint256 tokenId) external {
        require(_nftContract.ownerOf(tokenId) == msg.sender, "You do not own this token");
        _nftContract.transferFrom(msg.sender, address(this), tokenId);
        _listings[tokenId] = Listing(msg.sender, 0, false);
        emit NFTDeposited(tokenId, msg.sender);
    }

    // List token for sale
    function listTokenForSale(uint256 tokenId, uint256 price) external {
        require(_listings[tokenId].owner == msg.sender, "You do not own this token");
        _listings[tokenId].price = price;
        _listings[tokenId].isActive = true;
        emit TokenListed(tokenId, price);
    }

    // Buy token from marketplace
    function buyTokenFromMarketplace(uint256 tokenId) external payable {
        Listing storage listing = _listings[tokenId];
        require(listing.isActive, "Token is not listed for sale");
        require(msg.value >= listing.price, "Insufficient funds");

        address payable seller = payable(listing.owner);
        seller.transfer(msg.value);

        _nftContract.transferFrom(address(this), msg.sender, tokenId);
        listing.isActive = false;

        emit TokenSold(tokenId, listing.price, seller, msg.sender);
    }
}
