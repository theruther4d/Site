var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var scss = require( 'gulp-sass' );
var prefix = require( 'gulp-autoprefixer' );
var cssMin = require( 'gulp-minify-css' );
var rename = require( 'gulp-rename' );

function compile(watch) {
  var bundler = watchify(
      browserify( './js/index.js', {
          debug: true
      })
      .transform(
          babel.configure({
              presets: [ 'es2015' ],
              plugins: [ 'transform-object-rest-spread' ]
          })
      )
  );

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task( 'css', () => {
    return gulp.src( './scss/main.scss' )
        .pipe( scss() )
        .pipe( prefix( ['last 2 version', '> 1%', 'ie 8', 'ie 7', 'Firefox > 15'], { cascade: true } ) )
        .pipe( cssMin() )
        .pipe( rename( 'style.css' ) )
        .pipe( gulp.dest( './dist' ) );
});

gulp.task( 'watchCSS', () => {
    gulp.watch( './scss/**/*.scss', [ 'css' ] );
});

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch', 'css', 'watchCSS']);
