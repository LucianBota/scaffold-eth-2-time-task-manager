//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

//error TimeTaskManager__TransferFailed(address receiver);

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author Lucian Bota
 */
contract TimeTaskManager {
	// Type declarations
	enum TaskStatus {
		TODO,
		DONE,
		CANCELED
	} // uint256 0 = TODO, 1 = DONE, 2 = CANCELED

	struct Task {
		string title;
		TaskStatus status;
		string description;
		address assignedTo;
		uint256 dueDate;
		address createdBy;
	}

	struct TaskWithId {
		uint256 id;
		string title;
		TaskStatus status;
		string description;
		address assignedTo;
		uint256 dueDate;
		address createdBy;
	}

	// State Variables
	mapping(uint256 => Task) private s_tasks;
	uint256 private s_lastTaskIndex = 0;

	mapping(address => bool) private s_isLead;
	mapping(address => bool) private s_isScrum;
	mapping(address => bool) private s_isDev;

	// Events
	event TaskDeleted(uint256 indexed indexedtaskId);
	event TaskCreated(uint256 indexed taskId);
	event TaskStatusUpdated(uint256 indexed taskId);
	event TaskEdited(uint256 indexed taskId);

	// Modifiers
	modifier onlyLeadOrScrum() {
		require(
			s_isLead[msg.sender] || s_isScrum[msg.sender],
			"Only lead and scrum roles can perform this action"
		);
		_;
	}

	modifier onlyDev() {
		require(s_isDev[msg.sender], "Only dev role can perform this action");
		_;
	}

	// Constructor
	constructor(
		address[] memory leadAddresses,
		address[] memory scrumAddresses,
		address[] memory devAddresses,
		Task[] memory tasks
	) {
		for (uint256 i = 0; i < leadAddresses.length; i++) {
			s_isLead[leadAddresses[i]] = true;
		}

		for (uint256 i = 0; i < scrumAddresses.length; i++) {
			s_isScrum[scrumAddresses[i]] = true;
		}

		for (uint256 i = 0; i < devAddresses.length; i++) {
			s_isDev[devAddresses[i]] = true;
		}

		for (uint256 i = 0; i < tasks.length; i++) {
			s_lastTaskIndex++;
			s_tasks[s_lastTaskIndex] = tasks[i];
		}
	}

	// Functions
	function createTask(
		string memory title,
		string memory description,
		address assignedTo,
		uint256 dueDate
	) public onlyLeadOrScrum {
		s_lastTaskIndex++;
		s_tasks[s_lastTaskIndex] = Task(
			title,
			TaskStatus.TODO,
			description,
			assignedTo,
			dueDate,
			msg.sender
		);
		emit TaskCreated(s_lastTaskIndex);
	}

	function updateTaskStatus(
		uint256 taskId,
		TaskStatus status
	) public onlyDev {
		Task storage task = s_tasks[taskId];
		require(
			task.assignedTo == msg.sender,
			"Only the assigned developer can update the status"
		);
		task.status = status;
		emit TaskStatusUpdated(taskId);
	}

	function editTask(
		uint256 taskId,
		address assignedTo,
		uint256 dueDate
	) public onlyLeadOrScrum {
		Task storage task = s_tasks[taskId];
		require(
			task.createdBy == msg.sender || s_isScrum[msg.sender],
			"Only the creator or scrum can edit the task"
		);
		task.assignedTo = assignedTo;
		task.dueDate = dueDate;
		emit TaskEdited(taskId);
	}

	function deleteTask(uint256 taskId) public {
		Task storage task = s_tasks[taskId];
		console.log("createdBy", task.createdBy);
		console.log("sender", msg.sender);
		require(
			task.createdBy == msg.sender,
			"Only the creator can delete the task"
		);
		delete s_tasks[taskId];
		emit TaskDeleted(taskId);
	}

	// View / Pure functions
	function getTask(
		uint256 taskId
	)
		public
		view
		returns (
			string memory,
			TaskStatus,
			string memory,
			address,
			uint256,
			address
		)
	{
		Task memory task = s_tasks[taskId];
		return (
			task.title,
			task.status,
			task.description,
			task.assignedTo,
			task.dueDate,
			task.createdBy
		);
	}

	function getPaginatedTasks(
		uint256 page,
		uint256 pageSize
	) public view returns (TaskWithId[] memory) {
		require(page > 0, "Page number must be greater than 0");
		require(pageSize > 0, "Page size must be greater than 0");

		// Create an array to hold the paginated tasks
		TaskWithId[] memory paginatedTasks = new TaskWithId[](pageSize);

		// Initialize variables to track the number of tasks found and the current page index
		uint256 tasksFound = 0;
		uint256 currentPageIndex = 0;

		// Iterate through tasks in reverse order to find the tasks for the requested page
		for (uint256 i = s_lastTaskIndex; i > 0; i--) {
			if (tasksFound == pageSize) {
				// If we have found enough tasks for the page, exit the loop
				break;
			}

			// Check if the task at index i exists (not deleted)
			if (bytes(s_tasks[i].title).length != 0) {
				// This task exists, so add it to the paginatedTasks array
				paginatedTasks[currentPageIndex] = TaskWithId({
					id: i,
					title: s_tasks[i].title,
					status: s_tasks[i].status,
					description: s_tasks[i].description,
					assignedTo: s_tasks[i].assignedTo,
					dueDate: s_tasks[i].dueDate,
					createdBy: s_tasks[i].createdBy
				});
				tasksFound++;
				currentPageIndex++;
			}
		}
		return paginatedTasks;
	}

	function getNewTaskIndex() public view returns (uint256) {
		return s_lastTaskIndex;
	}

	function getIsLead(address userAddress) public view returns (bool) {
		return s_isLead[userAddress];
	}

	function getIsScrum(address userAddress) public view returns (bool) {
		return s_isScrum[userAddress];
	}

	function getIsDev(address userAddress) public view returns (bool) {
		return s_isDev[userAddress];
	}
}
