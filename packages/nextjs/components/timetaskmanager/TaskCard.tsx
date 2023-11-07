import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Task } from "~~/types/timetaskmananger/task";
import { unixTimestampMillisecondsToIsoString } from "~~/utils/dateTime";
import { TaskStatus } from "~~/enums/task";
import { useAccount } from "wagmi";
import AddEditTaskModal from "./AddEditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";

interface TaskCardProps {
	task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
	const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
	const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

	const { address } = useAccount();

	const handleEditClick = () => {
		setEditModalOpen(true);
	};

	const handleEditModalClose = () => {
		setEditModalOpen(false);
	};

	const handleDeleteClick = () => {
		setDeleteModalOpen(true);
	};

	const handleDeleteModalClose = () => {
		setDeleteModalOpen(false);
	};

	return (
		<div className="bg-base-100 p-4 rounded-lg min-w-[300px] max-w-[300px] sm:min-w-[512px] sm:max-w-[512px] md:min-w-[320px] md:max-w-[320px] xl:min-w-[384px] xl:max-w-[384px] 2xl:min-w-[448px] 2xl:max-w-[448px] mx-auto relative">
			<div className="flex justify-between items-center mb-2">
				<div className="text-lg font-semibold truncate">
					{task.title}
				</div>
				<div className="flex">
					<button
						className="text-base-content hover:text-secondary"
						onClick={handleEditClick}
					>
						<PencilIcon className="w-5 h-5" />
					</button>
					{task.createdBy === address ? (
						<button
							className="text-base-content hover:text-secondary ml-4"
							onClick={handleDeleteClick}
						>
							<TrashIcon className="w-5 h-5" />
						</button>
					) : null}
				</div>
			</div>
			<div className="mb-2">
				Status:{" "}
				{Object.keys(TaskStatus).find(
					(key) =>
						TaskStatus[key as keyof typeof TaskStatus] ===
						task.status
				)}
			</div>
			<div className="mb-2 truncate">Description: {task.description}</div>
			<div className="mb-2 truncate">Assigned to: {task.assignedTo}</div>
			<div className="mb-2">
				Date to be done:{" "}
				{unixTimestampMillisecondsToIsoString(task.dueDate * 1000n)}
			</div>
			<div className="mb-2 truncate">Creator: {task.createdBy}</div>
			{isEditModalOpen && (
				<AddEditTaskModal task={task} onClose={handleEditModalClose} />
			)}
			{isDeleteModalOpen && (
				<DeleteTaskModal
					taskId={task.id!}
					onClose={handleDeleteModalClose}
				/>
			)}
		</div>
	);
};

export default TaskCard;
