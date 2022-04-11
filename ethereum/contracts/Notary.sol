//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IDeal {
    function approve(string memory _gistId, string memory _gistHash) external;
}

contract DealFactory {
    //создаёт и хранит разные виды сделок
    address[] deals;

    function issue(
        address[] memory _participants,
        uint256 _price,
        string memory _gistId,
        string memory _gistHash
    ) external {
        if (_participants.length == 1) {
            IDeal deal = new PrivateDeal(
                _participants[0],
                _price,
                _gistId,
                _gistHash
            );

            deals.push(address(deal));
        } else {
            // TODO
        }
    }

    function issuedDeals() public view returns (address[] memory) {
        return deals;
    }
}

contract PrivateDeal is IDeal {
    // создаёт прииватную сделку. для это нужен адрес билдера, адрес покупателя, цена, id и хэш гиста
    address issuer;
    address participant;

    uint256 public price;

    bytes32 gistId;
    bytes32 gistHash;

    uint256 public payed;

    bool public approvedByParticipant;

    constructor(
        address _participant,
        uint256 _price,
        string memory _gistId,
        string memory _gistHash
    ) {
        require(_participant != address(0), "GistId is not equals");

        issuer = msg.sender;
        participant = _participant;
        price = _price;
        gistId = keccak256(abi.encodePacked(_gistId));
        gistHash = keccak256(abi.encodePacked(_gistHash));
    }

    function approve(string memory _gistId, string memory _gistHash)
        external
        override
        onlyParticipant
    {
        require(
            gistId == keccak256(abi.encodePacked(_gistId)),
            "GistId is not equals"
        );
        require(
            gistHash == keccak256(abi.encodePacked(_gistHash)),
            "GistHash is not equals"
        );

        require(approvedByParticipant != true, "Deal has been approved");
        require(payed == price, "Deal hasn`t been paid");

        payable(issuer).transfer(payed);
        approvedByParticipant = true;
    }

    receive() external payable onlyParticipant {
        require(price == msg.value, "You should pay exact value of deal");

        payed = msg.value;
    }

    modifier onlyParticipant() {
        require(
            participant == msg.sender,
            "Only Participant: caller is not the participant"
        );
        _;
    }
}
