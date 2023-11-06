import { TaskStatus } from "~~/enums/task";

export type Task = {
	title: string;
	status: TaskStatus;
	description: string;
	assignedTo: string;
	dueDate: bigint;
	createdBy: string;
};
