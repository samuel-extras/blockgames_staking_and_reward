//https://eth-rinkeby.alchemyapi.io/v2/60U32MmSjFJps2JDoXgyoCOYCI_bOmxr

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.6",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/60U32MmSjFJps2JDoXgyoCOYCI_bOmxr",
      accounts: [
        "2fed051203d6ed65af16d47cf00746a32e0fe8e6b539480054c23f8e19149a8d",
      ],
    },
  },
};
