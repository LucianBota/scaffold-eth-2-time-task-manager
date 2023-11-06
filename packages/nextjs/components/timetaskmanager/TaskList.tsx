import React from "react";

import TaskCard from "./TaskCard";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const TaskList = () => {
	const { data: tasks } = useScaffoldContractRead({
		contractName: "TimeTaskManager",
		functionName: "getPaginatedTasks",
		args: [1n, 3n],
	});

	return (
		<div
			className="grid gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
			// style={{
			// 	gridTemplateColumns: "1fr 1fr 1fr",
			// }}
		>
			{tasks?.map((task) => {
				console.log("task", task);
				return <TaskCard data={task} />;
			})}
		</div>
	);
};

export default TaskList;
