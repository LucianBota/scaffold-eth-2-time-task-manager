import { TaskStatus } from "~~/enums/task";

export type Task = {
	id?: bigint;
	title: string;
	status: TaskStatus;
	description: string;
	assignedTo: string;
	dueDate: bigint;
	createdBy: string;
};
