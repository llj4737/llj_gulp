var gulp = require('gulp');
var babel = require("gulp-babel");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var stylus = require('gulp-stylus');
var cssClean = require('gulp-clean-css');
var htmlMin = require('gulp-htmlmin');
var livereload = require('gulp-livereload')
var connect = require('gulp-connect');

/**
 * 合并压缩 js 的任务
 */
gulp.task('js', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(babel())
    .pipe(concat('build.js'))
    .pipe(gulp.dest('dist/js/')) //输出
    .pipe(uglify())  //压缩
    .pipe(rename({ suffix: '.min' })) //重命名
    .pipe(gulp.dest('dist/js/'))
    .pipe(livereload())
    .pipe(connect.reload())
})

/** 转换 stylus */
gulp.task('stylus', function () {
  return gulp.src('src/stylus/*.stylus')
    .pipe(stylus())
    .pipe(gulp.dest('src/css/'))
    .pipe(livereload())
    .pipe(connect.reload())
})

/** 合并压缩 css */
gulp.task('css', function () {
  return gulp.src('src/css/index.css')
    .pipe(concat('build.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssClean({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'))
    .pipe(livereload())
    .pipe(connect.reload())
})

/** 压缩 html */
gulp.task('html', function () {
  return gulp.src('index.html')
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload())
    .pipe(connect.reload())
})
/**
 * 开启服务
 */
gulp.task('ant_connect', function() {
  connect.server({
      root: 'dist',
      livereload: true,
      port: 8888
  })
})
/**
 * 开启监听
 */
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('*.html', gulp.series('html'));
  gulp.watch('src/js/*.js', gulp.series('js'));
  gulp.watch(['src/css/*.css', 'src/stylus/*.stylus'], gulp.series('css'))
})

/**
 * 默认任务
 */
// gulp.task('default', gulp.parallel('js', 'stylus', 'css', 'html', 'ant_connect'))
gulp.task('default', gulp.parallel('js', 'stylus', 'css', 'html', 'watch', 'ant_connect'))




// gulp.task('ant_watch', gulp.parallel('default'), function() {
//   gulp.watch('*.html', gulp.series('html'))
//   gulp.watch('src/**/*.js', gulp.series('js'))
//   gulp.watch('src/**/*.css', gulp.series('css'))
// })
