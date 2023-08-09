const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');
const buffer = require('vinyl-buffer');
const sassInlineSvg = require('gulp-sass-inline-svg');
const svgmin = require('gulp-svgmin');

var configSVG = {
    plugins: [{
        removeDoctype: false
    }, {
        removeDimensions: true
    }, {
        removeComments: false
    }, {
        cleanupNumericValues: {
            floatPrecision: 2
        }
    }, {
        convertColors: {
            names2hex: false,
            rgb2hex: false
        }
    }]
};

gulp.task('sass', function () {
    return gulp.src('./sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
});

gulp.task('sprite:png', function () {
    var spriteData = gulp.src('./images/_sprites/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        padding: 20,
        cssOpts: {
            functions: false
        },
        cssVarMap: function (sprite) {
            sprite.name = 'sprite-' + sprite.name;
        }
    }));

    var imgStream = spriteData.img
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest('./images/'));
     
    var cssStream = spriteData.css
        .pipe(gulp.dest('./sass/template/'));
 
    return merge(imgStream, cssStream);

});
gulp.task('imagemin', function () {
    return gulp.src('./images/_source/*.+(png|jpg)')
        .pipe(imagemin())
        .pipe(gulp.dest('./images'))
});

gulp.task('imagemin:svg', function () {
    return gulp.src('./images/_source/*.+(svg)')
        .pipe(svgmin(configSVG))
        .pipe(gulp.dest('./images'))

});

gulp.task('sass:svg', function(){
    return gulp.src('./images/_icons-svg/*.+(svg)') 
      .pipe(svgmin(configSVG))
      .pipe(sassInlineSvg({
        destDir: './sass/template/'
      }));
});

gulp.task('watch', () => {
    gulp.watch('./sass/*/*.scss', gulp.series('sass'));
});