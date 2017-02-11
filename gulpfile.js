// Dependencies =======================
const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const plumber = require('gulp-plumber');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');
const reload = browserSync.reload

// Default task ========================
gulp.task('default', ['browser-sync', 'all:w'] , () => {});

// Babel ES6 =============================
gulp.task('babel', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./'));
})

// Watch Babel ==========================
gulp.task('js:w', ['babel'], reload)

// Sass =================================
gulp.task('sass',  () => {
    let processors = [
        autoprefixer({browsers: ['last 2 versions']})
    ];
    return gulp.src('./theme/style.scss')
        .pipe(sass({outputStyle: 'compressed', includePaths: ["node_modules"]})
        .on('error', sass.logError))
        .pipe(plumber())
        .pipe(postcss(processors))
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(browserSync.stream());
});

// Watch Sass ==========================
gulp.task('scss:w' , ['sass'])

// BrowserSync =========================
gulp.task('browser-sync' , ['nodemon'], () =>{
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    files: ["./**/*.js","views/**/*.pug"],
    browser: "",
    port: 7000,
  });

});

//Watch changes ==========================
gulp.task('all:w',[ 'babel' , 'sass'], () => {
  gulp.watch('./src/server/**/*.js', ['js:w'])
  gulp.watch('./theme/**/**.scss', ['scss:w'])
})

// Start and Reset Server ================
gulp.task('nodemon', function (cb) {
  var started = false;
  return nodemon({
    script: 'bin/www'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});