const express = require('express');
const { User } = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({where : {id : req.user.id}});
        await user.addFollowing(parseInt(req.params.id, 10));
        res.send('succes');
    } catch {
        console.error(error);
        next(error);
    }
});

router.post('/:id/unfol', isLoggedIn, async (req, res, next) => {
    try {
        console.log(req.params.id);
        console.log(req.query);
        // const user = await User.findOne({where : {id : req.params.id}});
        // console.log(user);
    } catch {
        console.error(error);
        next(error);
    }
});

router.post('/unfol', isLoggedIn, async (req, res, next) => {
    try {
        const idx = req.session.passport.user;
        const userIdx = req.query.id;

        const user = await User.findOne({where : {id : userIdx}});
        console.log(userIdx, idx);

        await user.removeFollower(idx);
        res.send(200);
    } catch {
        console.error(error);
        next(error);
    }
});

router.post('/profile_update', isLoggedIn, async (req, res) => {
    const idx = req.session.passport.user;
    const nick = req.body.nick;
    const email = req.body.email;

    console.log('idx: ' + idx);
    console.log(`nick : ${nick}`);
    console.log(`email : ${email}`);

    await User.update({email : email}, {nick : nick}, {where : {id : idx}});

    res.send();
});

module.exports = router;