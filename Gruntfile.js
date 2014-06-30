module.exports = function(grunt) {

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
					'js/app.min.js': 'jsraw/app.grande.js'
				}
			}
		},

		sass: {
			dist: {
				options: {
					banner: '<%= banner %>',
					style: 'compressed'
				},
				files: {
					'css/main.css' : 'sass/main.sass'
				}
			},
			style: {
				options: {
					banner: '<%= banner %>',
					style: 'compressed'
				},
				files: {
					'dist/css/main.css' : 'sass/main.sass'
				}
			}
		},

		jekyll: {
			options: {

			},
			dist: {

			}
		},

		autoprefixer: {
			dist: {
				files: {'css/main.css':'css/main.css'},
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
				tasks: ['sass:dist','autoprefixer']
			},

			style: {
				files: [
					'sass/*.sass',
					'sass/*.scss'
				],
				tasks: ['sass:style']
			},

			js: {
				files: ['jsraw/**/*.js'],
				tasks: ['uglify']
			},

			content: {
				files: [
					'*.htm',
					'*.html',
					'_layouts/*.htm',
					'_posts/*.htm',
					'_posts/*.md',
					'_includes/*.htm',
					'css/*.css',
					'js/**/*.js'
				],
				tasks: ['jekyll']
			}
		},

		browserSync: {
			files: {
				src: ['dist/css/*.css', 'dist/**/*.html','dist/js/*.js']
			},
			options: {
				browser: 'google chrome',
				watchTask: true,
				debugInfo: true,
				server: {
					baseDir: 'dist/',
					index: 'index.html'
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.loadNpmTasks('grunt-notify');


	grunt.registerTask('build', ['sass:dist','uglify','jekyll']);
	grunt.registerTask('default', ['build','browserSync','watch']);
	grunt.registerTask('style', ['build','browserSync','watch:style']);

};
