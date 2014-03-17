/* global module:false */

module.exports = function(grunt) {

  var header = '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      allSources = [
        'src/core/topper.js',
        'src/core/core.js', 
        'src/modules/*.js',
        'src/core/footer.js'
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
        dest: 'jUtils.js'
      },
    },
    "jsbeautifier" : {
      files : 'jUtils.js',
      options: {
        js: {
          indentSize: 2,
          indentWithTabs: false
        }
      }
    },
    uglify: {
      options: {
        banner: header,
        report: 'gzip'
      },
      build: {
        src: 'jUtils.js',
        dest: 'jUtils.min.js'
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
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jsdoc');

  // Tasks
  grunt.registerTask('test', ['connect', 'qunit']);
  grunt.registerTask('doc', ['jsdoc']);
  grunt.registerTask('default', ['concat', 'jsbeautifier', 'uglify', 'test']);

};