const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const { sendWelcomeMail, sendCancelMail } = require('../emails/account');


const app = new express.Router();
// router.get('/test', (req, res) => {
//     res.send('From new file');
// });

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        const token = await user.generateAuthToken();
        sendWelcomeMail(user.email, user.name);
        //await user.save();
        res.status(201).send({user, token});
    } catch(e) {
        res.status(400).send(e);
    }


    // user.save().then((result) => {
    //     res.status(201).send(user);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // })
});
app.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

app.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send('Logged out of all sessions');
    } catch (e) {
        res.status(500).send();
    }
})

app.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCred(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send({error});
    }
})

app.get('/users/me', auth, async (req,res) => {
    
    res.send(req.user);
    
})


app.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];

    const isValid = updates.every((update) => allowedUpdates.includes(update));
    if(!isValid) {
        return res.status(400).send({error: 'Invalid update!'});
    }
    try {
        // const user = await User.findById(req.params.id);
        updates.forEach((update) => {
            req.user[update] = req.body[update];
        });
        await req.user.save();
        
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        // if(!user) {
        //     return res.status(404).send();
        // }
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.delete('/users/me', auth, async (req, res) => {
    try {
        //const user = await User.findByIdAndDelete(req.user._id);
        // if(!user) {
        //     return res.status(404).send();
        // }
        await req.user.remove();
        sendCancelMail(req.user.email, req.user.name);
        res.send(req.user);

    } catch (e) {
        res.status(500).send();
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Accepted file types: \.jpg, \.jpeg, \.png'));
        }
        cb(undefined, true);
    }
});
app.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 300, height: 400 }).png().toBuffer();
    
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (err, req, res, next) => {
    res.status(400).send({error: err.message});
});

app.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
});

app.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar) {
            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send();
    }
})

module.exports = app;