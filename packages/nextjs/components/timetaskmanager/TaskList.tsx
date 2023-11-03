import React from "react";

import TaskCard from "./TaskCard";

const TaskList = () => {
	return (
		<div
			className="grid gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
			// style={{
			// 	gridTemplateColumns: "1fr 1fr 1fr",
			// }}
		>
			<TaskCard />
			<TaskCard />
			<TaskCard />
			<TaskCard />
		</div>
	);
};

export default TaskList;
