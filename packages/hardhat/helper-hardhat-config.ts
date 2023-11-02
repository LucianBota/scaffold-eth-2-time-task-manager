import { BigNumber } from "ethers";
import { NetworkConfig } from "./types/network";
import { TaskStatus } from "./enums/task";

const networkConfig: NetworkConfig = {
	11155111: {
		name: "sepolia",
		leadAddresses: [], // Enter here the list of lead addresses
		scrumAddresses: [], // Enter here the list of scrum addresses
		devAddresses: [], // Enter here the list of dev addresses
		tasks: [], // Enter the mock tasks here
	},
	31337: {
		name: "localhost",
		leadAddresses: [],
		scrumAddresses: [],
		devAddresses: [],
		tasks: [
			{
				title: "Task 1",
				status: TaskStatus.TODO,
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non elit aliquam, faucibus odio nec, ornare tortor. Phasellus rutrum lectus at viverra laoreet. Aliquam mattis libero auctor, congue massa eget, vehicula lectus.",
				assignedTo: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
				dueDate: BigNumber.from("1699574400"),
				createdBy: "", // leave this empty, it will be overwritten with the deployer account
			},
			{
				title: "Task 2",
				status: TaskStatus.DONE,
				description:
					"Nunc non elit aliquam, faucibus odio nec, ornare tortor. Aliquam mattis libero auctor, congue massa eget, vehicula lectus.",
				assignedTo: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
				dueDate: BigNumber.from("1699660800"),
				createdBy: "", // leave this empty, it will be overwritten with the deployer account
			},
			{
				title: "Task 3",
				status: TaskStatus.CANCELED,
				description: "Phasellus rutrum lectus at viverra laoreet.",
				assignedTo: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
				dueDate: BigNumber.from("1699747200"),
				createdBy: "", // leave this empty, it will be overwritten with the deployer account
			},
		],
	},
};

const developmentChains = ["hardhat", "localhost"];

export { networkConfig, developmentChains };
