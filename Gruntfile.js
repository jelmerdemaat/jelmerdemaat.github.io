module.exports = function(grunt) {

	// Project configuration

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> */\n',

		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				files: {
					'dist/js/plugins.min.js': 'js/plugins.grande.js'
				}
			}
		},

		sass: {
			dist: {
				options: {
					banner: '<%= banner %>',
					style: 'compact'
				},
				files: {
					'dist/css/main.css' : 'sass/main.sass'
				}
			}
		},

		watch: {
			sass: {
				files: [
					'sass/*.sass',
					'sass/*.scss'
				],
				tasks: ['sass']
			},

			js: {
				files: ['js/*.js'],
				tasks: ['uglify']
			},

			content: {
				files: ['*.htm'],
				tasks: ['copy']
			}
		},
		
		copy: {
			content: {
				// expand: true,
				src: "./*.htm",
				dest: "dist/"
			}
		},

		browserSync: {
			files: {
				src: ['dist/css/*.css', 'dist/index.htm']
			},
			options: {
				browser: 'google chrome',
				watchTask: true,
				server: {
					baseDir: 'dist',
					index: 'index.htm'
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('default', ['browserSync','watch']);

};
