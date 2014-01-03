module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        report: 'min'
      },
      build: {
        src: ['src/Main.js', 'src/Common.js', 'src/Arrays.js', 'src/Functions.js', 'src/Object.js', 'src/Patterns.js', 'src/Strings.js'],
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jsdoc');

  // Tasks
  grunt.registerTask('test', ['connect', 'qunit']);
  grunt.registerTask('doc', ['jsdoc']);
  grunt.registerTask('default', ['uglify', 'test']);

};