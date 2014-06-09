module.exports = function(grunt) {

	// Project configuration

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
	      files: {
	        'dist/plugins.min.js': 'js/plugins.grande.js'
	      }
	    }
		},
		watch: {
			files: [
				'*.htm',
				'js/*.js',
				'sass/*.sass',
				'sass/*.scss'
			]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['uglify']);

};
