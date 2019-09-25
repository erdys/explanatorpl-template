const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');
const buffer = require('vinyl-buffer');
const svgSprite = require('gulp-svg-sprite');
const imageminSvgo = require('imagemin-svgo');

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

gulp.task('spritepng', function () {
    var spriteData = gulp.src('./images/_sprites-png/*.png').pipe(spritesmith({
        imgName: 'sprite-png.png',
        cssName: '_sprite-png.scss',
        padding: 20,
        cssOpts: {
            functions: false
        },
        cssVarMap: function (sprite) {
            sprite.name = 'spritepng-' + sprite.name;
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

gulp.task('spritesvg', function () {
    return gulp.src('./images/_sprites-svg/*.svg').pipe(svgSprite({
        shape: {
            dimension: {
                maxWidth: 50,
                maxHeight: 50
            },
            spacing: {
                padding: 10
            }
        },
        mode: {
            css : {
                bust: false,
                dest : '.',
                sprite : './images/sprite-svg.svg',
                render : {
                    scss : {
                        dest : './sass/_sprite.scss'
                    }
                },
            }
        }
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('imagemin', function () {
    return gulp.src('./images/_source/*.+(png|jpg)')
        .pipe(imagemin())
        .pipe(gulp.dest('./images'))
});

gulp.task('imageminsvg', function () {
    return gulp.src('./images/_source/*.+(svg)')
        .pipe(imagemin({
            use: [
                imageminSvgo({
                    plugins: [
                        {removeViewBox: false}
                    ]
                })
            ]
        }))
        .pip
        .pipe(gulp.dest('./images'))
});

gulp.task('watch', () => {
    gulp.watch('./sass/*/*.scss', gulp.series('sass'));
});