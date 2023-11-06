import React, { useState } from "react";
import { TaskStatus } from "~~/enums/task";
import { Task } from "~~/types/timetaskmananger/task";
import { unixTimestampMillisecondsToIsoString } from "~~/utils/dateTime";

interface AddEditTaskModalProps {
	task: Task;
	onClose: () => void;
	onSave: (editedTask: Task) => void;
}

const AddEditTaskModal: React.FC<AddEditTaskModalProps> = ({
	task,
	onClose,
	onSave,
}) => {
	const [editedTask, setEditedTask] = useState<Task>(task);

	const handleSave = () => {
		onSave(editedTask);
		onClose();
	};

	return (
		<div className="fixed inset-0 flex bg-[#000000cc] items-center justify-center z-50">
			<div className="bg-base-100 border-base-300 border shadow-md shadow-secondary p-4 rounded-lg min-w-[300px] max-w-[300px] sm:min-w-[512px] sm:max-w-[512px]">
				<h2 className="text-lg font-semibold mb-4">Edit Task</h2>
				<div
					className={
						"flex border-2 border-base-300 bg-base-200 rounded-md text-accent mb-2"
					}
				>
					<input
						type="text"
						value={editedTask.title}
						onChange={(e) =>
							setEditedTask({
								...editedTask,
								title: e.target.value,
							})
						}
						className="input input-ghost focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
						placeholder="Title"
					/>
				</div>
				<div
					className={
						"flex border-2 border-base-300 bg-base-200 rounded-md text-accent mb-2"
					}
				>
					<textarea
						value={editedTask.description}
						onChange={(e) =>
							setEditedTask({
								...editedTask,
								description: e.target.value,
							})
						}
						className="input input-ghost focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border rounded-none w-full font-medium placeholder:text-accent/50 text-gray-400"
						placeholder="Description"
						rows={4}
					/>
				</div>
				<div
					className={
						"flex border-2 border-base-300 bg-base-200 rounded-md text-accent mb-2"
					}
				>
					<select
						value={editedTask.status}
						onChange={(e) =>
							setEditedTask({
								...editedTask,
								status: Number(e.target.value),
							})
						}
						className="input input-ghost focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
					>
						{Object.keys(TaskStatus).map((key) => (
							<option
								key={key}
								value={
									TaskStatus[key as keyof typeof TaskStatus]
								}
							>
								{key}
							</option>
						))}
					</select>
				</div>
				<div
					className={
						"flex border-2 border-base-300 bg-base-200 rounded-md text-accent mb-2"
					}
				>
					<input
						type="text"
						value={editedTask.assignedTo}
						onChange={(e) =>
							setEditedTask({
								...editedTask,
								assignedTo: e.target.value,
							})
						}
						className="input input-ghost focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
						placeholder="Assigned to"
					/>
				</div>
				<div
					className={
						"flex border-2 border-base-300 bg-base-200 rounded-md text-accent mb-2"
					}
				>
					<input
						type="date"
						value={unixTimestampMillisecondsToIsoString(
							editedTask.dueDate * 1000n
						)}
						onChange={(e) => {
							const selectedDate = new Date(e.target.value);
							const unixTimestampMilliseconds = BigInt(
								selectedDate.getTime()
							);
							return setEditedTask({
								...editedTask,
								dueDate: unixTimestampMilliseconds / 1000n,
							});
						}}
						className="input input-ghost focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
						placeholder="Due Date"
					/>
				</div>
				<div
					className={
						"flex border-2 border-base-300 bg-base-200 rounded-md text-accent mb-2"
					}
				>
					<input
						type="text"
						disabled={true}
						value={editedTask.createdBy}
						onChange={(e) =>
							setEditedTask({
								...editedTask,
								createdBy: e.target.value,
							})
						}
						className="input input-ghost focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
						placeholder="Creator"
					/>
				</div>
				<div className="flex justify-end">
					<button
						onClick={handleSave}
						className="btn btn-primary btn-md mr-2"
					>
						Save
					</button>
					<button
						onClick={onClose}
						className="btn btn-secondary btn-md"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddEditTaskModal;
