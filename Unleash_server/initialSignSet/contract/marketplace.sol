// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./Unleash.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
contract Marketplace is ERC1155Holder,Ownable  {
    Unleash unleash;
    uint256 public offerCount;
    uint private _feePercent = 25;
    uint private constant INVERSE_BASIS_POINT = 1000;

    mapping(uint => _Offer) public offers;
    mapping(address => uint256) userFunds;


    constructor(address _unleash)
    {
        unleash = Unleash(_unleash);
    }

    struct _Offer{
        uint256 offerId;
        uint256 tokenId;
        uint256 price;
        uint256 amount;
        address seller;
    }

    event Offer(uint256 offerId, uint256 tokenId, uint256 price, uint256 amount, address seller);

    function sell(uint256 _id, uint256 _price, uint256 _amount) public {
        unleash.safeTransferFrom(msg.sender,address(this),_id,_amount,"");
        offerCount ++;
        offers[offerCount] = _Offer(offerCount, _id, _price, _amount, msg.sender);
        emit Offer(offerCount, _id, _price, _amount, msg.sender);
    }

    function buy(uint256 _offerId,uint256 amount) public payable{
        _Offer storage _offer = offers[_offerId];
        require(_offer.offerId == _offerId);
        require(_offer.amount != 0 || _offer.amount >= amount);
        require(_offer.seller != msg.sender);
        require(msg.value == _offer.price * amount);
        unleash.safeTransferFrom(address(this),msg.sender,_offer.tokenId,amount,"");
        _offer.amount -= amount;
        uint requireAmount = SafeMath.div(SafeMath.mul(_feePercent,msg.value),INVERSE_BASIS_POINT);
        uint receiveAmount = SafeMath.sub(msg.value,requireAmount);
        userFunds[_offer.seller] += receiveAmount;
        userFunds[owner()] += requireAmount;
        emit Offer(_offer.offerId, _offer.tokenId, _offer.price, _offer.amount, _offer.seller);
    }

    function cancel(uint _offerId) public {
        _Offer storage _offer = offers[_offerId];
        require(_offer.offerId == _offerId);
        require(_offer.seller == msg.sender);
        require(_offer.amount != 0);
        unleash.safeTransferFrom(address(this), msg.sender, _offer.tokenId, _offer.amount,"");
        emit Offer(_offer.offerId, _offer.tokenId, _offer.price, _offer.amount, _offer.seller);
    }

    function withdraw() public{
        require(userFunds[msg.sender] > 0);
        uint price = userFunds[msg.sender];
        userFunds[msg.sender] = 0;
        payable(msg.sender).transfer(price);  
    }

}