// // console.log('something');
// const express = require("express");//default nodejs supports commonjs tai eibhabe import-export kora hoy, proper import likhe korte hole package.json e type: module add korte hobe.
// const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const {Server} = require("socket.io");
// const cors = require("cors");

// // Dummy data
// const UID = () => Math.random().toString(36).substring(2, 10);

// let tasks = {
//   pending: {
//     title: "pending",
//     items: [
//       {
//         id: UID(),
//         title: "Send the Figma file to Dima",
//         comments: [],
//       },
//     ],
//   },
//   ongoing: {
//     title: "ongoing",
//     items: [
//       {
//         id: UID(),
//         title: "Review GitHub issues",
//         comments: [
//           {
//             name: "David",
//             text: "Ensure you review before merging",
//             id: UID(),
//           },
//         ],
//       },
//     ],
//   },
//   completed: {
//     title: "completed",
//     items: [
//       {
//         id: UID(),
//         title: "Create technical contents",
//         comments: [
//           {
//             name: "Dima",
//             text: "Make sure you check the requirements",
//             id: UID(),
//           },
//         ],
//       },
//     ],
//   },
// };
// const io = new Server(server, {
//     cors:{
//         origin: "http://localhost:5173",
//     },
// });
// const PORT = 5000;

// app.get("/api", (req, res) => {
//     res.json(tasks);
//   });

// io.on("connection", (socket) =>{
//     console.log(`${socket.id} a user is connected`);
// });

// server.listen(PORT, () => {
//     console.log(`server is running on ${PORT}`);
// })


// console.log('something');

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const socketIO = new Server(server, {
    cors: {
      origin: "http://127.0.0.1:5173",
    },
  });
const cors = require("cors");
app.use(cors());

// Dummy data
const UID = () => Math.random().toString(36).substring(2, 10);

let tasks = {
  pending: {
    title: "pending",
    items: [
      {
        id: UID(),
        title: "Send the Figma file to Dima",
        comments: [],
      },
    ],
  },
  ongoing: {
    title: "ongoing",
    items: [
      {
        id: UID(),
        title: "Review GitHub issues",
        comments: [
          {
            name: "David",
            text: "Ensure you review before merging",
            id: UID(),
          },
        ],
      },
    ],
  },
  completed: {
    title: "completed",
    items: [
      {
        id: UID(),
        title: "Create technical contents",
        comments: [
          {
            name: "Dima",
            text: "Make sure you check the requirements",
            id: UID(),
          },
        ],
      },
    ],
  },
};
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//   },
// });
const PORT = 5000;

app.get("/api", (req, res) => {
  res.json(tasks);
});

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} a user is connected`);

  socket.on("createTask", (data) => {
    console.log(data);
    // construct an object like the data struct
    const newTask = { id: UID(), title: data, comments: [] };
    // add the task to the pending category
    tasks["pending"].items.push(newTask);

    // fires the event for update
    socketIO.sockets.emit("tasks", tasks);
  });

  socket.on("addComment", (data) => {
    const taskItems = tasks[data.category].items;
    for (let i = 0; i < taskItems.length; i++) {
      if (taskItems[i].id === data.id) {
        taskItems[i].comments.push({
          name: data.userId,
          text: data.comment,
          id: UID(),
        });
        socket.emit("comments", taskItems[i].comments);
      }
    }
  });

  socket.on("fetchComments", (data) => {
    const { category, id } = data;
    const taskItems = tasks[category].items;

    for (let taskItem of taskItems) {
      if (taskItem.id === id) {
        socket.emit("comments", taskItem.comments);
      }
    }
  });

  socket.on("taskDragged", (data) => {
    const { source, destination } = data;
    const itemMoved = {
      ...tasks[source.droppableId].items[source.index],
    };

    tasks[source.droppableId].items.splice(source.index, 1);
    tasks[destination.droppableId].items.splice(
      destination.index,
      0,
      itemMoved
    );

    socketIO.sockets.emit("tasks", tasks);

    });
    socket.on("deleteTask", (data) => {
      const { category, taskId } = data;
      
      // Check if the category exists in the tasks object
      if (tasks.hasOwnProperty(category)) {
        const taskItems = tasks[category].items;
    
        // Find the index of the task to delete
        const taskIndex = taskItems.findIndex((task) => task.id === taskId);
    
        if (taskIndex !== -1) {
          // Remove the task from the array
          taskItems.splice(taskIndex, 1);
          // Notify all clients about the task deletion
          socketIO.sockets.emit("tasks", tasks);
        }
      } else {
        console.log(`Category '${category}' does not exist.`);
      }
    });
    socket.on("renameTask", (data) => {
      const { taskId, newTitle } = data;
      
      // Iterate through all categories to find and rename the task
      for (const category in tasks) {
        const taskItems = tasks[category].items;
    
        for (let i = 0; i < taskItems.length; i++) {
          if (taskItems[i].id === taskId) {
            taskItems[i].title = newTitle;
            socketIO.sockets.emit("tasks", tasks); // Notify all clients about the task rename
            break; // Exit the loop once the task is renamed
          }
        }
      }
    });
    

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});