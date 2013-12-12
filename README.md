# clone https://github.com/tgerla/ansible-examples

# Add a new server
burst.js <servername>
	racksjs script that spins up new webserver with a name from input
	adds public IP / hostname to ansible hosts file

# Run our playbook - will configure all servers
ansible-playbook -i hosts site.yml

# Test a new server
test.js <servername>
	racksjs script that tests for HTTP content from the public IP of <servername>

# Enable a server in the load balancer
enable.js <servername>
	racksjs script that adds <servername> as an HTTP node to our loadbalancer and enables it

# Destroy a server entirely
destroy.js <servername>
	rackjs script that removes <servername> from ansibles hosts file, disables the node in the load balancer, and destroys the cloud server.
