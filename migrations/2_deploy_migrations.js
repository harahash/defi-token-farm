const ChadToken = artifacts.require("ChadToken");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(deployer, network, accounts) {
	// deploy DAI token
	await deployer.deploy(DaiToken);
	const daiToken = await DaiToken.deployed();

	// deploy Chad token
	await deployer.deploy(ChadToken);
	const chadToken = await ChadToken.deployed();

	// deploy TokenFarm
	await deployer.deploy(TokenFarm, chadToken.address, daiToken.address);
	const tokenFarm = await TokenFarm.deployed();

	// transfer all tokens to TorenFarm
	await chadToken.transfer(tokenFarm.address, "1000000000000000000000000");

	// transfer 100 DAI to investor
	await daiToken.transfer(accounts[1], "100000000000000000000");
};
