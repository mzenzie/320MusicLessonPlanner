exports.config = {
   baseUrl: 'http://localhost:8000/',
   seleniumAddress: 'http://localhost:4444/wd/hub',
   //specs: ['*Spec*.js'],
   rootElement: '.protractorStartPoint',
   multiCapabilities: [
      {
         browserName: 'chrome',
         specs: ['./ChromeTesting.js']
      },
      {
         browserName: 'firefox',
         specs: ['./FirefoxTesting.js']
      }
   ],
   maxSessions: 1
  /*
   * multiCapabilities: [{
    browserName: 'firefox',
    specs: ['claimsoverview/login-manager.spec.js']
}, {
    browserName: 'firefox',
    specs: ['claimsoverview/login-supervisor.spec.js']
}, {
    browserName: 'firefox',
    specs: ['claimsoverview/login-claims-analyst.spec.js']
}, {
    browserName: 'chrome',
    specs: ['claimsoverview/login-manager.spec.js']
}, {
    browserName: 'chrome',
    specs: ['claimsoverview/login-supervisor.spec.js']
}, {
    browserName: 'chrome',
    specs: ['claimsoverview/login-claims-analyst.spec.js']
}, {
    browserName: 'ie',
    specs: ['claimsoverview/login-manager.spec.js']
}, {
    browserName: 'ie',
    specs: ['claimsoverview/login-supervisor.spec.js']
}, {
    browserName: 'ie',
    specs: ['claimsoverview/login-claims-analyst.spec.js']
}],
   multiCapabilities: [
    //{browserName: 'opera'}
    {browserName: 'firefox'}
    //{browserName: 'chrome'}
  ]
  maxSessions: 1*/
};
