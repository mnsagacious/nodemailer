const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
    taskname:{
        type:String,
    },
    frequency:{
        type:String
    },
    assignDate:{
        type:String
    }
})
const Task = new mongoose.model('Task',taskSchema)
module.exports = Task