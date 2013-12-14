# Getting started!
Hello! :) You _can_ haz devops! Simply edit config.js and add your username and API key and run
    ./new.sh aKillerServer

There are other options in that file, but nothing you _need_ to modify. The verbosity setting is fun as it directly controls racksjs verbosity - try setting it to 5! Additionally, this script ought to work on ANY FLAVOR, but it does rely on yum and was only tested on CentOS 6.4

# Requirements!
This repo only needs "ansible" and "nodejs" packages. All versions should work fine, but I recommend
nodejs > 0.10 and ansible > 1.4. ./configure.sh doesn't require nodejs, as it is the isolated ansible bit. It also uses paramiko which is sort of a hack as a way to enable ssh_pass without requiring another package on OSX. These are all things that would be sorted properly in a real world setup.

# How-to:
The documentation below ought to give a good idea of how to get started. 
however, the full shabang can be very easily run with ./new.sh <servername>
./new.js <servername> simply runs: burst.js <servername>, configure.sh, enable.js <servername> and then listNodes.js

## The full monty
   ./new.sh <servername>
Builds a new server, configures it, and enables it.

## Add a new server
    ./burst.js <servername>
racksjs script that spins up new webserver with a name from input
adds public IP / hostname to ansible hosts file

## Run our playbook - will configure all servers
    ./configure.sh

## Enable a server in the load balancer
    ./enable.js <servername>
racksjs script that adds <servername> as an HTTP node to our loadbalancer and enables it