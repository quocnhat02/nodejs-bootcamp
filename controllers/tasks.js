const Task = require('../models/Task');

const getAllTask = (req, res) => {
  return res.send('get all tasks');
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    return res.status(201).json({ task });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getTask = (req, res) => {
  return res.json({ id: req.params.id });
};

const updateTask = (req, res) => {
  return res.send('update task');
};

const deleteTask = (req, res) => {
  return res.send('delete task');
};

module.exports = { getAllTask, createTask, getTask, updateTask, deleteTask };
