// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Unleash is ERC1155Supply, Ownable, AccessControl,EIP712 {
    using ECDSA for bytes32;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 ownerprice;
    uint256 toWei = 1000000000000000;

    constructor() 
        ERC1155("")
        EIP712("LazyNFT-Voucher", "1") {
        _setupRole(MINTER_ROLE, msg.sender);
    }

    struct NFTVoucher{
        uint256 tokenId;
        uint256 Price;
        uint256 totalSupply;
    }  
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
    function mint(address account, uint256 amount,
                NFTVoucher calldata voucher, bytes memory signature)
        public payable returns (uint256)
    {
        address signer = _verify(voucher, signature);
        require(hasRole(MINTER_ROLE,signer),"Signature invalid or unauthorized");
        require(msg.value == voucher.Price * amount * toWei);
        require(totalSupply(voucher.tokenId) + amount <= voucher.totalSupply);
        _mint(signer, voucher.tokenId, amount, "");
        _safeTransferFrom(signer,account,voucher.tokenId,amount,"");
        ownerprice+=msg.value;
        return voucher.tokenId;
    }

    function mintBatch(address account, uint256[] memory amounts, 
                NFTVoucher[] calldata voucher, bytes[] memory signature) 
        public payable 
        // returns (uint256) 
    { 
        uint totalValue; 
        
        uint256[] memory tokenList = new uint256[](amounts.length);
        address signer;

        for (uint i = 0; i < amounts.length; i++) { 
            require(totalSupply(voucher[i].tokenId) + amounts[i] <= voucher[i].totalSupply); 
            totalValue += voucher[i].Price*amounts[i]; 
            tokenList[i] = voucher[i].tokenId;
            signer = _verify(voucher[i], signature[i]); 
            require(hasRole(MINTER_ROLE,signer),"Signature invalid or unauthorized"); 
        } 
        totalValue *= toWei;
        require(msg.value == totalValue); 
        _mintBatch(signer, tokenList, amounts, ""); 
        _safeBatchTransferFrom(signer,account,tokenList,amounts,""); 
    
        ownerprice+=msg.value;
        // return voucher.tokenId; 
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
    require(ownerprice > 0);
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

// _verify 사용시에는 signature의 값을 따옴표 없이 이용해야함

// example params

// account : 0x7228C233138c3fef3119a04cf5Ce71cD11Ff9ea5
// amounts : [1,0]
// voucher : [["1","1966","300"],["2","1966","300"]] 
// signature : ["0xdb207cf1e9931ea52e5c579220167e6e3e9cdad42dac103724ff4dc6be1ddd252091e0709bc44622baffa7dff0e2d1a2cdbb865956a30162ed38a13040b417321b","0xcc71785caaf6f45c8e820cbfb9623df6106cecec3ec04357dfeca51a4198d8016c27bf14c0f7f642f0ad807dd4fd86cb536f21d2a5321477022f7bd8809a59591b"]


