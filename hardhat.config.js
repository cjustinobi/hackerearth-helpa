require("dotenv").config();
require('@nomicfoundation/hardhat-toolbox')

const { REACT_APP_ALCHEMY_PK, REACT_APP_PK } = process.env

const goerliUrl = `https://eth-goerli.g.alchemy.com/v2/${REACT_APP_ALCHEMY_PK}`
const polygonUrl = `https://polygon-mumbai.g.alchemy.com/v2/${REACT_APP_ALCHEMY_PK}`

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  defaultNetwork: 'polygon_mumbai',
  // defaultNetwork: 'goerli',
  networks: {
    polygon_mumbai: {
      url: polygonUrl,
      accounts: [REACT_APP_PK],
      // gas: 2100000,
      gasPrice: 8000000000
    },
    // goerli: {
    //   url: goerliUrl,
    //   accounts: [REACT_APP_PK]
    // }
  },
  paths: {
    artifacts: './src/artifacts'
  }
};
