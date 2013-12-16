/* global module */
module.exports = function(grunt) {
	'use strict';

	grunt.registerTask('build', [ 'preprocess', 'concat', 'uglify' ]);
	grunt.registerTask('watch', [ 'watch' ]);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		preprocess: {
			js: { src: 'src/textStretch.js', dest: 'dist/textStretch.js' },
			jquery: { src: ['src/jquery.textStretch.js'], dest: 'dist/jquery.textStretch.js' }

		},
	 concat: {
			options: {
				banner: '/*!\n * <%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n * <%= pkg.repository.url %>\n *\n * Copyright (c) 2012 - <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n * Released under the MIT licence: http://www.opensource.org/licenses/mit-license.php\n */\n\n'
			},
			js: { src: ['dist/textStretch.js'], dest: 'dist/textStretch.js' },
			jquery: { src: ['dist/jquery.textStretch.js'], dest: 'dist/jquery.textStretch.js' }
	 },
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> | (c) 2012 - <%= grunt.template.today("yyyy") %> <%= pkg.author %> | Licensed under MIT: http://www.opensource.org/licenses/mit-license.php */\n'
			},
			js: { files: {'dist/textStretch.min.js': 'dist/textStretch.js' } },
			jquery: { files: {'dist/jquery.textStretch.min.js': 'dist/jquery.textStretch.js' } }
		},
		watch: {
			js: {
				files: ['src/*'],
				tasks: ['build'],
				options: {
					livereload: true
				}
			}
		},
		release: {
			options: {
				add: false,
				npm: false
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-release');
	grunt.loadNpmTasks('grunt-contrib-watch');
};