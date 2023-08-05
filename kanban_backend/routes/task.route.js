const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

/**
 * @POST create new resource
 * @GET Get
 * @DELETE delete
 * @PUT update
 */

router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.get("/:taskId", taskController.getSpecificTask);

router.delete("/:taskId", taskController.deleteTask);
router.put("/:taskId", taskController.editTask);

module.exports = router;
