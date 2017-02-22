require.config({
	baseUrl: '/scripts',
	paths: {
		'jquery': 'libs/jquery.min',
		'jquery.fullPage': 'libs/jquery.fullPage.min'
	},
	shim: {
		'jquery.fullPage': {
			deps: ['jquery']
		}
	}
});
require(['jquery', 'jquery.fullPage'], function($, fullpage) {
	

});
