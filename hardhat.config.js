/**
 * @type import('hardhat/config').HardhatUserConfig
 */


require('@nomiclabs/hardhat-ethers');



module.exports = {
  solidity: '0.8.0',
  networks: {
    hardhat: {
      chainId: 1337, // Hardhat Network chain ID
      gas: 120000000000,
      localhost: {
        url: "http://localhost:8545", // Update with your local Ethereum node URL
      },
    },
  },
};
