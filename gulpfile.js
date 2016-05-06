var gulp = require('gulp'),

    //css related
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    prefix = require('gulp-autoprefixer'),
    combineMq = require('gulp-combine-mq'),

    //html templating
    ejs = require("gulp-ejs"),

    //js related
    uglify = require('gulp-uglify'),

    //sever related
    browserSync = require('browser-sync'),

    //Shared and misc
    cheerio = require('gulp-cheerio'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    rename = require('gulp-rename'),

    //error control
    plumber = require('gulp-plumber');

var projectName = 'project';

/*stop from halting on error*/
function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}

/* live reload */
gulp.task('browser-sync', function () {
    var files = [
      projectName + '/*.html',
      projectName + '/css/*.css',
      projectName + '/img/*.png',
      projectName + '/js/*.js'
   ];

    browserSync.init(files, {
        server: {
            baseDir: './' + projectName
        }
    });
});


/* php server */
var reload  = browserSync.reload;

gulp.task('browser-sync-php',['php'], function() {
    browserSync({
        proxy: '127.0.0.1:8010',
        port: 8080,
        open: true,
        notify: false,
        files: [projectName + '/*.php',projectName + '/*.html', projectName + '/css/*.css', projectName + '/img/*.png', projectName + '/js/*.js']
    });
});


/* style related components */
/* scss css */

// scssToCss
gulp.task('scssToCss', function () {
    gulp.src(projectName + '/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(combineMq({
            beautify: false
        }))
        .on('error', errorLog)
        .pipe(prefix('last 2 versions'))
        .pipe(sourcemaps.write('../sourceMaps_css'))
        .pipe(gulp.dest(projectName + '/css/'));
});

// html templating
gulp.task('htmlTemp', function () {
gulp.src(projectName +'/views/*.ejs')
     .pipe(ejs({
		title: '_InputZ',
		icons: (function(name){
        return '<svg role="img" class="icon"><use xlink:href="#icon-' + name + '"></use></svg>';
    })
	}))
  .pipe(rename({
    extname: ".html"
  }))
	.pipe(gulp.dest(projectName));

});

/* svg sprites */
/* type 'gulp svgstore' in console */
var path = require('path');

gulp.task('svgstore', function () {
    return gulp
        .src(projectName + '/svgAssets/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
            }
        }))
        .pipe(rename({prefix: 'icon-'}))
        .pipe(svgstore())
        .pipe(gulp.dest(projectName + '/fonts'));
});

/* Watch for changes */
/* Generic */
gulp.task('watch', function () {
    gulp.watch(projectName + '/scss/**/*.scss', ['scssToCss']);
});


/* Default Gulp task */
/* type Gulp in console */
gulp.task('default', ['scssToCss','htmlTemp' ,'browser-sync', 'watch']);
