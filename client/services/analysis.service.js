(function() {
    'use strict';

    analysisService.$inject = [
        '$http',
        '$q',
        'loginService',
        'CONSTANTS'
    ];

    angular
        .module('app')
        .service('analysisService', analysisService);

    function analysisService(
        $http,
        $q,
        loginService,
        CONSTANTS
    ) {
        var stopWords,
            weightCache,
            analysisCount = 0,
            documents = [],
            keyWordList = [],
            KEY_WORDS_NUM = 5,
            TITLE_MULTIPLIER = 1.5,
            DESCRIPTION_MULTIPLIER = 0.75,
            MAX_DOCUMENT_COUNT = 20,
            ANALYSIS_FREQUENCY = 3;

        return {
            addArticle: addArticle,
            restoreDocuments: restoreDocuments
        };

        function addArticle(article) {
            var addTitle = addString(article.title),
                addDescription = addString(article.description);

            $q.all([addTitle, addDescription])
                .then(saveDocuments)
                .then(checkAnalysisFrequency)
                .then(performAnalysis)
                .catch(handleError);
        }

        function restoreDocuments(username) {
            return $http({
                method: 'GET',
                url: '/getDocuments/' + username
            }).then(function(response) {
                documents = JSON.parse(response.data.documents);
            }).then(performAnalysis);
        }

        function performAnalysis() {
            if (documents.length > 1) {
                return $q.when()
                        .then(resetKeyWordList)
                        .then(analyse)
                        .then(applyWordMultipliers)
                        .then(cleanUp)
                        .then(console.log);
            }

            return $q.when();
        }

        function handleError(err) {
            if (err === 'Not time for analysis') {
                return true;
            }
            throw new Error(err);
        }

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

        function saveDocuments() {
            checkDocumentsCount();
            if (loginService.isLoggedIn()) {
                $http({
                    method: 'POST',
                    url: '/saveDocuments/',
                    data: { documents: JSON.stringify(documents), username: loginService.getUsername() }
                }).then(function(response) {
                    if (response.status !== 202) {
                        throw new Error('Error while saving documents');
                    }
                });
            }

            return $q.when(true);
        }

        function checkAnalysisFrequency() {
            analysisCount++;

            if (analysisCount >= ANALYSIS_FREQUENCY) {
                analysisCount = 0;
                return true;
            }

            return $q.reject('Not time for analysis');
        }

        function checkDocumentsCount() {
            while (documents.length > MAX_DOCUMENT_COUNT) {
                documents = _.drop(documents, 2);
            }
        }

        function analyse(keyWordList) {
            weightCache = {};
            _.forEach(keyWordList, function(keyWordObj) {
                keyWordObj.value = _.reduce(documents, function(keyWordWeight, document) {
                    return keyWordWeight + (document.hasOwnProperty(keyWordObj.word)
                                            ? getWordWeightInDocument(keyWordObj.word, document)
                                            : 0);
                }, 0);
            });
            return keyWordList;
        }

        function applyWordMultipliers(keyWordList) {
            var wordsArray = _.map(keyWordList, function(keyWordObj) {
                return keyWordObj.word;
            });
            return $http({
                method: 'POST',
                url: '/getWordsWeightMultipliers',
                data: { words: wordsArray }
            }).then(function(response) {
                if (response.status !== 200) {
                    throw new Error('Error while getting words weight multipliers');
                }

                var weightMultipliers = response.data;
                _.forEach(keyWordList, function(keyWordObj, index) {
                    keyWordObj.multiplier = keyWordObj.multiplier * weightMultipliers[index];
                });

                return keyWordList;
            });
        }

        function cleanUp(keyWordList) {
            var groupedKeyWordList = _.groupBy(keyWordList, function(keyWordObj) {
                return _.toLower(keyWordObj.word);
            });
            keyWordList = [];

            getFinalValues(groupedKeyWordList, keyWordList);

            keyWordList.sort(function(first, second) {
                return second.value - first.value;
            });
            keyWordList = _.slice(keyWordList, 0, KEY_WORDS_NUM);

            return keyWordList;
        }

        function getFinalValues(groupedKeyWordList, keyWordList) {
            _.forOwn(groupedKeyWordList, function(wordArray, word) {
                var minMultiplier = 10,
                    wordValue = _.reduce(wordArray, function(sum, currentObj) {
                        minMultiplier = _.min([minMultiplier, currentObj.multiplier]);
                        return sum + currentObj.value;
                    }, 0),
                    finalValue = _.round(wordValue * minMultiplier, 4);
                keyWordList.push({ word: word, value: finalValue });
            });
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
            _.forEach(documents, function(document, index) {
                var positionMultiplier = (index % 2) ? DESCRIPTION_MULTIPLIER : TITLE_MULTIPLIER;
                _.forEach(_.keys(document), function(documentWord) {
                    var existingKeyWord = _.find(keyWordList, { word: documentWord });
                    if (!existingKeyWord) {
                        keyWordList.push({ word: documentWord, value: 0, multiplier: positionMultiplier });
                    }
                });
            });
            return keyWordList;
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
                results = _.split(string, pattern);
            return _.without(results,'',' ');
        }

        function removeStopWords(stringWords) {
            return getStopWords()
                    .then(function(stopWords) {
                        return _.filter(stringWords, function(word) {
                            return !_.includes(stopWords, _.toLower(word));
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
