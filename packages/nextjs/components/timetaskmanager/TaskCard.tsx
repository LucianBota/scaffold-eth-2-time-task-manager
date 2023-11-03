import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

const TaskCard = () => {
	return (
		<div
			className="bg-base-100 p-4 rounded-lg min-w-[300px] max-w-[300px]
        sm:min-w-[512px] sm:max-w-[512px] md:min-w-[320px] md:max-w-[320px] xl:min-w-[384px] xl:max-w-[384px] 2xl:min-w-[448px] 2xl:max-w-[448px] mx-auto relative"
		>
			<div className="flex justify-between items-center mb-2">
				<div className="text-lg font-semibold truncate">
					Title that may be very long and should be truncated if it
					overflows
				</div>
				<div className="flex">
					<button
						className="text-base-content hover:text-secondary mr-4"
						onClick={() => {
							// Handle edit functionality here
						}}
					>
						<PencilIcon className="w-5 h-5" />
					</button>
					<button
						className="text-base-content hover:text-secondary"
						onClick={() => {
							// Handle delete functionality here
						}}
					>
						<TrashIcon className="w-5 h-5" />
					</button>
				</div>
			</div>
			<div
				className="mb-2"
				style={{
					flex: 1,
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
			>
				Status: TODO
			</div>
			<div
				className="mb-2"
				style={{
					maxLines: 3,
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
			>
				Description: XXXXXXX XXXXX XXXXX XXXXXXXX XXXXXX XXX XXXXX XXXX
			</div>
			<div
				className="mb-2"
				style={{
					maxLines: 2,
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
			>
				Assigned to: 0x000000000000000
			</div>
			<div
				className="mb-2"
				style={{
					maxLines: 2,
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
			>
				Date to be done: 03.11.2023
			</div>
			<div
				className="mb-2"
				style={{
					maxLines: 2,
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
			>
				Creator: 0x000000000000000
			</div>
		</div>
	);
};

export default TaskCard;
