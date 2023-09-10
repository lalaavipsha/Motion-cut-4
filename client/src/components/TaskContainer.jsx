// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// const TasksContainer = ({ socket }) => {
//   const [tasks, setTasks] = useState({});

//   useEffect(() => {
//     function fetchTasks() {
//       fetch("http://localhost:5000/api")
//         .then((res) => res.json())
//         .then((data) => setTasks(data));
//     }
//     fetchTasks();
//   }, []);

//   useEffect(() => {
//     socket.on("tasks", (data) => {
//       setTasks(data);
//     });
//   }, [socket]);

//   const handleDragEnd = ({ destination, source }) => {
//     if (!destination) return;
//     if (
//       destination.index === source.index &&
//       destination.droppableId === source.droppableId
//     )
//       return;

//     socket.emit("taskDragged", {
//       source,
//       destination,
//     });
//   };
//   return (
//     <div className="container">
//       {console.log("rendering")}
//       <DragDropContext onDragEnd={handleDragEnd}>
//         {Object.entries(tasks).map((task) => (
//           <div
//             className={`${task[1].title.toLowerCase()}__wrapper`}
//             key={task[1].title}
//           >
//             <h3>{task[1].title} Tasks</h3>
//             <div className={`${task[1].title.toLowerCase()}__container`}>
//               <Droppable droppableId={task[1].title}>
//                 {(provided) => (
//                   <div ref={provided.innerRef} {...provided.droppableProps}>
//                     {task[1].items.map((item, index) => (
//                       <Draggable
//                         key={item.id}
//                         draggableId={item.id}
//                         index={index}
//                       >
//                         {(provided) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className={`${task[1].title.toLowerCase()}__items`}
//                           >
//                             <p>{item.title}</p>
//                             <p className="comment">
//                               <Link
//                                 to={`/comments/${task[1].title}/${item.id}`}
//                               >
//                                 {item.comments
//                                   ? `View Comments`
//                                   : "Add Comment"}
//                               </Link>
//                             </p>
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           </div>
//         ))}
//       </DragDropContext>
//     </div>
//   );
// };

