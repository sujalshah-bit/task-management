const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default:false
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Task = mongoose.model('Task', taskSchema, 'tasks'); 

module.exports = Task; 