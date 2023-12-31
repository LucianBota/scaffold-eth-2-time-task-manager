//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
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
	uint256 private s_tasksCount = 0;
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
			s_tasksCount++;
		}
	}

	// Functions
	function createTask(
		string memory title,
		string memory description,
		address assignedTo,
		uint256 dueDate
	) public onlyLeadOrScrum {
		require(dueDate > block.timestamp, "Due date must be in the future");

		s_lastTaskIndex++;
		s_tasks[s_lastTaskIndex] = Task(
			title,
			TaskStatus.TODO,
			description,
			assignedTo,
			dueDate,
			msg.sender
		);
		s_tasksCount++;
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
		require(dueDate > block.timestamp, "Due date must be in the future");

		Task storage task = s_tasks[taskId];
		require(
			task.createdBy == msg.sender,
			"Only the creator can edit the task"
		);
		task.assignedTo = assignedTo;
		task.dueDate = dueDate;
		emit TaskEdited(taskId);
	}

	function deleteTask(uint256 taskId) public {
		Task storage task = s_tasks[taskId];
		require(
			task.createdBy == msg.sender,
			"Only the creator can delete the task"
		);
		delete s_tasks[taskId];
		s_tasksCount--;
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

	function getAllTasks() public view returns (TaskWithId[] memory) {
		TaskWithId[] memory allTasks = new TaskWithId[](s_tasksCount);
		uint256 index = 0;

		for (uint256 i = s_lastTaskIndex; i > 0; i--) {
			Task memory task = s_tasks[i];
			allTasks[index] = TaskWithId(
				i,
				task.title,
				task.status,
				task.description,
				task.assignedTo,
				task.dueDate,
				task.createdBy
			);
			index++;
		}

		return allTasks;
	}

	function getTasksCount() public view returns (uint256) {
		return s_tasksCount;
	}

	function getLastTaskIndex() public view returns (uint256) {
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
