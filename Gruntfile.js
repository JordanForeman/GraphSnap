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
					spawn: false
				}
			}
		},

		nodemon: {
			dev: {
				script: 'app.js',
				options: {
					file: 'app.js',
					watchedFolders: ['api', 'config', 'controllers', 'models'],
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

	grunt.registerTask('default', ['sass', 'nodemon']);
	grunt.registerTask('dev', ['concurrent']);

};
