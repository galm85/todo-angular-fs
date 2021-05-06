const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type:String, 
        required:true,
        minlength:1,
        trim:true
    },
    listId:{
        type:String,
        required:true
    },
    complete:{
        type:Boolean,
        default:false
    }
})


const Task = mongoose.model('Task',taskSchema);

module.exports = Task;