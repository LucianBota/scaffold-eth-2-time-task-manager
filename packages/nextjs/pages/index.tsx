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
					<div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
						<div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
							<BugAntIcon className="h-8 w-8 fill-secondary" />
							<p>Debug Contract</p>
						</div>
						<div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
							<MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
							<p>Block Explorer</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
