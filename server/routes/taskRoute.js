const router = require('express').Router();
const Task = require('../models/taskModel');

router.get('/:listId',async(req,res)=>{
    const tasks = await Task.find({listId:req.params.listId});
    res.send(tasks);
})

router.post('/:listId',async(req,res)=>{
    const task = new Task({
        title:req.body.title,
        listId:req.params.listId
    }); 
    await task.save();
    res.send(task);
})


router.patch('/:id',async(req,res)=>{
    await Task.findByIdAndUpdate(req.params.id,req.body);
    res.send({message:'Task updated'});
})


router.delete('/:id',async(req,res)=>{
   const deletedTask = await Task.findByIdAndRemove(req.params.id);
   res.send({message:deletedTask.title + ' was deleted'});
})


router.get('/single-task/:taskId',async(req,res)=>{
    const task = await Task.findById(req.params.taskId);
    res.send(task);
})

//defult export
 module.exports = router;