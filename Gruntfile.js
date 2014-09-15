module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! \n' +
			' * <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
			' * <%= grunt.template.today("yyyy-mm-dd HH:MM") %>\n' +
			'<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
			' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
			'*/\n',

		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				files: {
					'js/app.min.js': 'jsraw/app.grande.js',
					'js/vendor/fitvids.js': 'jsraw/vendor/fitvids.js'
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
					// sourcemap: 'auto',
					style: 'compact'
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
			},
			style: {
				files: {'dist/css/main.css':'dist/css/main.css'},
				options: {
				  browsers: ['> 1%', 'last 3 versions', 'Firefox ESR', 'Opera 12.1']
				}
			}
		},


		svgstore: {
			options: {
				prefix: 'icon-',
				svg: {
					class: 'icons-svg'
				}
			},
			build: {
				files: {
					'_includes/all.svg': ['svg/*.svg']
				}
			}
		},


		watch: {
			sass: {
				files: [
					'sass/*.sass',
					'sass/*.scss'
				],
				tasks: ['sass:dist','autoprefixer:dist']
			},

			style: {
				files: [
					'sass/*.sass',
					'sass/*.scss'
				],
				tasks: ['sass:style','autoprefixer:style']
			},

			js: {
				files: ['jsraw/**/*.js'],
				tasks: ['uglify']
			},

			svg: {
				files: ['svg/*.svg'],
				tasks: ['svg']
			},

			content: {
				files: [
					'*.htm',
					'*.html',
					'_layouts/**/*.htm',
					'_posts/**/*.htm',
					'_posts/**/*.md',
					'_includes/**/*.htm',
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
				// tunnel: true,
				server: {
					baseDir: 'dist/',
					port: 3000,
					index: 'index.html'
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-notify');

	grunt.loadNpmTasks('grunt-svgstore');

	grunt.registerTask('svg', ['svgstore', 'jekyll']);
	grunt.registerTask('build', ['sass:dist','uglify','svgstore','jekyll']);
	grunt.registerTask('default', ['build','browserSync','watch']);
	grunt.registerTask('style', ['build','browserSync','watch:style']);
	grunt.registerTask('content', ['build', 'browserSync', 'watch:content']);
};
