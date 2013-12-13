#!/usr/bin/env node
// Include racks.js
var RacksJS = require('./racksjs/racks.js'),
    config = require('./config.js'),
    fs = require('fs');

new RacksJS({
    username: config.username,
    apiKey: config.apikey,
    verbosity: config.verbosity
}, function (rack) {
    var targetLB = false,
        newServer = false,
        serverName = process.argv[2];
    if (rack.error) {
        console.log(rack.error);
        return false;
    }
    if (serverName === undefined) {
        console.log('No servername given - usage: ./burst.js <servername>');
        return false;
    }
    findOrCreateTargetLB(function () {
        findOrCreateServer(function (newServer) {
            addServerToAnsibleConfig(newServer, function () {
                console.log('New server', serverName, 'is complete! Run ./configure.sh to ensure all hosts are configured correctly!');
            });
        });
    });

    function findOrCreateTargetLB (callback) {
        rack.cloudLoadBalancers.loadBalancers.all(function (loadBalancers) {
            loadBalancers.forEach(function (lb) {
                if (lb.name === config.loadBalancerName) {
                    targetLB = lb;
                    findOrCreateServer();
                }
            });
            if (!targetLB) {
                console.log('No load balancer named "' + config.loadBalancerName + '" was found - creating');
                rack.cloudLoadBalancers.loadBalancers.new({
                    'name': config.loadBalancerName
                }, function (loadbalancer) {
                    var progressCheck = function () {
                        setTimeout(function () {  
                            loadbalancer.details(function (details) {
                                if (details.status === 'BUILD') {
                                    console.log('Load balancer building...');
                                    progressCheck();
                                } else if (details.status === 'ACTIVE') {
                                    console.log('load balancer build complete!');
                                    targetLB = loadbalancer;
                                    targetLB.loadedDetails = details;
                                    callback();
                                } else {
                                    console.log('Some error occured!', details.status);
                                }
                            });
                        }, 15000);
                    };
                    progressCheck();
                });
            }
        });
    };
    function findOrCreateServer (callback) {
        rack.cloudServersOpenStack.servers.all(function (servers) {
            servers.forEach(function (server) {
                if (server.name === serverName) {
                    console.log('It appears a server by that name already exists');
                    newServer = server;
                }
            });
            if (newServer) {
                return false;
            }
            rack.cloudServersOpenStack.servers.new({
                "name": serverName,
                "imageRef": config.serverBaseImage,
                "flavorRef": config.serverFlavor
            }, function (server) {
                var progressCheck = function () {
                    setTimeout(function () {  
                        server.details(function (details) {
                            if (details.progress < 100) {
                                console.log('Server "' + serverName + '" building -', details.progress + '%');
                                progressCheck();
                            } else {
                                newServer = server;
                                newServer.loadedDetails = details;
                                callback(newServer);
                                console.log('build complete! root pw:', server.adminPass, 'server id:', server.id);
                            }
                        });
                    }, 15000);
                };
                progressCheck();
            });
        });
    };
    function addServerToAnsibleConfig (server, callback) {
        var pubIP = false,
            serverString;
        server.loadedDetails.addresses['public'].forEach(function (addr) {
            if (addr.version === 4) {
                pubIP = addr.addr;
            }
        });
        if (pubIP) {
            serverString = serverName + "\tansible_ssh_host=" + pubIP + "\tansible_ssh_user=root\tansible_ssh_pass=" + server.adminPass + "\n";
            fs.appendFile(config.ansibleInventory, serverString, function (err) {
                if (err) {
                    console.log('failed to write to ansibleInventory, file:', config.ansibleInventory, 'error:', err);
                } else {
                    callback();
                }
            });
        } else {
            console.log('couldnt find the public addr of the new server.');
            console.log('Perhaps a code issue with burst.js - or perhaps the servers in fact dont have public ipv4 addrs');
        }
    };
});
