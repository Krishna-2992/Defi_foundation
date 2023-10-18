const { ethers } = require('hardhat')

async function main() {
    const [deployer, admin, reporter1, reporter2, user] =
        await ethers.getSigners()

    const Oracle = await ethers.getContractFactory('Oracle')

    const oracle = await Oracle.deploy(admin.address)
    await oracle.deployed()

    await oracle.connect(admin).updateReporter(reporter1.address, true)

    const Consumer = await ethers.getContractFactory('OracleConsumer')
    const consumer = await Consumer.deploy(oracle.address)
    await consumer.deployed()

    fetch('https://rest.coinapi.io/v1/exchangerate/BTC/USD', {
        headers: {
            'X-CoinAPI-Key': 'F094F7BC-F829-44C3-A199-D41AC0FF76B2', // Replace with your API key
        },
    })
        .then((response) => response.json())
        .then(async (data) => {
            console.log(data)

            const string = 'BTC/USD'
            const hash = ethers.utils.keccak256(
                ethers.utils.toUtf8Bytes(string)
            )
            await oracle
                .connect(reporter1)
                .updateData(hash, Math.floor(data.rate))

            const fooValue = await consumer.foo()
            console.log('foo value is: ', fooValue)
        })
        .catch((error) => console.error('Error:', error))
}
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
