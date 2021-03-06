const express = require('express');
const { Post, User } = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

const router = express.Router();

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {title: '내 정보 - NodeBird', user : req.user});
});

router.get('/join', isNotLoggedIn, (req, res) => {
    console.log(req.user);
    res.render('join', {
        title : '회원가입 - NodeBird',
        user : req.user,
        joinError : req.flash('joinError')
    });
});

router.get('/profile_update', isLoggedIn, (req, res) => {
    res.render('profile_update', {user : req.user});
});

router.get('/', (req, res, next) => {
    Post.findAll({
        include : {
            model : User,
            attributes : ['id', 'nick']
        },
        order : [['createdAt', 'DESC']]
    })
    .then((posts) => {
        res.render('main', {
            title : 'NodeBird',
            twits : posts,
            user : req.user,
            loginError : req.flash('loginError')
        });
    })
    .catch((error) => {
        console.error(error);
        next(error);
    });

});

module.exports = router;