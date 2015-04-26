exports.config = {
	baseUrl: 'http://localhost:8000/',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['*Spec*.js'],
  rootElement: '.protractorStartPoint',
  multiCapabilities: [
    //{browserName: 'opera'}
    //{browserName: 'firefox'},
    {browserName: 'chrome'}
  ]
  /*
   multiCapabilities: [
    //{browserName: 'opera'}
    {browserName: 'firefox'}
    //{browserName: 'chrome'}
  ]
  maxSessions: 1*/
};
