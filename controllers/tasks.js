const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');

const getAllTask = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  // return res.status(200).json({ tasks, amount: tasks.length });
  return res
    .status(200)
    .json({ status: 'success', data: { tasks, nbHits: tasks.length } });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);

  return res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }

  return res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }

  return res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  return res.status(200).json({ id: taskID, data: req.body });
});

module.exports = { getAllTask, createTask, getTask, updateTask, deleteTask };
