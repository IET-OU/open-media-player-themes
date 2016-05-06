module.exports = function (grunt) {
	'use strict';

	var uglify_theme = grunt.file.readJSON('uglify-theme.json');

	grunt.initConfig({
		PSR2_C: './vendor/iet-ou/open-media-player-core/phpcs.xml',

		exec: {
			grep_ci: "grep -nri -e '>CI' -e 'CI->' -e '$CI' --exclude Base.php -- themes/*",
			phpcs:   'phpcs --standard=<%= PSR2_C %> -n --encoding=utf-8 --extensions=php themes/* && echo OK',
			phpcs_b: 'phpcs --standard=PSR2 -n bin/* && echo OK b',
			phplint: './vendor/bin/parallel-lint --exclude vendor .',
			versions:"printf 'node: '; node --version; printf 'npm: '; npm --version; grunt --version"
		},

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
				options: { node: true }
			}
		},

		validate_xml: {
			html: 'themes/mejs_*/**/*.php'
		},

		uglify: {
			theme: uglify_theme
		}
	});

  grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-validate-xml');

  grunt.registerTask('phpcs', [ 'exec:phpcs', 'exec:phpcs_b' ]);
	grunt.registerTask('default', [ 'exec:phplint', 'phpcs', 'csslint:lax', 'jshint' ]);
};
