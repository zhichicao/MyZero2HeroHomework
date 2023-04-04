require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');

const { alchemyApiKey, privateKey, bscscanApiKey } = require('./secrets.json');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version:"0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  defaultNetwork: "bscTest",

  networks: {
    hardhat: {},
    localhost: {
      url: "http://localhost:8545",
    },
    bscTest: {
      url: `https://bsc-testnet.public.blastapi.io`,
      accounts: [`0x${privateKey}`],
    },
  },
  etherscan: {
    apiKey: bscscanApiKey,
  },
};
