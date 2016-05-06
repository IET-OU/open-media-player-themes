module.exports = function (grunt) {
	'use strict';

	/*var uglify_config = 'uglify-theme.json';

	try {
		var fs = require('fs');
		var uglify_theme = JSON.parse(fs.readFileSync(uglify_config, 'utf8'));
	} catch (ex) {
		console.error("Can't read file :( " + uglify_config);
		console.error(ex);
		return false;
	}*/

	var uglify_theme = grunt.file.readJSON('uglify-theme.json');

	grunt.initConfig({
		//uglify_config: uglify_config,

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
				// https://github.com/jshint/jshint/blob/master/src/messages.js#L80
				//'-W097': true,  // Ignore position of 'use strict';
				//'-W100': true,  // Ignore this character may get silently deleted by...;
				//'-W014': true,  // Ignore bad line breaking before '+';
				globals: {
					window: false, //<<< !!
					mejs: false, MediaElementPlayer: false
				},
				ignores: [
					'**/mep-oup-feature-progress.js',
					'**/mep-feature-fullscreen.js',
					'**/mep-feature-tracks.js',
					'**/mep-player.js'
				]
			},
			themes: 'themes/**/js/*.js',
			grunt: {
				files: { src: 'Gruntfile.js' },
				options: {
					globals: { module: false, require: false, console: false }
				}
			}
		},

		uglify: {
			theme: uglify_theme
			/*theme: {
				files: uglify_files,
				options: {
					compress: true,
					mangle: false,
					maxLineLen: 640,
					preserveComments: 'some'
				}
			}*/
		}
	});

	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', [ 'csslint:lax', 'jshint' ]);
};
