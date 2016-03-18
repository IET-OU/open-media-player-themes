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
		jshint: {
			options: {
				eqeqeq: true,
				laxcomma: true,
				//'-W097': true,  // Ignore position of 'use strict';
				//'-W100': true,  // ??
				//'-W014': true,  // Ignore bad line breaking before '+';
				globals: {
					// None!
				},
				ignores: [
					'**/mep-oup-feature-progress.js',
					'**/mep-feature-fullscreen.js',
					'**/mep-feature-tracks.js',
					'**/mep-player.js',
					'**/*.min.js'
				]
			},
			themes: 'themes/**/*.js',
			grunt:  'Gruntfile.js'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');

	grunt.registerTask('default', [ 'csslint:lax', 'jshint' ]);
};
