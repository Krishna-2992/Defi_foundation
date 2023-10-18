const {
    loadFixture,
    mine,
} = require('@nomicfoundation/hardhat-network-helpers')

const {axios} = require('axios')

const { ethers } = require('hardhat')

describe('Oracle', () => {
    async function deployFixture() {
        // const [deployer, admin, reporter1] =
        //     await ethers.getSigners()

        // const Oracle = await ethers.getContractFactory('Oracle')

        // const oracle = await Oracle.deploy(admin.address)
        // await oracle.deployed()

        // await oracle.connect(admin).updateReporter(reporter1.address, true)

        // const Consumer = await ethers.getContractFactory('OracleConsumer')
        // const consumer = await Consumer.deploy(oracle.address)
        // await consumer.deployed()

        // const random = Math.floor(Math.random() * 10)
        // console.log('random', random)
        // // await oracle
        // //     .connect(reporter1)
        // //     .updateData(
        // //         '0xacaf3289d7b601cbd114fb36c4d29c85bbfd5e133f14cb355c3fd8d99367964f',
        // //         random
        // //     )

        // const fooValue = await consumer.foo()
        // console.log('foo value is: ', fooValue)

        let value;

        fetch('https://rest.coinapi.io/v1/exchangerate/BTC/USD', {
            headers: {
                'X-CoinAPI-Key': 'F094F7BC-F829-44C3-A199-D41AC0FF76B2', // Replace with your API key
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('-------------------------------')
                console.log(data.rate)
                value = data.rate
                console.log('-------------------------------')
            })
            .catch((error) => console.error('Error:', error))
            return {value}

        // const API_KEY = 'F094F7BC-F829-44C3-A199-D41AC0FF76B2' // Replace with your API key

        // axios
        //     .get('https://rest.coinapi.io/v1/exchangerate/BTC/USD', {
        //         headers: {
        //             'X-CoinAPI-Key': API_KEY,
        //         },
        //     })
        //     .then((response) => {
        //         const rate = response.data.rate
        //         console.log('-------------------------------')
        //         console.log(rate)
        //         console.log('-------------------------------')
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error)
        //     })
    }

    it('must give user the proper governance tokens', async () => {
        console.log('calling main function...')
        await deployFixture().then((res)=>console.log('vlaee:', res))
        console.log('inside')
        // console.log('value is', value)
    })
})
