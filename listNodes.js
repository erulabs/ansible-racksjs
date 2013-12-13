#!/usr/bin/env node
// Include racks.js
var RacksJS = require('./racksjs/racks.js'),
    config = require('./config.js');

new RacksJS({
    username: config.username,
    apiKey: config.apikey,
    verbosity: config.verbosity
}, function (rack) {
    var targetLB = false;
    if (rack.error) {
        console.log(rack.error);
        return false;
    }
    rack.cloudLoadBalancers.loadBalancers.all(function (loadBalancers) {
        loadBalancers.forEach(function (lb) {
            if (lb.name === config.loadBalancerName) {
                targetLB = lb;
            }
        });
        if (!targetLB) {
            console.log('No load balancer named "' + config.loadBalancerName + '" was found - please burst.js first!');
        } else {
        	targetLB.listNodes(function (nodes) {
        		console.log(nodes);
        	});
        }
    });
});
