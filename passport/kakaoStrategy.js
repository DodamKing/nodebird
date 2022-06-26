const kakaoStrategy = require('passport-kakao').Strategy;
const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new kakaoStrategy({
        clientID : process.env.KAKAO_ID,
        // callbackURL : 'auth/kakao/callback'
        callbackURL : 'http://127.0.0.1:9090/auth/kakao/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const exUser = await User.findOne({where : {snsId : profile.id, provider : 'kakao'}});
            if (exUser) {
                await User.update({
                    email : profile._json && profile._json.account_email,
                    nick : profile.displayName
                }, {where : {snsId : profile.id}});
                done(null, exUser);
            }
            else {
                const newUser = await User.create({
                    email : profile._json && profile._json.account_email,
                    nick : profile.displayName,
                    snsId : profile.id,
                    provider : 'kakao'
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};