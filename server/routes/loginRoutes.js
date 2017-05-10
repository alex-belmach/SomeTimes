var User     = require('../models/userModel.js'),
    passport = require('passport');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index.tmpl.html');
    });

    app.get('/currentUser', function(req, res) {
        if (!req.user) {
            res.send();
            return;
        }
        User.findOne({ username: req.user.username }, function(err, user) {
            var response = {
                username: user.username,
                avatarurl: user.avatarurl
            };
            res.send(response);
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.status(200);
        res.send();
    });

    app.post('/login', passport.authenticate('local'), function(req, res) {
        res.status(202);
        res.send();
    });

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

    app.post('/uploadAvatar', function(req, res) {
        User.update({ username: req.body.username }, {
            avatarurl: req.body.avatarUrl
        }, function(err, docs) {
            if(err) {
                throw err;
            }
        });
        res.status(200);
        res.send('Avatar was uploaded');
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
    app.get('/auth/twitter', passport.authenticate('twitter', {}));

    app.get('/auth/facebook/callback', passport.authenticate('facebook'), function(req, res) {
        res.redirect('/');
    });

    app.get('/auth/twitter/callback', passport.authenticate('twitter'), function(req, res) {
        res.redirect('/');
    });
    return app;
};
