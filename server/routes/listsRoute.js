const router = require('express').Router();
const List = require('../models/listModel');

router.get('/',async(req,res)=>{
    const lists = await List.find({});
    res.send(lists);
})

router.post('/',async(req,res)=>{
    const list = new List(req.body); 
    await list.save();
    res.send(list);
})


router.patch('/:id',async(req,res)=>{
    await List.findByIdAndUpdate(req.params.id,req.body);
    res.send({message:'List updated'});
})


router.delete('/:id',async(req,res)=>{
   const deletedList = await List.findByIdAndRemove(req.params.id);
   res.send({message:'The list: ' +deletedList.title + ' deleted'});
})

//defult export
 module.exports = router;