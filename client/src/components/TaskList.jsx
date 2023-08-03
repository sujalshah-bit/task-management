import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://task-management-apoi-v1.vercel.app/api/v1/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleTaskSubmit = async (values, actions) => {
    try {
      await axios.post("https://task-management-apoi-v1.vercel.app/api/v1/tasks", values);
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
    actions.resetForm();
  };

  const handleTaskUpdate = () => {
    fetchTasks();
  };

  const handleTaskDelete = () => {
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === "all") return true;
    return statusFilter === "completed" ? task.status : !task.status;
  });

  return (
    <>
      <div className="container mx-auto glassmorphism-box">
        <TaskForm onSubmit={handleTaskSubmit} />
        <div className="my-4">
          <button
            className={`mr-2 ${
              statusFilter === "all" ? "text-indigo-600 font-bold" : "text-white"
            } hover:text-indigo-400 focus:outline-none`}
            onClick={() => setStatusFilter("all")}
          >
            All
          </button>
          <button
            className={`mr-2 ${
              statusFilter === "completed" ? "text-indigo-500 font-bold" : "text-white"
            } hover:text-indigo-400 focus:outline-none`}
            onClick={() => setStatusFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`${
              statusFilter === "active" ? "text-indigo-600 font-bold" : "text-white"
            } hover:text-indigo-400 focus:outline-none`}
            onClick={() => setStatusFilter("active")}
          >
            Active
          </button>
        </div>
        <div>
          {filteredTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onUpdate={handleTaskUpdate}
              onDelete={handleTaskDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskList;
