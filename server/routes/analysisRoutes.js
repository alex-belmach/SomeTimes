var User     = require('../models/userModel.js');
var pos         = require('pos');
var _           = require('lodash');
var multipliers = require('../config/analysisConfig.js').multipliers;
var tagger      = new pos.Tagger();

module.exports = function(app) {
    app.post('/getWordsWeightMultipliers', function(req, res) {
        var words = req.body.words,
            lowercaseWords = _.map(words, _.toLower),
            PROPER_NOUN_TAG = 'NNP',
            PLURAL_PROPER_NOUN_TAG = 'NNPS',
            NOUN_TAG = 'NN',
            PLURAL_NOUNT_TAG = 'NNS';

        var taggedWords = tagger.tag(words),
            lowerTaggedWords = tagger.tag(lowercaseWords),
            multiplierArray = _.map(taggedWords, function(taggedWord, index) {
                var originalTag = taggedWord[1],
                    lowerTag = lowerTaggedWords[index][1];

                if ((originalTag === PROPER_NOUN_TAG || originalTag === PLURAL_PROPER_NOUN_TAG)
                    && (lowerTag !== PROPER_NOUN_TAG && lowerTag !== PLURAL_PROPER_NOUN_TAG
                        && lowerTag !== NOUN_TAG && lowerTag !== PLURAL_NOUNT_TAG)) {
                            return _.find(multipliers, { tag: lowerTag }).multiplier;
                        }

                return _.find(multipliers, { tag: originalTag }).multiplier;
            });

        res.status(200);
        res.send(multiplierArray);
    });

    app.post('/saveDocuments/', function(req, res) {
        var username = req.body.username;
        var documentsArray = req.body.documents;

        User.getUserByUsername(username, function(err, user) {
            if(err) {
                throw err;
            }

            user.documents = documentsArray;
            user.save();
            res.status(202);
            res.send();
        });
    });

    app.get('/getDocuments/:username', function(req, res) {
        var username = req.params.username;
        User.getUserByUsername(username, function(err, user) {
            if(err) {
                throw err;
            }
            res.status(200);
            res.send({ documents: user.documents || '[]' });
        });
    });

    return app;
};
