const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const DealFactory = await ethers.getContractFactory("DealFactory");
  console.log("DealFactory");
  const dealFactory = await DealFactory.deploy();

  await dealFactory.deployed();

  console.log("Notary deployed to:", dealFactory.address); 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 
