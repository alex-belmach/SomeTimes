var User     = require('../models/userModel.js'),
    passport = require('passport');

var USERNAME = "";
var ID;

module.exports = function(app) {
    app.post('/register', function(req, res) {
        var name      = req.body.name;
        var email     = req.body.email;
        var username  = req.body.username;
        var password  = req.body.password;
        var password2 = req.body.password2;

        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

        var errors = req.validationErrors();

        if(errors) {
            res.status(401);
            res.send('Unregistered');
        }
        else {
            var newUser = new User({
                avatarurl: "../resources/min/profile.png",
                username: username
            });
            newUser.local = {
                name: name,
                email: email,
                password: password
            };

            User.createUser(newUser, function(err, user) {
                if(err) {
                    throw err;
                }
            });
            res.status(201);
            res.send('Registered');
        }
    });

    app.post('/login', passport.authenticate('local'), function(req, res) {
        var avatarUrl = "";
        USERNAME = req.user.username;
        User.getUserByUsername(USERNAME, function(err, user) {
            if(err) {
                throw err;
            }
            avatarUrl = user.avatarurl;
            ID = user._id;
            console.log(req.user);
            res.status(202);
            res.send({message: 'Authorized', avatarUrl: avatarUrl});
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.status(200);
        res.send('Logged out');
    });

    app.post('/uploadAvatar', function(req, res) {
        User.update({_id: ID}, {
            avatarurl: req.body.avatarUrl
        }, function(err, docs) {
            if(err) {
                throw err;
            }
        });
        res.status(200);
        res.send('Avatar was uploaded');
    });

    app.get('/currentUser', function(req, res) {
        console.log(req.user);
        if (!req.user) {
            res.send('123');
            return;
        }
        User.findOne({ username: req.user.username }, function(err, user) {
            res.send(user);
        });
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
    app.get('/auth/twitter', passport.authenticate('twitter', {}));

    app.get('/auth/facebook/callback',
            passport.authenticate('facebook', { failureRedirect: '/' }));

    app.get('/auth/twitter/callback',
            passport.authenticate('twitter', { failureRedirect: '/', successRedirect: '/' }));

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('http://localhost:8000/');
    }

    return app;
};
