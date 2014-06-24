module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            templates: {
                files: ['./app/partials/**/*.html', './app/templates/**/*.html'],
                tasks: ['ngtemplates']
            },
            scripts: {
                files: ['./app/js/**/*.js', '!./app/js/main.min.js'],
                tasks: ['requirejs']
            },
            styles: {
                files: ['./app/css/**/*.scss'],
                tasks: ['sass']
            }
        },
        ngtemplates: {
            app: {
                cwd: './app',
                src: ['partials/**/*.html', 'templates/**/*.html'],
                dest: './app/js/templates.js',
                options: {
                    bootstrap:  function(module, script) {
                        return 'define([\'angular\', \'app\'], function(angular, app) { app.run([\'$templateCache\', function($templateCache) {' + script + '}]); });';
                    }
                },
                htmlmin: {
                    collapseBooleanAttributes:      true,
                    collapseWhitespace:             true,
                    removeAttributeQuotes:          true,
                    removeComments:                 true,
                    removeEmptyAttributes:          true,
                    removeRedundantAttributes:      true,
                    removeScriptTypeAttributes:     true,
                    removeStyleLinkTypeAttributes:  true
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    mainConfigFile: "./app/js/main.js",
                    optimize: "uglify",
                    name: "main",
                    out: "./app/js/main.min.js",
                    preserveLicenseComments: false
                }
            }
        },
        sass: {
            options: {
                style: 'compressed'
            },
            prod: {
                src: './app/css/style.scss',
                dest: './app/css/style.min.css'
            }
        },
        imagemin: {
            prod: {
                options: {
                    optimizationLevel: 7,
                    cache: false
                },
                files: [{
                    expand: true,
                    src: ['./app/img/**/*.{png,jpg,gif}'],
                    dest: '.'
                }]
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-angular-templates');

    // Production mode tasks
    grunt.registerTask('prod', ['sass', 'ngtemplates', 'requirejs', 'imagemin']);

    // Dev mode tasks
    grunt.registerTask('default', ['sass', 'ngtemplates', 'requirejs']);

};