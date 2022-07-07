//Traditionnaly without hardhat deploy
//import
//main function
//calling of main function
const { networkConfig, developmentChains } = require("../helper-hardhat-config")

const { network } = require("hardhat")
const { verify } = require("../utils/verify")

//But with hardhat deploy
// hre = hardhat runtime env
// function deployFunc(hre) {
//     console.log("Hi!")
// }

// module.exports.default = deployFunc

// module.exports = async(hre) => {
//     const {getNamedAccounts, getNamedAccounts} = hre
//     // same thing as doing hre.getNamedAccounts qnd hre.deployments

// }

// with JS synthax suger =

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    //const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    const args = [ethUsdPriceFeedAddress]

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // put price feed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }
    log("------------------------------------------------------------")
}
module.exports.tags = ["all", "fundme"]
