module.exports = function(grunt){

	grunt.initConfig({

		pkg : grunt.file.readJSON('package.json'),

		sass : {
			
			dist : {
				
				options : {
					style : 'compressed'
				},

				files : {
					'public/css/global.css' : 'public/scss/main.scss'
				}
			}
		},

		watch : {

			css : {
				
				files : ['public/scss/*.scss'],
				
				tasks : ['sass'],
				
				options : {
					spawn: false,
					livereload: true
				}
			}
		},

		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					file: 'server.js',
					nodeArgs: ['--debug-brk'],
					watchedFolders: ['components', 'config'],
					env: {
						PORT: '3000'
					}
				}
			}
		},

		concurrent: {
			dev: {
				tasks: ['watch', 'nodemon'],
				options: {
					logConcurrentOutput: true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default', ['concurrent']);
	grunt.registerTask('build', ['sass']);

};
