import { useState } from "react";

import TaskCard from "./TaskCard";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { Task } from "~~/types/timetaskmananger/task";
import AddEditTaskModal from "./AddEditTaskModal";

const TaskList = () => {
	const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
	const [currentDateTimestamp, setCurrentDateTimestamp] =
		useState<bigint>(0n);

	const { data: tasks } = useScaffoldContractRead({
		contractName: "TimeTaskManager",
		functionName: "getAllTasks",
	});

	const handleAddClick = () => {
		const newTimestamp = BigInt(new Date().getTime()) / 1000n;
		const newDateTimestamp = newTimestamp - (newTimestamp % 3600n);
		setCurrentDateTimestamp(newDateTimestamp);
		setAddModalOpen(true);
	};

	const handleAddModalClose = () => {
		setAddModalOpen(false);
	};

	return (
		<div>
			<div className="flex justify-center mb-10">
				<button
					onClick={handleAddClick}
					className="btn btn-accent btn-md mr-2"
				>
					ADD TASK +
				</button>
			</div>
			<div className="grid gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{tasks?.map((task: Task) =>
					task.id ? (
						<TaskCard key={task.id.toString()} task={task} />
					) : null
				)}
			</div>
			{isAddModalOpen && (
				<AddEditTaskModal
					task={{
						assignedTo: "",
						createdBy: "",
						description: "",
						dueDate: currentDateTimestamp,
						status: 0,
						title: "",
					}}
					onClose={handleAddModalClose}
				/>
			)}
		</div>
	);
};

export default TaskList;
