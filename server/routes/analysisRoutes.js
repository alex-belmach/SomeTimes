var pos         = require('pos');
var _           = require('lodash');
var multipliers = require('../config/analysisConfig.js').multipliers;
var tagger      = new pos.Tagger();

module.exports = function(app) {
    app.post('/getWordsWeightMultipliers', function(req, res) {
        var words = new pos.Lexer().lex(_.join(req.body.words, ' '));

        var taggedWords = tagger.tag(words),
            multiplierArray = _.map(taggedWords, function(taggedWord) {
                return _.find(multipliers, { tag: taggedWord[1] }).multiplier;
            });

        res.status(200);
        res.send(multiplierArray);
    });

    return app;
};
