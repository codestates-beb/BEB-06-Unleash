// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MyToken is ERC1155, Ownable, AccessControl,EIP712 {
    using ECDSA for bytes32;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 ownerprice;

    constructor() 
        ERC1155("ipfs://QmYUhWW2eTq6EbEaR4YFEWpHQYVQe3331fhCKDpDdf65H1/{id}.json")
        EIP712("LazyNFT-Voucher", "1") {
        _setupRole(MINTER_ROLE, msg.sender);
    }
    struct NFTVoucher{
        uint256 tokenId;
        uint256 Price;
    }
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
    function mint(address account,uint256 amount,
                NFTVoucher calldata voucher, bytes memory signature)
        public payable returns (uint256)
    {
        address signer = _verify(voucher, signature);
        require(hasRole(MINTER_ROLE,signer),"Signature invalid or unauthorized");
        require(msg.value >= voucher.Price * amount);
        _mint(signer, voucher.tokenId, amount, "");
        _safeTransferFrom(signer,account,voucher.tokenId,amount,"");
        ownerprice+=msg.value;
        return voucher.tokenId;
    }
    function _hash(NFTVoucher calldata voucher) public view returns (bytes32) {
        return _hashTypedDataV4(keccak256(abi.encode(
            keccak256("NFTVoucher(uint256 tokenId,uint256 Price)"),
            voucher.tokenId,
            voucher.Price
        )));
    }
    function _verify(NFTVoucher calldata voucher, bytes memory signature) public view returns (address) {
        bytes32 digest = _hash(voucher);
        return digest.toEthSignedMessageHash().recover(signature);
    }
    
    function withdraw() public {
    require(hasRole(MINTER_ROLE, msg.sender), "Only authorized minters can withdraw"); 
        address payable receiver = payable(msg.sender);
        uint amount = ownerprice;
        ownerprice = 0;
        receiver.transfer(amount);
  }
    function viewownerprice() public view returns (uint256){
        return ownerprice;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override (AccessControl, ERC1155) returns (bool) {
        return ERC1155.supportsInterface(interfaceId) || AccessControl.supportsInterface(interfaceId);
  }
  
}