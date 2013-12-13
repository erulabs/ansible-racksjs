#!/usr/bin/env node
// Include racks.js
var RacksJS = require('./racksjs/racks.js'),
    config = require('./config.js');

new RacksJS({
    username: config.username,
    apiKey: config.apikey,
    verbosity: config.verbosity
}, function (rack) {
	var foundServer = false,
		serverName = process.argv[2],
		foundNode = false;
    if (rack.error) {
        console.log(rack.error);
        return false;
    }
    if (serverName === undefined) {
        console.log('No servername given - usage: ./enable.js <servername>');
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
    		rack.cloudServersOpenStack.servers.all(function (servers) {
    		    servers.forEach(function (server) {
    		        if (server.name === serverName) {
    		        	foundServer = server;
    		        	server.details(function (details) {
				        	targetLB.listNodes(function (nodes) {
				        		nodes.forEach(function (node) {
				        			if (node.address === details.addresses['private'][0].addr) {
				        				console.log('it appears that server is already added on the load balancer');
				        				foundNode = node;
				        			}
				        		});
				        		if (!foundNode) {
			    		            targetLB.addNode([
			    		            	{
			    		            		"address": details.addresses['private'][0].addr,
			    		            		"port": 80,
			    		            		"condition": "ENABLED",
			    		            		"type": "PRIMARY"
			    		            	}
			    		            ], function (reply) {
			    		            	console.log('node added!');
			    		            });
			    		        }
	    		        	});
	    		   		});
    		        }
    		    });
    		    if (!foundServer) {
    		        console.log('I cant find a server by that name');
    		        return false;
    		    }
    		});
        }
    });

});
