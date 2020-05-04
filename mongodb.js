
const {MongoClient, ObjectID } = require("mongodb");
const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'Task-manager';

const id = new ObjectID();
console.log(id);
MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if(err) {
        return console.log('Unable to connect to database');
    }
    //console.log("Connected!!")

    const db = client.db(databaseName);

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Clean the house',
    //         completed: true
    //     },
    //     {
    //         description: 'Renew Inspection',
    //         completed: false
    //     },
    //     {
    //         description: 'Pot plants',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert');
    //     }
    //     console.log(result.ops);
    // })
    
    // db.collection('users').findOne({_id: new ObjectID("5ead2ad4267314632c49e675")}, (error, user) => {
    //     if(error) {
    //         return console.log('Unable to fetch data')
    //     }
    //     if(user) {
    //         return console.log(user);
    //     }
    //     console.log('User not found');
            
    // })

    // db.collection('users').find({age: 27}).toArray((error, users) => {
    //     console.log(users);
    // })

    // db.collection('users').find({age: 27}).count((error, count) => {
    //     console.log(count);
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5ead47429e837b7570b3aaf8")
    // }, {$inc: {
    //     Age: 1
    // }}).then((result) => {
    //     console.log(result);
    // }).catch((err) => {
    //     console.log(err);
    // });

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((err) => {
    //     console.log(err);
    // })

    db.collection('users').deleteOne({Age: 28} | {name: 'Rahul'}, )

});

