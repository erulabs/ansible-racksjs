#!/usr/bin/env node
// Include racks.js
var RacksJS = require('./racks.js'),
    config = require('./config.js');

new RacksJS({
    username: config.username,
    apiKey: config.apikey,
    verbosity: config.verbosity
}, function (rack) {
    if (rack.error) {
        console.log(rack.error);
        return false;
    }
});