// export default TasksContainer;

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const TasksContainer = ({ socket }) => {
//   const [tasks, setTasks] = useState({});

//   useEffect(() => {
//     function fetchTasks() {
//       fetch("http://localhost:5000/api")
//         .then((res) => res.json())
//         .then((data) => setTasks(data));
//     }
//     fetchTasks();
//   }, []);

//   useEffect(() => {
//     socket.on("tasks", (data) => {
//       setTasks(data);
//     });
//   }, [socket]);

//   const handleDragEnd = ({ destination, source }) => {
//     if (!destination) return;
//     if (
//       destination.index === source.index &&
//       destination.droppableId === source.droppableId
//     )
//       return;

//     socket.emit("taskDragged", {
//       source,
//       destination,
//     });
//   };

//   const handleDeleteTask = (category, taskId) => {
//     // Emit an event to the server to delete the task
//     socket.emit("deleteTask", {
//       category,
//       taskId,
//     });
//   };

//   return (
//     <div className="container">
//       {console.log("rendering")}
//       <DragDropContext onDragEnd={handleDragEnd}>
//         {Object.entries(tasks).map((task) => (
//           <div
//             className={`${task[1].title.toLowerCase()}__wrapper`}
//             key={task[1].title}
//           >
//             <h3>{task[1].title} Tasks</h3>
//             <div className={`${task[1].title.toLowerCase()}__container`}>
//               <Droppable droppableId={task[1].title}>
//                 {(provided) => (
//                   <div
//                     className="task-list" // Add a class for styling
//                     style={{ maxHeight: "500px", overflowY: "auto" }} // Scrollable styles
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                   >
//                     {task[1].items.map((item, index) => (
//                       <Draggable
//                         key={item.id}
//                         draggableId={item.id}
//                         index={index}
//                       >
//                         {(provided) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className={`${task[1].title.toLowerCase()}__items`}
//                           >
//                             <p>{item.title}</p>
//                             <p className="comment">
//                               <Link
//                                 to={`/comments/${task[1].title}/${item.id}`}
//                               >
//                                 {item.comments
//                                   ? `View Comments`
//                                   : "Add Comment"}
//                               </Link>
//                             </p>
//                             <button
//                               onClick={() =>
//                                 handleDeleteTask(task[1].title, item.id)
//                               }
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           </div>
//         ))}
//       </DragDropContext>
//     </div>
//   );
// };

// export default TasksContainer;

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const TasksContainer = ({ socket }) => {
//   const [tasks, setTasks] = useState({});
//   const [editableTaskId, setEditableTaskId] = useState(null);

//   useEffect(() => {
//     function fetchTasks() {
//       fetch("http://localhost:5000/api")
//         .then((res) => res.json())
//         .then((data) => setTasks(data));
//     }
//     fetchTasks();
//   }, []);

//   useEffect(() => {
//     socket.on("tasks", (data) => {
//       setTasks(data);
//     });
//   }, [socket]);

//   const handleDragEnd = ({ destination, source }) => {
//     if (!destination) return;
//     if (
//       destination.index === source.index &&
//       destination.droppableId === source.droppableId
//     )
//       return;

//     socket.emit("taskDragged", {
//       source,
//       destination,
//     });
//   };

//   const handleDeleteTask = (category, taskId) => {
//     // Emit an event to the server to delete the task
//     socket.emit("deleteTask", {
//       category,
//       taskId,
//     });
//   };

//   const handleRenameTask = (taskId, newTitle) => {
//     // Emit an event to the server to rename the task
//     socket.emit("renameTask", {
//       taskId,
//       newTitle,
//     });
//   };

//   return (
//     <div className="container">
//       {console.log("rendering")}
//       <DragDropContext onDragEnd={handleDragEnd}>
//         {Object.entries(tasks).map((task) => (
//           <div
//             className={`${task[1].title.toLowerCase()}__wrapper`}
//             key={task[1].title}
//           >
//             <h3>{task[1].title} Tasks</h3>
//             <div className={`${task[1].title.toLowerCase()}__container`}>
//               <Droppable droppableId={task[1].title}>
//                 {(provided) => (
//                   <div
//                     className="task-list" // Add a class for styling
//                     style={{ maxHeight: "500px", overflowY: "auto" }} // Scrollable styles
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                   >
//                     {task[1].items.map((item, index) => (
//                       <Draggable
//                         key={item.id}
//                         draggableId={item.id}
//                         index={index}
//                       >
//                         {(provided) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className={`${task[1].title.toLowerCase()}__items`}
//                           >
//                             {editableTaskId === item.id ? (
//                               <input
//                                 type="text"
//                                 value={item.title}
//                                 onChange={(e) =>
//                                   handleRenameTask(item.id, e.target.value)
//                                 }
//                                 onBlur={() => setEditableTaskId(null)}
//                                 autoFocus
//                               />
//                             ) : (
//                               <p onClick={() => setEditableTaskId(item.id)}>
//                                 {item.title}
//                               </p>
//                             )}
//                             <p className="comment">
//                               <Link
//                                 to={`/comments/${task[1].title}/${item.id}`}
//                               >
//                                 {item.comments
//                                   ? `View Comments`
//                                   : "Add Comment"}
//                               </Link>
//                             </p>
//                             <button
//                               onClick={() =>
//                                 handleDeleteTask(task[1].title, item.id)
//                               }
//                               className="delete-button"
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           </div>
//         ))}
//       </DragDropContext>
//     </div>
//   );
// };

// export default TasksContainer;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TasksContainer = ({ socket }) => {
  const [tasks, setTasks] = useState({});
  const [editableTaskId, setEditableTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");

  useEffect(() => {
    function fetchTasks() {
      fetch("http://localhost:5000/api")
        .then((res) => res.json())
        .then((data) => setTasks(data));
    }
    fetchTasks();
  }, []);

  useEffect(() => {
    socket.on("tasks", (data) => {
      setTasks(data);
    });
  }, [socket]);

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    socket.emit("taskDragged", {
      source,
      destination,
    });
  };

  const handleDeleteTask = (category, taskId) => {
    // Emit an event to the server to delete the task
    socket.emit("deleteTask", {
      category,
      taskId,
    });
  };

  const handleRenameTask = (taskId, newTitle) => {
    // Emit an event to the server to rename the task
    socket.emit("renameTask", {
      taskId,
      newTitle,
    });
    setEditableTaskId(null); // Disable editing after renaming
  };

  return (
    <div className="container">
      {console.log("rendering")}
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.entries(tasks).map((task) => (
          <div
            className={`${task[1].title.toLowerCase()}__wrapper`}
            key={task[1].title}
          >
            <h3>{task[1].title} Tasks</h3>
            <div className={`${task[1].title.toLowerCase()}__container`}>
              <Droppable droppableId={task[1].title}>
                {(provided) => (
                  <div
                    className="task-list" // Add a class for styling
                    style={{ maxHeight: "500px", overflowY: "auto" }} // Scrollable styles
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {task[1].items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${task[1].title.toLowerCase()}__items`}
                          >
                            {editableTaskId === item.id ? (
                              <input
                                type="text"
                                value={editedTaskTitle}
                                onChange={(e) => setEditedTaskTitle(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleRenameTask(item.id, editedTaskTitle);
                                  }
                                }}
                                onBlur={() => setEditableTaskId(null)}
                                autoFocus
                              />
                            ) : (
                              <p onClick={() => {
                                setEditedTaskTitle(item.title);
                                setEditableTaskId(item.id);
                              }}>
                                {item.title}
                              </p>
                            )}
                            <p className="comment">
                              <Link
                                to={`/comments/${task[1].title}/${item.id}`}
                              >
                                {item.comments
                                  ? `View Comments`
                                  : "Add Comment"}
                              </Link>
                            </p>
                            <button
                              onClick={() =>
                                handleDeleteTask(task[1].title, item.id)
                              }
                              className="delete-button"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default TasksContainer;
