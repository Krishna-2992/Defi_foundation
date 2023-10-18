const {loadFixture, mine} = require('@nomicfoundation/hardhat-network-helpers')
// const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')

const {ethers} = require('hardhat')

describe("Liquidity Pool", () => {
    async function deployFixture() {
        const [deployer, user] = await ethers.getSigners()

        const GovernanceToken = await ethers.getContractFactory("GovernanceToken")
        const governanceToken = await GovernanceToken.deploy() 
        await governanceToken.deployed()

        const LpToken = await ethers.getContractFactory("LpToken")
        const lpToken = await LpToken.deploy() 
        await lpToken.deployed()

        const UnderlyingToken = await ethers.getContractFactory("UnderlyingToken")
        const underlyingToken = await UnderlyingToken.deploy() 
        await underlyingToken.deployed()

        const LiquidityPool = await ethers.getContractFactory("LiquidityPool")
        const liquidityPool = await LiquidityPool.deploy(underlyingToken.address, governanceToken.address) 
        await liquidityPool.deployed()

        // mint underlying tokens for the user
        await underlyingToken.faucets(user.address, ethers.utils.parseEther("100"))
        console.log('minted 100 tokens for the user!!')
        console.log('lpToken address:', liquidityPool.address)

        // approve liquidity pool to manage the underlying tokens of user
        await underlyingToken.connect(user).approve(liquidityPool.address, "100000000000000000000")


        // user will call deposit function of liquidityPool with amount
        await liquidityPool.connect(user).deposit(100)

        // increase the block.number by 10 using hardhat
        await mine(10)

        // user will call withdraw function of liquidityPool with amount
        await liquidityPool.connect(user).withdraw(100)


        // user must have proper amount of governance tokens now...
        const tokens = await governanceToken.balanceOf(user.address)
        console.log('tokens: ', tokens)
        return {governanceToken, user}
    }

    it("must give user the proper governance tokens", async () => {
        const {governanceToken, user} = await deployFixture()
        console.log('inside')
    })
})