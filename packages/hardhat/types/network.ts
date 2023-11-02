import { Address } from "hardhat-deploy/types";
import { Task } from "./task";

export type NetworkConfig = {
	[networkId: number]: {
		name: string;
		leadAddresses: Address[];
		scrumAddresses: Address[];
		devAddresses: Address[];
		tasks: Task[];
	};
};
