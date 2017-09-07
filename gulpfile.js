var browserSync   = require('browser-sync'),
    gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    pug           = require('gulp-pug'),
    uncss         = require('gulp-uncss'),
    cleanCSS      = require('gulp-clean-css'),
    print         = require('gulp-print'),
    changed       = require('gulp-changed'),
    imagemin      = require('gulp-imagemin'),
    pngquant      = require('imagemin-pngquant'),
    del           = require('del');

// Path to folder with source files
var config = {
  dist: 'dist/',
  src: 'src/',
  fontin: 'src/fonts/**/*',
  cssin: 'src/css/**/*.css',
  jsin: 'src/js/**/*.js',
  imgin: 'src/img/**/*.{jpg,jpeg,png,gif}',
  htmlin: 'src/*.html',
  sassin: 'src/style/*.sass',
  scssin: 'src/style/*.scss',
  sasswatch: 'src/style/**/*.sass',
  scsswatch: 'src/style/**/*.scss',
  pugin: 'src/pug/**/*.pug',
  cssout: 'dist/style/',
  jsout: 'dist/js/',
  imgout: 'dist/img/',
  htmlout: 'dist/',
  sassout: 'src/css/',
  fontout: 'dist/fonts/',
  cssoutname: 'style.css',
  jsoutname: 'script.js',
  cssreplaceout: 'css/style.css',
  jsreplaceout: 'js/script.js',
};

// Browsers version for autoprefixer option
var autoprefixerOptions = {
  browsers: ['ie > 8','> 1%']
};

//
gulp.task('browser-sync', ['sass','pug'], function() {
  browserSync({
    server: {
      baseDir: config.dist
    }
  });
});

// Sass compiler to css with css minifier
gulp.task('sass', function () {
  return gulp.src(config.sassin)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(uncss({
            html: ['dist/*.html']
        }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.cssout))
    .pipe(browserSync.stream());
});

// Pug compiler
gulp.task('pug', function buildHTML() {
  gulp.src([config.pugin])
    .pipe(print())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(config.htmlout));
});

// Browser error messages with reload page
gulp.task('browser-reload',function () {
  browserSync.notify(messages.simple)
  browserSync.reload()
});

// Compile javascripts files to dist folder
gulp.task('load-js',function () {
  gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    config.jsin
  ])
    .pipe(gulp.dest(config.jsout));
});

// Load images to dist folder
gulp.task('load-images',function(){
  gulp.src(config.imgin)
    .pipe(gulp.dest(config.imgout));
});

// Load fonts to dist folder
gulp.task('load-fonts',function(){
  gulp.src(config.fontin)
  .pipe(gulp.dest(config.fontout))
});

gulp.task('clean', function() {
  return del([config.dist]);
});

// Optimize image and compress
gulp.task('images', ['clean'], function() {
  return gulp.src(config.imgout)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(pngquant())
    .pipe(gulp.dest(config.imgout));
});

gulp.task('watch', function () {
  gulp.watch([config.sasswatch,config.scsswatch], ['sass'])
  gulp.watch(config.pugin,['pug'])
  gulp.watch(['dist/*.html']).on("change",browserSync.reload)
  gulp.watch([config.imgin],['load-images']);
});

gulp.task('default', ['load-js','load-images','load-fonts','browser-sync', 'watch']);
