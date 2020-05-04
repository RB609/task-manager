const express = require('express');
require('./db/mongoose');
const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');


const app = express();
const port = process.env.PORT;

// app.use((req, res, next) => {
//     if(req.method === 'GET') {
//         res.send('GET requests are disabled');
//     }
//     else {
//         next();
//     }
// });

// app.use((req, res, next) => {
//     res.status(503).send('Site under maintenence. Try again in a few hours');
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const jwt = require('jsonwebtoken');

const myfunc = async () => {
    const token = jwt.sign( {_id: 'abc123'}, process.env.JWT_SECRET, { expiresIn: '0 second' });
    console.log(token);

    const data = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log(data)
}

//myfunc();


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

//const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    // const task = await Task.findById('5eafce0506ceea0a38b47ecc');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);
    
    // const user = await User.findById('5eafcce64ea6e7267c9b8429');
    
    // await user.populate('tasks').execPopulate();
    // console.log(user.tasks);
}
main();

