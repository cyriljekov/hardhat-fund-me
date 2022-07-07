// const { inputToConfig } = require("@ethereum-waffle/compiler")
// const { getNamedAccounts, ethers, network } = require("hardhat")
// const { developmentChains } = require("../../helper-hardhat-config")
// const { assert } = require("chai")

// //Checking if we are on the testnet
// developmentChains.includes(network.name) //If we are on a development chain
//     ? describe.skip // we skip the following test
//     : describe("FundMe", async function () {
//           let fundMe
//           let deployer
//           const sendValue = ethers.utils.parseEther("0.05")
//           beforeEach(async function () {
//               deployer = (await getNamedAccounts()).deployer
//               fundMe = await ethers.getContract("FundMe", deployer)
//           })
//           inputToConfig(
//               "allows people to fund and withdraw",
//               async function () {
//                   await fundMe.fund({ value: sendValue })
//                   await fundMe.withdraw()
//                   const endingBalance = await fundMe.provider.getBalance(
//                       fundMe.address
//                   )
//                   assert.equal(endingBalance.toString(), "0")
//               }
//           )
//       })

const { assert } = require("chai")
const { network, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe Staging Tests", async function () {
          let deployer
          let fundMe
          const sendValue = ethers.utils.parseEther("0.08")
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("allows people to fund and withdraw", async function () {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw()

              const endingFundMeBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              console.log(
                  endingFundMeBalance.toString() +
                      " should equal 0, running assert equal..."
              )
              assert.equal(endingFundMeBalance.toString(), "0")
          })
      })
