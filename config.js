module.exports = {
	// Rackspace API Authentication information
	username: 'seandon',
	apikey: '295f5d723df3d3a394ed33549e475435',
	// The name of our load balancer - if it doesn't exist, it will be created by burst.js
	loadBalancerName: 'devops_prod_LB',
	// The base image used for creating servers - this is CentOS 6.4
	serverBaseImage: 'f70ed7c7-b42e-4d77-83d8-40fa29825b85',
	// The flavor to use (server specs). '2' is a 512mb Next-Gen server.
	// For real production mode, we'd probably want to use 'performance1-2', which is a 2gb performance server
	serverFlavor: '2',
	// RacksJS verbosity level
	// set to zero to only see script-level messaging
	// set to 5 to see full request/reply chain for every API call
	verbosity: 5,
	// name of the Ansible inventory file
	ansibleInventory: 'hosts'
};