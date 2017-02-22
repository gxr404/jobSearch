'use strict';

module.exports = function(grunt) {
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	var config = {
		app: 'app',
		dist: 'dist'
	};

	grunt.initConfig({
		config: config,
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			js: {
				files: ['<%= config.app %>/scripts/{,*/}*.js'],
				tasks: ['jshint'],
				options: {
					livereload: true //会触发livereload通知
				}
			},
			sass: {
				files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
				tasks: ['sass', 'cssmin:app'], //'autoprefixer',
				options: {
					livereload: true //会触发livereload通知
				}
			},

			// styles: {
			// 	files: ['<%= config.app %>/styles/{,*/}*.css'],
			// 	tasks: ['newer:copy:styles'] //, 'autoprefixer'
			// },
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= config.app %>/{,*/}*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= config.app %>/images/{,*/}*'
				]
			}

		},
		connect: {
			options: {
				port: 9000,
				hostname: '*', //默认这个值，可配置本机某个IP，localhost 或域名
				livereload: 35729 //声明给watch监听的端口
			},
			serverApp: {
				options: {
					open: true, //自动打开网页
					base: ['<%= config.app %>'] //主目录
				}
			},
			serverDist: {
				options: {
					open: true,
					base: ['<%= config.dist %>']
				}
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
					//,reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'<%= config.app %>/scripts/config.js' //*.js' //scripts/{,*/}*.js'
			]
		},

		sass: {
			options: {
				loadPath: 'bower_components'
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/styles',
					src: ['*.{scss,sass}'],
					dest: 'app/styles', //'.tmp/styles',
					ext: '.css'
				}]
			},
			server: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/styles',
					src: ['*.{scss,sass}'],
					dest: 'app/styles', //'.tmp/styles',
					ext: '.css'
				}]
			}
		},
		cssmin: {
			// options: {
			// 	// compatibility: 'ie8', //设置兼容模式
			// 	// noAdvanced: true //取消高级特性
			// 	// ,sourceMap:true
			// 	// ,report:'gzip',
			// 	shorthandCompacting: false,
 		// 	   roundingPrecision: -1
			// },
			dist: {
				files: {
					'<%= config.dist %>/styles/main.css': [
						'<%= config.app %>/styles/reset.css','<%= config.app %>/styles/index.css'
					]
				}
			},
			app:{
				files: {
					'<%= config.app %>/styles/main.css': [
						'<%= config.app %>/styles/reset.css','<%= config.app %>/styles/index.css'
					]
				}
			}
		},
		uglify: {
			options:{
					banner:'/*!<%=pkg.file%><%=grunt.template.today("yyyy-mm-dd")%>*/\n'
			},
			dist: {
				files: {
					'<%= config.dist %>/scripts/scripts.js': [
						'<%= config.dist %>/scripts/scripts.js'
					]
				}
			},
			ys:{
				src:'<%= config.app %>/scripts/config.js',
				dest:'<%= config.dist %>/scripts/config.js'
			},
			ie:{
				src:'<%= config.app %>/scripts/ie.js',
				dest:'<%= config.dist %>/scripts/ie.js'
			},
			typerwriter:
			{
				src:'<%=config.app%>/scripts/typerwriter.js',
				dest:'<%= config.dist %>/scripts/typerwriter.js'
			}
		},



		// autoprefixer: {
		// 	options: {
		// 		browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
		// 	},
		// 	dist: {
		// 		files: [{
		// 			expand: true,
		// 			cwd: '.tmp/styles/',
		// 			src: '{,*/}*.css',
		// 			dest: '.tmp/styles/'
		// 		}]
		// 	}
		// },
		// wiredep: {
		//      app: {
		//        ignorePath: /^\/|\.\.\//,
		//        src: ['<%= config.app %>/index.html'],
		//        exclude: ['bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js']
		//      },
		//      sass: {
		//        src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
		//        ignorePath: /(\.\.\/){1,2}bower_components\//
		//      }
		//    },
		copy:{
			dist:{
				expand: true,
				cwd:'<%=config.app%>/scripts/libs/',
				src:'*',
				dest:'<%=config.dist%>/scripts/libs/'

			},
			img:{
				expand:true,
				cwd:'<%=config.app%>/images/',
				src:'**',
				dest:'<%=config.dist%>/images/'
			},
			ie:{
				expand:true,
				cwd:'<%=config.app%>/styles/',
				src:'ie.css',
				dest:'<%=config.dist%>/styles/'
			},
			html:{
				expand:true,
				cwd:'<%=config.app%>/',
				src:'*.html',
				dest:'<%=config.dist%>/'
			}

		}
	});

	grunt.registerTask('serverApp', [
		'sass',
		'cssmin:app',
		'connect:serverApp',
		'watch'
	]);
	grunt.registerTask('serverDist', [
		'sass',
		'cssmin:dist',
		'connect:serverDist',
		'watch'
	]);
	grunt.registerTask('crecss', [
			'sass',
			'cssmin:app'
	]);
	grunt.registerTask('copyDist', [
			'uglify',
			'cssmin:dist',
			'copy'

	]);
};