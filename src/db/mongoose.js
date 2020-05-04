const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useCreateIndex:true, useFindAndModify: false})



// const me = new User({
//     name: '     Rahul      ',    
//     email: 'rbhola89@gmail.com         ',
//     password: 'rahul123'
// });

// me.save().then((result) => {
//     console.log(me);
// }).catch((err) => {
//     console.log(err);
// });


// const task = new Task({
//     description: "Learn",
//     completed: false
// });

// task.save().then((result) => {
//     console.log(task);
// }).catch((err) => {
//     console.log(err);
// })
