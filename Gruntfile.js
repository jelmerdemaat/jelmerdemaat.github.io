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
					'dist/js/plugins.min.js': 'js/plugins.grande.js',
					'dist/js/app.min.js': 'js/app.grande.js'
				}
			}
		},

		sass: {
			dist: {
				options: {
					banner: '<%= banner %>',
					style: 'expanded'
				},
				files: {
					'dist/css/main.css' : 'sass/main.sass'
				}
			}
		},

		autoprefixer: {
			dist: {
				files: {'dist/css/main.css':'dist/css/main.css'},
				options: {
				  browsers: ['> 1%', 'last 3 versions', 'Firefox ESR', 'Opera 12.1']
				}
			}
		},

		watch: {
			sass: {
				files: [
					'sass/*.sass',
					'sass/*.scss'
				],
				tasks: ['sass','autoprefixer']
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
				src: ['dist/css/*.css', 'dist/index.htm','dist/js/*.js']
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
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('default', ['browserSync','watch']);

};
