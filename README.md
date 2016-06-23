# _InputZ deatils

a Sass (.scss) based css framework for input,form elements embressing the new web concepts. 

## Getting Started

* visit [_InputZ Downloads](https://inputz.herokuapp.com/download) to customize and download the required files. 
* use your prefered method for handing .scss and compressing .js files . we use [gulp](http://gulpjs.com/)

### Prerequisities

copy and attach the downloaded files to your project

###Gulp workflow (optional)
project dependencies installation
```
npm i --save-dev gulp gulp-sass gulp-uglify gulp-autoprefixer gulp-combine-mq
```

gulp.js
```
var gulp = require('gulp'),
    
    //css related
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    prefix = require('gulp-autoprefixer'),
    combineMq = require('gulp-combine-mq'),
    
    //js related
    uglify = require('gulp-uglify'),

// source and destination folder names
var source = <folder Name>,
    destination = <folder Name>;

// scssToCss
gulp.task('scssToCss', function () {
    gulp.src(source + '/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(prefix('last 2 versions'))
        .pipe(combineMq({
            beautify: true
        }))
        .pipe(sourcemaps.write('../sourceMaps_css'))
        .pipe(gulp.dest(destination + '/css/'));
});

// js compress
gulp.task('jsComp', function() {
  return gulp.src(source + '/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(destination + '/js'));
});

/* Watch for changes */
/* Generic */
gulp.task('watch', function () {
    gulp.watch(source + '/scss/**/*.scss', ['scssToCss']),
    gulp.watch(source + '/scripts/*.js', ['jsComp']);
});

/* Default Gulp task */
gulp.task('default', ['scssToCss','jsComp' , 'watch']);

```
## Adding an _InputZ object
**scss dependencies**
```
/*-------------------- dependencies*/

@import "_control";
@import "_inputz";

/*-------------------- Reset and Hacks*/

@include resetAll;
@include placeHolderHack;

```
---

**Example A Textbox**

example_A.html
```
<input type="text">
```
example_A.scss
```
input[type="text"]{
    @include iz-textbox;
}

```
---
**Example B Select (js version)**

example_B.html
```
<label>
   <select data-izObject="select">
        <option>...</option>
    </select>
</label>
```
example_B.scss
```
[data-izObject="select"]{
   @include iz-select;
}
```
example_B.js

call this function within your html after attaching inputz.js
```
izObject.select();
```

For detailed description please check [_inputz Components](https://inputz.herokuapp.com/components) and/or [_inputz on Github Pages](http://siddacool.github.io/inputz-details/)

<img src="http://siddacool.github.io/inputz-details/inputz_icon.svg" height="31"> <img src="http://siddacool.github.io/inputz-details/inputz_icon.svg" height="31"> <img src="http://siddacool.github.io/inputz-details/inputz_icon.svg" height="31"> <img src="http://siddacool.github.io/inputz-details/inputz_icon.svg" height="31">
