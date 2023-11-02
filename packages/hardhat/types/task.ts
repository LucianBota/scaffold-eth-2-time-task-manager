import { Address } from "hardhat-deploy/types";
import { BigNumber } from "ethers";
import { TaskStatus } from "../enums/task";

export type Task = {
	title: string;
	status: TaskStatus;
	description: string;
	assignedTo: Address;
	dueDate: BigNumber;
	createdBy: Address;
};
