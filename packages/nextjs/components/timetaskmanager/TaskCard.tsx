import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Task } from "~~/types/timetaskmananger/task";
import { unixTimestampMillisecondsToIsoString } from "~~/utils/dateTime";
import { TaskStatus } from "~~/enums/task";
import AddEditTaskModal from "./AddEditTaskModal";

interface TaskCardProps {
	data: Task;
}

const TaskCard: React.FC<TaskCardProps> = (props) => {
	const [isEditModalOpen, setEditModalOpen] = useState(false);

	const handleEditClick = () => {
		setEditModalOpen(true);
	};

	const handleEditModalClose = () => {
		setEditModalOpen(false);
	};

	const handleEditModalSave = (editedTask: Task) => {
		// Implement logic to save the edited task data here.
		console.log("Edited Task:", editedTask);
		// Close the modal
		handleEditModalClose();
	};

	return (
		<div className="bg-base-100 p-4 rounded-lg min-w-[300px] max-w-[300px] sm:min-w-[512px] sm:max-w-[512px] md:min-w-[320px] md:max-w-[320px] xl:min-w-[384px] xl:max-w-[384px] 2xl:min-w-[448px] 2xl:max-w-[448px] mx-auto relative">
			<div className="flex justify-between items-center mb-2">
				<div className="text-lg font-semibold truncate">
					{props.data.title}
				</div>
				<div className="flex">
					<button
						className="text-base-content hover:text-secondary mr-4"
						onClick={handleEditClick}
					>
						<PencilIcon className="w-5 h-5" />
					</button>
					<button
						className="text-base-content hover:text-secondary"
						onClick={() => {}}
					>
						<TrashIcon className="w-5 h-5" />
					</button>
				</div>
			</div>
			<div className="mb-2">
				Status:{" "}
				{Object.keys(TaskStatus).find(
					(key) =>
						TaskStatus[key as keyof typeof TaskStatus] ===
						props.data.status
				)}
			</div>
			<div className="mb-2">Description: {props.data.description}</div>
			<div className="mb-2">Assigned to: {props.data.assignedTo}</div>
			<div className="mb-2">
				Date to be done:{" "}
				{unixTimestampMillisecondsToIsoString(
					props.data.dueDate * 1000n
				)}
			</div>
			<div className="mb-2">Creator: {props.data.createdBy}</div>
			{isEditModalOpen && (
				<AddEditTaskModal
					task={props.data}
					onClose={handleEditModalClose}
					onSave={handleEditModalSave}
				/>
			)}
		</div>
	);
};

export default TaskCard;
