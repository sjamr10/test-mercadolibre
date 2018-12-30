const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const svgo = require('gulp-svgo');
const svgSymbols = require('gulp-svg-symbols');
const cleanhtml = require('gulp-cleanhtml');
const rename = require('gulp-rename');
const slug = require('slug');

const production = ['production', 'staging'];
let isProduction = production.includes(process.env.NODE_ENV);

const assets = {
  bootstrapAssets: 'node_modules/bootstrap-sass/assets',
  fontAwesomeAssets: 'node_modules/font-awesome/scss',
};

gulp.task('styles', () => {
  gulp
    .src('./app/assets/scss/styles.scss')
    .pipe(sass({
      outputStyle: isProduction ? 'compressed' : 'expanded',
      includePaths: [assets.fontAwesomeAssets],
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ios 6', 'android 4'))
    .pipe(gulp.dest('./app/public/css'));
});

// create svg symbols for unified use
gulp.task('svg', () =>
  gulp
    .src('app/assets/svg/**/*')
    .pipe(svgo())
    .pipe(svgSymbols({
      id: 'svg-%f',
      className: '.svg-%f',
      title: false,
      svgClassname: 'svg-root',
      templates: ['default-svg'],
    }))
    .pipe(cleanhtml())
    .pipe(rename((_path) => {
      const p = _path;
      p.basename = 'svg-root';
    }))
    .pipe(gulp.dest('app/public/svg')));

// jpg, svg and png images optimization
gulp.task('images', () =>
  gulp
    .src('app/assets/images/**/*')
    .pipe(imagemin([
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [{ removeViewBox: true }],
      }),
    ]))
    .pipe(rename((_path) => {
      const p = _path;
      p.basename = slug(_path.basename);
    }))
    .pipe(gulp.dest('app/public/images')));

// fonts
gulp.task('fonts', () => gulp.src('app/assets/fonts/**/*').pipe(gulp.dest('app/public/fonts')));

// Watch task
gulp.task('watch', () => {
  // run task initially, after that watch
  gulp.start(['styles', 'images', 'svg', 'fonts']);
  gulp.watch('./app/assets/scss/**/*.scss', ['styles']);
});

// Build task
gulp.task('build', () => {
  gulp.start(['styles', 'images', 'svg', 'fonts']);
});

// Build task for production
gulp.task('build:production', () => {
  isProduction = true;
  gulp.start('build');
});
