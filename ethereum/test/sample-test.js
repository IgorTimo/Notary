const { expect } = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");
const chai = require("chai");

chai.use(solidity);

const PRICE = 10e14;

describe("PrivateDeal", async function () {
  let deal, issuer, participant;

  beforeEach(async () => {
    const [_deployer, _participant] = await ethers.getSigners();

    const PrivateDeal = await hre.ethers.getContractFactory("PrivateDeal");
    const privateDeal = await PrivateDeal.deploy(_participant.address, PRICE, 'test', 'test')

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

    expect(await deal.payed()).to.equal(PRICE);
  });


  it("It checks that contract can approve", async function () {
    const tx = await participant.sendTransaction({
      to: deal.address,
      value: ethers.BigNumber.from(PRICE),
    });

    const dealParticipant = deal.connect(participant)
    const balanceBefore = await issuer.getBalance();

    await dealParticipant.approve('test', 'test');

    expect(await dealParticipant.approvedByParticipant()).to.equal(true);

    const balanceAfter = await issuer.getBalance();

    expect(balanceAfter.sub(balanceBefore)).to.equal(PRICE);
  });


  it("It checks that cannot approve twice", async function () {
    const tx = await participant.sendTransaction({
      to: deal.address,
      value: ethers.BigNumber.from(PRICE)
    });

    const dealParticipant = deal.connect(participant)

    await dealParticipant.approve('test', 'test');

    expect(dealParticipant.approve('test', 'test'))
      .to.be.revertedWith('Deal has been approved')
  });
});
