(function() {
    'use strict';

    analysisService.$inject = [
        '$http',
        '$q',
        'CONSTANTS'
    ];

    angular
        .module('app')
        .service('analysisService', analysisService);

    function analysisService(
        $http,
        $q,
        CONSTANTS
    ) {
        var stopWords,
            weightCache,
            documents = [],
            keyWordList = [],
            KEY_WORDS_NUM = 5;

        return {
            addArticle: addArticle
        };

        function addArticle(article) {
            var addTitle = addString(article.title),
                addDescription = addString(article.description);

            $q.all([addTitle, addDescription])
                .then(resetKeyWordList)
                .then(analyse)
                .then(cleanUp)
                .then(console.log);
        }

        //TODO: add priority
        function addString(string) {
            return buildDocument(string)
                .then(addDocument);
        }

        function buildDocument(string) {
            return $q.when(string)
                .then(tokenizeString)
                .then(removeStopWords)
                .then(removeNumbers)
                .then(countWords);
        }

        function analyse() {
            weightCache = {};
            _.forEach(keyWordList, function(keyWordObj) {
                keyWordObj.value = _.reduce(documents, function(keyWordWeight, document) {
                    return keyWordWeight + (document.hasOwnProperty(keyWordObj.word)
                                            ? getWordWeightInDocument(keyWordObj.word, document)
                                            : 0);
                }, 0);
                keyWordObj.value = _.round(keyWordObj.value, 4);
            });
            return keyWordList;
        }

        function cleanUp(keyWordList) {
            keyWordList.sort(function(first, second) {
                return first.value - second.value;
            });
            keyWordList = _.slice(keyWordList, 0, KEY_WORDS_NUM);

            return keyWordList;
        }

        function getWordWeightInDocument(word, document) {
            var overallWeight = getWordOverallWeight(word);
            overallWeight = _.isFinite(overallWeight) ? overallWeight : 0;
            return document[word] * overallWeight;
        }

        function getWordOverallWeight(word) {
            if (!(weightCache[word] && weightCache.hasOwnProperty(word))) {
                var docsWithWord = getDocumentWithWordNum(word);

                weightCache[word] = 1 + Math.log((documents.length) / ( 1 + docsWithWord ));
            }

            return weightCache[word];
        }

        function getDocumentWithWordNum(word) {
            return _.reduce(documents, function(count, document) {
                return count + (document.hasOwnProperty(word) ? 1 : 0);
            }, 0);
        }

        function resetKeyWordList() {
            keyWordList = [];
            _.forEach(documents, function(document) {
                _.forEach(_.keys(document), function(word) {
                    keyWordList.push({ word: word, value: 0 });
                });
            });
        }

        function addDocument(document) {
            documents.push(document);
            return document;
        }

        function countWords(stringWords) {
            return _.reduce(stringWords, function(document, word) {
                document[word] = document[word] ? document[word] + 1 : 1;
                return document;
            }, {});
        }

        function tokenizeString(string) {
            var pattern = /[^A-Za-zА-Яа-я0-9_]+/,
                results = _.split(_.toLower(string), pattern);
            return _.without(results,'',' ');
        }

        function removeStopWords(stringWords) {
            return getStopWords()
                    .then(function(stopWords) {
                        return _.filter(stringWords, function(word) {
                            return !_.includes(stopWords, word);
                        });
                    });
        }

        function removeNumbers(stringWords) {
            return _.filter(stringWords, function(word) {
                return _.isNaN(+word);
            });
        }

        function getStopWords() {
            if (!_.isUndefined(stopWords)) {
                return $q.when(stopWords);
            }
            return $http({
                method: 'GET',
                url: CONSTANTS.stopWordsPath,
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(function(response) {
                stopWords = response.data.stopWords;
                return stopWords;
            });
        }
    }
})();
