export.config = {
	//Address of Selenium erver
	seleniumAddress: 'http://localhost:4444/wd/hub',

	//Url where server is
	baseUrl: 'http://localhost:8000/',

	// Capabilities to be passed to WebDriver instance
	capabilities: {
		'browserName': 'chrome'
	},

	// Spec patterns are relative to the location of the spec file
	specs: ['*Spec*.js'],

	//Jasmine-node options
	jasmineNodeOpts: {
		// Have colors in the command-line output
		ShowColor: true
	}
};