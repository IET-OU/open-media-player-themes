module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		csslint: {
			lax: {
				options: {
					quiet: true  // Ignore warnings.
				},
				src: 'themes/**/*.css'
			},
			strict: 'themes/**/*.css'
		},
		jscs: {
			options: {
				//preset: 'idiomatic'
				requireCurlyBraces: [ 'if' ]
			},
			themes: '<%= jshint.themes %>'
		},
		jshint: {
			options: {
				//curly: true,
				eqeqeq: true,
				freeze: true,
				funcscope: true,
				futurehostile: true,
				//latedef: true,
				laxcomma: true,
				nocomma: true,
				//strict: true,
				undef: true,
				//unused: true,
				//'-W097': true,  // Ignore position of 'use strict';
				//'-W100': true,  // ??
				//'-W014': true,  // Ignore bad line breaking before '+';
				globals: {
					window: false, //<<< !!
					mejs: false, MediaElementPlayer: false, module: false
				},
				ignores: [
					'**/mep-oup-feature-progress.js',
					'**/mep-feature-fullscreen.js',
					'**/mep-feature-tracks.js',
					'**/mep-player.js'
				]
			},
			themes: 'themes/**/js/*.js',
			grunt:  'Gruntfile.js'
		}
	});

	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');

	grunt.registerTask('default', [ 'csslint:lax', 'jshint' ]);
};
