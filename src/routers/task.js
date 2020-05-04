const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const app = new express.Router();

app.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    
    //const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.patch('/tasks/:id',auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed', 'description'];
    const isvalid = updates.every((update) => allowedUpdates.includes(update));

    if(!isvalid) {
        return res.status(400).send({error: 'Invalid update'});
    }

    try {
        _id = req.params.id;
        const task = await Task.findOne({_id, owner: req.user._id});
        //const task = await Task.findById(req.params.id);
        if(!task) {
            return res.status(404).send();
        }
        updates.forEach((update) => {
            task[update] = req.body[update];
        });
        await task.save();
        
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        
        res.send(task);
    } catch(err) {
        res.status(400).send(err);
    }
});

//GET /tasks?completed=true  : structure of query
//GET /tasks?Limit=10&skip=0
//GET /tasks?sortBy=createdAt_asc

app.get('/tasks', auth, async (req,res) => {
    const match = {};
    const sort = {};
    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy) {
        const reqArr = req.query.sortBy.split('_');
        
        sort[reqArr[0]] = reqArr[1] === 'asc' ? 1:-1; 
    }

    try {
        //const tasks = await Task.find({owner: req.user._id});
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send();
    }
});

app.get('/tasks/:id',auth, async (req, res) => {
    _id = req.params.id;
    try {
        const task = await Task.findOne({ _id ,owner: req.user._id })
        
        //const task = await Task.findById(_id);
        if(!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});


app.delete('/tasks/:id', auth, async (req, res) => {
    try {
        _id = req.params.id;
        //const task = await Task.findByIdAndDelete(req.params.id);
        const task = await Task.findOneAndDelete({_id, owner: req.user._id});
        if(!task) {
            return res.status(404).send();
        }
        //await task.remove();
        res.send(task);

    } catch (e) {
        res.status(500).send();
    }
});

module.exports = app;