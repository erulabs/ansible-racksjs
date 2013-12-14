#	Getting started!
#		Hello! :) You _can_ haz devops! Simply edit config.js and add your username and API key
#		there are other options in that file, but nothing you _need_ to modify. The verbosity setting is fun,
#		as it directly controls racksjs verbosity - try setting it to 5!
#
#		You can run ./listNodes.js to test auth without taking any actions if you're scared.
#	Requirements!
#		This repo only needs "ansible" and "nodejs" packages. All versions should work fine, but I recommend
#		nodejs > 0.10 and ansible > 1.4
#	How-to:
#		The documentation below ought to give a good idea of how to get started. 
#		however, the full shabang can be very easily run with ./new.sh <servername>
#		./new.js <servername> simply runs: burst.js <servername>, configure.sh, enable.js <servername> and then listNodes.js

# The full monty
new.sh <servername>
	Builds a new server, configures it, and enables it.

# Add a new server
burst.js <servername>
	racksjs script that spins up new webserver with a name from input
	adds public IP / hostname to ansible hosts file

# Run our playbook - will configure all servers
configure.sh

# Enable a server in the load balancer
enable.js <servername>
	racksjs script that adds <servername> as an HTTP node to our loadbalancer and enables it