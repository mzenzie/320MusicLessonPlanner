exports.config = {
	baseUrl: 'http://localhost:8000/',
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['*Spec*.js'],
  directConnect: true,
  rootElement: '.protractorStartPoint'
};