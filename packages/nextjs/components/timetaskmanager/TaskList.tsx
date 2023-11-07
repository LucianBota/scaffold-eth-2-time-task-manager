import { useEffect, useState } from "react";

import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { Task } from "~~/types/timetaskmananger/task";
import { AccountRole } from "~~/enums/timeTaskManager";
import AddEditTaskModal from "./AddEditTaskModal";
import TaskCard from "./TaskCard";

const TaskList = () => {
	const [accountRole, setAccountRole] = useState<AccountRole>(
		AccountRole.None
	);
	const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
	const [currentDateTimestamp, setCurrentDateTimestamp] =
		useState<bigint>(0n);

	const { address } = useAccount();

	const { data: tasks } = useScaffoldContractRead({
		contractName: "TimeTaskManager",
		functionName: "getAllTasks",
	});

	const { data: isDev } = useScaffoldContractRead({
		contractName: "TimeTaskManager",
		functionName: "getIsDev",
		args: [address],
	});
	const { data: isScrum } = useScaffoldContractRead({
		contractName: "TimeTaskManager",
		functionName: "getIsScrum",
		args: [address],
	});
	const { data: isLead } = useScaffoldContractRead({
		contractName: "TimeTaskManager",
		functionName: "getIsLead",
		args: [address],
	});

	useEffect(() => {
		if (isScrum || isLead) {
			setAccountRole(AccountRole.LeadOrScrum);
		} else if (isDev) {
			setAccountRole(AccountRole.Dev);
		} else {
			setAccountRole(AccountRole.None);
		}
	}, [isDev, isScrum, isLead]);

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
			{accountRole === AccountRole.LeadOrScrum ? (
				<div className="flex justify-center mb-10">
					<button
						onClick={handleAddClick}
						className="btn btn-accent btn-md mr-2"
					>
						ADD TASK +
					</button>
				</div>
			) : null}
			<div className="grid gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{tasks?.map((task: Task) =>
					task.id ? (
						<TaskCard
							key={task.id.toString()}
							accountRole={accountRole}
							task={task}
						/>
					) : null
				)}
			</div>
			{isAddModalOpen && (
				<AddEditTaskModal
					accountRole={accountRole}
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
