const { expect } = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");
const chai = require("chai");

chai.use(solidity);

const PRICE = 10000;

describe("Greeter", async function () {
  let deal, issuer, participant;

  beforeEach(async () => {
    const [_deployer, _participant] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", _deployer.address);

    console.log("Account balance:", (await _deployer.getBalance()).toString());

    const PrivateDeal = await hre.ethers.getContractFactory("PrivateDeal");
    const privateDeal = await PrivateDeal.deploy(_participant.address, PRICE, 'test', 'test')

    console.log("Greeter deployed to:", privateDeal.address);

    deal = privateDeal;
    issuer = _deployer;
    participant = _participant;
  })

  it("It checks that contract successfully initialized", async function () {
    expect(await deal.price()).to.equal(PRICE);
  });

  it("It checks that contract receive value from participants", async function () {
    const tx = await participant.sendTransaction({
      to: deal.address,
      value: ethers.BigNumber.from(PRICE),
    });

    console.log(await deal.payed());
    expect(await deal.payed()).to.equal(PRICE);
  });


  it("It checks that contract can approve", async function () {
    const tx = await participant.sendTransaction({
      to: deal.address,
      value: ethers.BigNumber.from(PRICE),
    });

    const dealParticipant = deal.connect(participant)

    await dealParticipant.approve('test', 'test');

    expect(await dealParticipant.approvedByParticipant()).to.equal(true);
  });


  it("It checks that cannot approve twice", async function () {
    const tx = await participant.sendTransaction({
      to: deal.address,
      value: ethers.BigNumber.from(PRICE),
    });

    const dealParticipant = deal.connect(participant)

    await dealParticipant.approve('test', 'test');

    expect(dealParticipant.approve('test', 'test'))
      .to.be.revertedWith('Deal has been approved')
  });
});
