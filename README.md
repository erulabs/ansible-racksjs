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




-It should serve a simple webpage saying that the site is under construction, and must have the servername displayed on the page along with your name.  No bonus points for lolcats, but they are appreciated of course.  This index.html should be dynamically created by your config mgmt system.

-We should be able to stand up a new server with a minimal set of commands, and at any time, and with a repeatable process

--This means we need some sort of configuration management.  You can use Chef, Chef-Solo, Hosted Chef, Puppet, SaltStack, or any other industry accepted configuration management tools

--If the config management tool can create the server automagically as part of the run that would be helpful.  Otherwise you will need some sort of script to create the server.  knife-rackspace is an example of the Chef way to do this

--NO configuration files should be staticly just pushed onto the server.  Your configuration management tool should be creating the config files when a new server is kicked up

-Some standard sysadmin-y packages should be installed also
-vim
-screen
-python and pyrax OR ruby and fog
-curl
-git

-You must use source control (i.e. git) in some way.  This can be to hold your chef cookbooks or puppet manifests for example

For the github repo feel free to put this in either public or Rackspace github, just shoot me a link so I can clone it at 5PM on Saturday.  Let me know if you have any questions!

-Mike
