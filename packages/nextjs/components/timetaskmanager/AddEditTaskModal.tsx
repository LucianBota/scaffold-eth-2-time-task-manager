import React, { useState } from "react";
import { AccountRole } from "~~/enums/timeTaskManager";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { Task } from "~~/types/timetaskmananger/task";
import { unixTimestampMillisecondsToIsoString } from "~~/utils/dateTime";

interface AddEditTaskModalProps {
	accountRole: AccountRole;
	task: Task;
	onClose: () => void;
}

const AddEditTaskModal: React.FC<AddEditTaskModalProps> = ({
	accountRole,
	task,
	onClose,
}) => {
	const [currentTask, setCurrentTask] = useState<Task>(task);
	const {
		writeAsync: writeCreateAsync,
		isLoading: isLoadingCreate,
		isMining: isMiningCreate,
	} = useScaffoldContractWrite({
		contractName: "TimeTaskManager",
		functionName: "createTask",
		args: [
			currentTask.title,
			currentTask.description,
			currentTask.assignedTo,
			currentTask.dueDate,
		],
		blockConfirmations: 1,
		onBlockConfirmation: (txnReceipt) => {
			console.log("Transaction blockHash", txnReceipt.blockHash);
		},
	});
	const {
		writeAsync: writeEditAsync,
		isLoading: isLoadingEdit,
		isMining: isMiningEdit,
	} = useScaffoldContractWrite({
		contractName: "TimeTaskManager",
		functionName: "editTask",
		args: [currentTask.id, currentTask.assignedTo, currentTask.dueDate],
		blockConfirmations: 1,
		onBlockConfirmation: (txnReceipt) => {
			console.log("Transaction blockHash", txnReceipt.blockHash);
		},
	});
	const {
		writeAsync: writeUpdateStatusAsync,
		isLoading: isLoadingUpdateStatus,
		isMining: isMiningUpdateStatus,
	} = useScaffoldContractWrite({
		contractName: "TimeTaskManager",
		functionName: "updateTaskStatus",
		args: [currentTask.id, currentTask.status],
		blockConfirmations: 1,
		onBlockConfirmation: (txnReceipt) => {
			console.log("Transaction blockHash", txnReceipt.blockHash);
		},
	});

	const handleSave = async () => {
		await writeCreateAsync();
		onClose();
	};

	return (
		<div className="fixed inset-0 flex bg-[#000000cc] items-center justify-center z-50">
			<div className="bg-base-100 border-base-300 border shadow-md shadow-secondary p-4 rounded-lg min-w-[300px] max-w-[300px] sm:min-w-[512px] sm:max-w-[512px]">
				<h2 className="text-lg font-semibold mb-4">
					{task.id ? "Edit" : "Add"} Task
				</h2>
				{!task.id ? (
					<>
						<div
							className={
								"flex border-2 border-base-300 bg-base-200 rounded-md text-accent mb-2"
							}
						>
							<input
								type="text"
								value={currentTask.title}
								onChange={(e) =>
									setCurrentTask({
										...currentTask,
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
								value={currentTask.description}
								onChange={(e) =>
									setCurrentTask({
										...currentTask,
										description: e.target.value,
									})
								}
								className="input input-ghost focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border rounded-none w-full font-medium placeholder:text-accent/50 text-gray-400"
								placeholder="Description"
								rows={4}
							/>
						</div>
					</>
				) : null}
				{task.id && accountRole === AccountRole.Dev ? (
					<div
						className={
							"flex border-2 border-base-300 bg-base-200 rounded-md text-accent mb-2"
						}
					>
						<select
							value={currentTask.status}
							onChange={(e) =>
								setCurrentTask({
									...currentTask,
									status: Number(e.target.value),
								})
							}
							className="input input-ghost focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
						>
							<option value={0}>TODO</option>
							<option value={1}>DONE</option>
							<option value={2}>CANCEL</option>
						</select>
					</div>
				) : null}
				{accountRole === AccountRole.LeadOrScrum ? (
					<>
						<div
							className={
								"flex border-2 border-base-300 bg-base-200 rounded-md text-accent mb-2"
							}
						>
							<input
								type="text"
								value={currentTask.assignedTo}
								onChange={(e) =>
									setCurrentTask({
										...currentTask,
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
									currentTask.dueDate * 1000n
								)}
								onChange={(e) => {
									const selectedDate = new Date(
										e.target.value
									);
									const unixTimestampMilliseconds = BigInt(
										selectedDate.getTime()
									);
									return setCurrentTask({
										...currentTask,
										dueDate:
											unixTimestampMilliseconds / 1000n,
									});
								}}
								className="input input-ghost focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
								placeholder="Due Date"
							/>
						</div>
					</>
				) : null}
				<div className="flex justify-end">
					<button
						disabled={isLoadingCreate || isMiningCreate}
						onClick={handleSave}
						className="btn btn-primary btn-md mr-2"
					>
						Save
					</button>
					<button
						disabled={isLoadingCreate || isMiningCreate}
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
