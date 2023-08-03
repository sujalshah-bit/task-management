const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Task = require("../models/taskSchema");

// Create a new task
router.post(
    "/tasks",
    [
      body("title").notEmpty().withMessage("Title is required"),
      body("description").notEmpty().withMessage("Description is required"),
    ],
    async (req, res) => {
      try {
        // Check for validation errors
        console.log('1')
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('2')
          return res.status(422).json({ errors: errors.array() });
        }
  
        const { title, description } = req.body;
        const task = new Task({ title, description });
        const savedTask = await task.save();
        res.status(201).json(savedTask);
      } catch (error) {
        console.error(`Error in creating a new task: ${error}`);
        res.status(500).json({ error: "Failed to create task" });
      }
    }
  );

// Read all tasks
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(`Error in getting all the task: ${error}`)
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

// Read a single task by ID
router.get("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error(`Error in getting single task: ${error}`)
        res.status(500).json({ error: "Failed to fetch task" });
  }
});

// Update a task by ID
router.put("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const updateData = {};

    // Check if title is present in the request body and update it if so
    if (req.body.title) updateData.title = req.body.title;

    // Check if description is present in the request body and update it if so
    if (req.body.description) updateData.description = req.body.description;

    // Check if status is present in the request body and update it if so
    if (req.body.status !== undefined) updateData.status = req.body.status;

    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(`Error in updating the task:${error}`)
    res.status(400).json({ error: "Failed to update task" });
}
});

// Delete a task by ID
router.delete("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(`Error in Deleting the task:${error}`)
        res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports= router;
