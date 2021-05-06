const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 4001;

const listsRoute = require('./routes/listsRoute');
const tasksRoute = require('./routes/taskRoute');


//connect to MongoDB
mongoose.connect(process.env.MONGO_URI,{
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(console.log('Conntect to MongoDB :)')).catch(e=>{console.log('Error: ',e)});


app.use(cors());
app.use(express.json());


app.use('/lists',listsRoute);
app.use('/tasks',tasksRoute);

app.get('/',(req,res)=>{
    res.send('Task Manager server root');
})





app.listen(PORT,()=>console.log(`Server is running on Port: ${PORT}`));