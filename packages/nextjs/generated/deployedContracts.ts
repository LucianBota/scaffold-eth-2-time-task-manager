const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        TimeTaskManager: {
          address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
          abi: [
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "leadAddresses",
                  type: "address[]",
                },
                {
                  internalType: "address[]",
                  name: "scrumAddresses",
                  type: "address[]",
                },
                {
                  internalType: "address[]",
                  name: "devAddresses",
                  type: "address[]",
                },
                {
                  components: [
                    {
                      internalType: "string",
                      name: "title",
                      type: "string",
                    },
                    {
                      internalType: "enum TimeTaskManager.TaskStatus",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "string",
                      name: "description",
                      type: "string",
                    },
                    {
                      internalType: "address",
                      name: "assignedTo",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "dueDate",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "createdBy",
                      type: "address",
                    },
                  ],
                  internalType: "struct TimeTaskManager.Task[]",
                  name: "tasks",
                  type: "tuple[]",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "taskId",
                  type: "uint256",
                },
              ],
              name: "TaskCreated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "indexedtaskId",
                  type: "uint256",
                },
              ],
              name: "TaskDeleted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "taskId",
                  type: "uint256",
                },
              ],
              name: "TaskEdited",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "taskId",
                  type: "uint256",
                },
              ],
              name: "TaskStatusUpdated",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "title",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "assignedTo",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "dueDate",
                  type: "uint256",
                },
              ],
              name: "createTask",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "taskId",
                  type: "uint256",
                },
              ],
              name: "deleteTask",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "taskId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "assignedTo",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "dueDate",
                  type: "uint256",
                },
              ],
              name: "editTask",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "getAllTasks",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                    {
                      internalType: "string",
                      name: "title",
                      type: "string",
                    },
                    {
                      internalType: "enum TimeTaskManager.TaskStatus",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "string",
                      name: "description",
                      type: "string",
                    },
                    {
                      internalType: "address",
                      name: "assignedTo",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "dueDate",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "createdBy",
                      type: "address",
                    },
                  ],
                  internalType: "struct TimeTaskManager.TaskWithId[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "userAddress",
                  type: "address",
                },
              ],
              name: "getIsDev",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "userAddress",
                  type: "address",
                },
              ],
              name: "getIsLead",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "userAddress",
                  type: "address",
                },
              ],
              name: "getIsScrum",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getLastTaskIndex",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "taskId",
                  type: "uint256",
                },
              ],
              name: "getTask",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
                {
                  internalType: "enum TimeTaskManager.TaskStatus",
                  name: "",
                  type: "uint8",
                },
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getTasksCount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "taskId",
                  type: "uint256",
                },
                {
                  internalType: "enum TimeTaskManager.TaskStatus",
                  name: "status",
                  type: "uint8",
                },
              ],
              name: "updateTaskStatus",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
