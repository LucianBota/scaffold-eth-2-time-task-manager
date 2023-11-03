import { assert, expect } from "chai";
import { deployments, ethers, network } from "hardhat";
import { Address } from "hardhat-deploy/types";
import { BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { TimeTaskManager } from "../typechain-types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { Task } from "../types/task";

!developmentChains.includes(network.name)
	? describe.skip
	: describe("TimeTaskManager Unit Tests", function () {
			// We define a fixture to reuse the same setup in every test.

			let timeTaskManager: TimeTaskManager,
				timeTaskManagerContract: TimeTaskManager,
				deployer: SignerWithAddress,
				accounts: SignerWithAddress[],
				leadAddresses: Address[],
				scrumAddresses: Address[],
				devAddresses: Address[],
				tasks: Task[],
				chainId: number;

			beforeEach(async () => {
				accounts = await ethers.getSigners();
				deployer = accounts[0];
				await deployments.fixture(["all"]);
				timeTaskManagerContract = await ethers.getContract(
					"TimeTaskManager"
				);
				timeTaskManager = timeTaskManagerContract.connect(deployer);

				// leadAddresses = [...networkConfig[chainId].leadAddresses];
				// scrumAddresses = [...networkConfig[chainId].scrumAddresses];
				// devAddresses = [...networkConfig[chainId].devAddresses];
				// leadAddresses.push(
				// 	accounts[0].address,
				// 	accounts[1].address,
				// 	accounts[2].address
				// );
				// scrumAddresses.push(
				// 	accounts[3].address,
				// 	accounts[4].address,
				// 	accounts[5].address
				// );
				// devAddresses.push(
				// 	accounts[6].address,
				// 	accounts[7].address,
				// 	accounts[8].address
				// );
				// tasks = [...networkConfig[chainId].tasks].map((task) => {
				// 	task.createdBy = deployer;
				// 	return task;
				// });
				chainId = network.config.chainId!;
			});

			describe("constructor", function () {
				it("initializes the TimeTaskManager correctly", async function () {
					// Ideally just 1 assert per "it"
					// const rouletteState = await roulette.getGameState();
					// assert.equal(rouletteState.toString(), "0");
					// assert.equal(
					// 	minBetValue.toString(),
					// 	networkConfig[chainId]["minBetValue"].toString()
					// );
					// assert.equal(
					// 	maxPlayers.toString(),
					// 	networkConfig[chainId]["maxPlayers"]
					// );
					// assert.equal(
					// 	interval.toString(),
					// 	networkConfig[chainId]["interval"]
					// );
				});
			});
	  });
