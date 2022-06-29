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

module.exports = router;