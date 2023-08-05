const Task = require("../models/task.model");

module.exports = {
  createTask: async (req, res) => {
    const newTask = new Task({
      content: req.body.content,
    });

    try {
      /// insert into TASKS values ...........
      const savedTask = await newTask.save();

      return res.status(201).json(savedTask);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getAllTasks: async (req, res) => {
    try {
      /// select * from tasks
      const tasks = await Task.find();

      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getSpecificTask: async (req, res) => {
    try {
      /// select * from tasks where id = req.params.taskId
      const task = await Task.findById(req.params.taskId);//taskId: passer en paramtetre du l'url

      if (!task) {
        return res
          .status(404)
          .json({ message: `Task not found for this id ${req.params.taskId}` });
      }

      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  deleteTask: async (req, res) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.taskId);

      if (!deletedTask) {
        return res
          .status(404)
          .json({ message: `Task not found for this id ${req.params.taskId}` });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  editTask: async (req, res) => {
    try {
      const availableStatus = ["todo", "ticket", "progress", "complete"];
      const status = req.body.status;

      /// check if the task status is valid
      if (availableStatus.includes(status)) {
        /// Update task status if the task id is valid
        const updatedTask = await Task.findByIdAndUpdate(
          req.params.taskId,
          {
            status: status,
          },
          { new: true }
        );

        if (!updatedTask) {
          return res.status(404).json({
            message: `Task not found for this id ${req.params.taskId}`,
          });
        }

        return res.status(200).json(updatedTask);
      }
      /// if status is not valid
      else {
        return res.status(400).json({ msg: "Invalid status value" });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
