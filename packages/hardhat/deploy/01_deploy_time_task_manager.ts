import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { verify } from "../utils/verify";

/**
 * Deploys a contract named "TimeTaskManager" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployTimeTaskManager: DeployFunction = async function (
	hre: HardhatRuntimeEnvironment
) {
	/*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
	const { deployer } = await hre.getNamedAccounts();
	const { deploy, log } = hre.deployments;
	const accounts = await hre.getUnnamedAccounts();
	const chainId = hre.network.config.chainId!;

	const leadAddresses = [...networkConfig[chainId].leadAddresses];
	const scrumAddresses = [...networkConfig[chainId].scrumAddresses];
	const devAddresses = [...networkConfig[chainId].devAddresses];

	// adds some local network accounts to the lead, scrum & dev roles
	if (developmentChains.includes(hre.network.name)) {
		leadAddresses.push(accounts[0], accounts[1], accounts[2]);
		scrumAddresses.push(accounts[3], accounts[4], accounts[5]);
		devAddresses.push(accounts[6], accounts[7], accounts[8]);
	}

	// set the deployer as the creator of the default tasks
	const tasks = [...networkConfig[chainId].tasks].map((task) => {
		task.createdBy = deployer;
		return task;
	});

	const args: any[] = [leadAddresses, scrumAddresses, devAddresses, tasks];
	log(args);

	await deploy("TimeTaskManager", {
		from: deployer,
		// Contract constructor arguments
		args: args,
		log: true,
		// autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
		// automatically mining the contract deployment transaction. There is no effect on live networks.
		autoMine: true,
	});

	// Get the deployed contract
	const timeTaskManager = await hre.ethers.getContract(
		"TimeTaskManager",
		deployer
	);

	// Verify the deployment
	if (
		!developmentChains.includes(hre.network.name) &&
		process.env.ETHERSCAN_API_KEY
	) {
		log("Verifying...");
		await verify(timeTaskManager.address, args);
	}
	log("------------------------------------------");
};

export default deployTimeTaskManager;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags TimeTaskManager
deployTimeTaskManager.tags = ["all", "TimeTaskManager"];
