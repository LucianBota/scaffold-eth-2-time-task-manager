import React, { useState } from "react";
import { TaskStatus } from "~~/enums/task";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { Task } from "~~/types/timetaskmananger/task";
import { unixTimestampMillisecondsToIsoString } from "~~/utils/dateTime";

interface DeleteTaskModalProps {
	taskId: bigint;
	onClose: () => void;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
	taskId,
	onClose,
}) => {
	const {
		writeAsync: writeDeleteAsync,
		isLoading: isLoadingDelete,
		isMining: isMiningDelete,
	} = useScaffoldContractWrite({
		contractName: "TimeTaskManager",
		functionName: "deleteTask",
		args: [taskId],
		blockConfirmations: 1,
		onBlockConfirmation: (txnReceipt) => {
			console.log("Transaction blockHash", txnReceipt.blockHash);
		},
	});

	const handleConfirm = async () => {
		await writeDeleteAsync();
		onClose();
	};

	return (
		<div className="fixed inset-0 flex bg-[#000000cc] items-center justify-center z-50">
			<div className="bg-base-100 border-base-300 border shadow-md shadow-secondary p-4 rounded-lg min-w-[300px] max-w-[300px]">
				<h2 className="text-lg font-semibold text-center mb-4">
					Do you want to delete this task?
				</h2>
				<div className="flex justify-end">
					<button
						disabled={isLoadingDelete || isMiningDelete}
						onClick={handleConfirm}
						className="btn btn-primary btn-md mr-2"
					>
						Confirm
					</button>
					<button
						disabled={isLoadingDelete || isMiningDelete}
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

export default DeleteTaskModal;
