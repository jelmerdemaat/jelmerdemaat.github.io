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
					'css/main.css' : 'sass/main.sass'
				}
			}
		},

		watch: {
			all: {
				files: [
					'*.htm',
					'js/*.js',
					'sass/*.sass',
					'sass/*.scss'
				],
				tasks: ['default']
			}
		},
		
		copy: {
			content: {
				// expand: true,
				src: "./*.htm",
				dest: "dist/"
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['uglify','sass','copy']);

};
