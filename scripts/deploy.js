const { ethers } = require("hardhat");


async function main() {
  const VotingContract = await ethers.getContractFactory("Election");
  const votingContract = await VotingContract.deploy();

  await votingContract.deployed();

  console.log("VotingContract deployed to:", votingContract.address);
  
 
  
}

main();
