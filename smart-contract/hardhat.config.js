require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

// require("@nomiclabs/hardhart-waffle");
// /** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/ux69TEW26IxG6ELTsL1_VVfN20Oe7GJW",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
