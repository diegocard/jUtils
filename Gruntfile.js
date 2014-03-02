/* global module:false */

module.exports = function(grunt) {

  var header = '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      allSources = [
        'src/Main.js', 
        'src/Ajax.js', 
        'src/Arrays.js', 
        'src/Functions.js', 
        'src/Misc.js',
        'src/Objects.js', 
        'src/RegExp.js', 
        'src/Strings.js', 
      ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: header,
      },
      dist: {
        src: allSources,
        dest: 'JSUtils.js'
      },
    },
    uglify: {
      options: {
        banner: header,
        report: 'min'
      },
      build: {
        src: allSources,
        dest: 'JSUtils.min.js'
      }
    },
    jsdoc : {
      dist : {
        src: ['src/*.js', 'test/*.js'],
        options: {
          destination: 'docs'
        }
      }
    },
    qunit: {
      all: {
        options: {
          urls: [
            'http://localhost:8000/test/test.html',
          ]
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    }
  });

  // Modules
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jsdoc');

  // Tasks
  grunt.registerTask('test', ['connect', 'qunit']);
  grunt.registerTask('doc', ['jsdoc']);
  grunt.registerTask('default', ['concat', 'uglify', 'test']);

};