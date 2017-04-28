var express = require('express');

function config(app) {
    app.use('/node_modules', express.static('../node_modules'));
    app.use('/dest', express.static('../client/dest'));
    app.use('/components', express.static('../client/components'));
    app.use('/resources', express.static('../client/resources'));

    app.set('views', '../client/views');

    return app;
}

module.exports = config;
