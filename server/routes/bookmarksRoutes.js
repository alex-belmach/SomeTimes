var User     = require('../models/userModel.js');
var _        = require('lodash');

module.exports = function(app) {
    app.post('/addToBookmarks', function(req, res) {
        var username = req.body.article.username;
        var temp = _.cloneDeep(req.body.article);

        User.getUserByUsername(username, function(err, user) {
            if(err) {
                throw err;
            }

            if (_.some(user.bookmarks, { url: temp.url })) {
                res.status(202);
                res.send("Article has been already in bookmarks");
                return;
            }

            user.bookmarks.push(temp);
            user.save();
            res.status(202);
            res.send("Article was added to bookmarks");
        });
    });

    app.post('/deleteFromBookmarks', function(req, res) {
        var username = req.body.article.username;
        var newsTitle = req.body.article.title;
        User.deleteAccordingCriteria(username, { $pull: { 'bookmarks': { 'title': newsTitle } } }, function(response) {
            res.send(response);
        });
    });

    app.post('/checkIfExists/:username', function(req, res) {
        var username = req.params.username;
        var urlsArray = req.body.urls;

        User.getUserByUsername(username, function(err, user) {
            if(err) {
                throw err;
            }

            var existArray = _.map(urlsArray, function(url) {
                return _.some(user.bookmarks, function(bookmark) {
                    return bookmark.url === url;
                });
            });

            res.status(200);
            res.send(existArray);
        });
    });

    app.get('/getBookmarks/:username', function(req, res) {
        var username = req.params.username;
        User.getUserByUsername(username, function(err, user) {
            if(err) {
                throw err;
            }
            res.status(202);
            res.send({message: 'Get data success', bookmarks: user.bookmarks});
        });
    });

    return app;
};
