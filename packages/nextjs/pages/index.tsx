import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

import TaskList from "~~/components/timetaskmanager/TaskList";

const Home: NextPage = () => {
	return (
		<>
			<MetaHeader />
			<div className="flex items-center flex-col flex-grow pt-10">
				<div className="px-5">
					<h1 className="text-center mb-10">
						<span className="block text-4xl font-bold">
							Time Task Manager
						</span>
					</h1>
				</div>

				<div className="flex-grow bg-base-300 w-full py-12">
					<TaskList />
				</div>
			</div>
		</>
	);
};

export default Home;
